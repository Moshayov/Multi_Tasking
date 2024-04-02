// elements
const radioViewOptions = document.querySelectorAll("input[name='view-option']");
const boardView = document.getElementById("board-view");
const addTaskCTA = document.getElementById("add-task-cta");
const setTaskOverlay = document.getElementById("set-task-overlay");
const closeButtons = document.querySelectorAll(".close-button");
const statusSelect = document.getElementById("status-select");
const statusDropdown = document.getElementById("status-dropdown");
const taskItems = document.querySelectorAll(".task-item");
const viewTaskOverlay = document.getElementById("view-task-overlay");
const deleteTaskCTA = document.getElementById("delete-task-cta");
const notification = document.getElementById("notification");
const current_user =get_current_user();

function get_current_user(){
  const fxhr = new FXMLHttpRequest()
  fxhr.open("GET", "",false);
   return fxhr.send("current_user");
}
// the current active overlay
let activeOverlay = null;

function view_task(){
  const fxhr = new FXMLHttpRequest()
    fxhr.open("GET", "",true,null," ",current_user);
    fxhr.send("tasks", (tasks) => {
      tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
    
        const taskButton = document.createElement("button");
        taskButton.classList.add("task-button");
    
        const taskInfo = document.createElement("div");
    
        const taskName = document.createElement("p");
        taskName.classList.add("task-name");
        taskName.textContent = task.name;
    
        const taskDueDate = document.createElement("p");
        taskDueDate.classList.add("task-due-date");
        taskDueDate.textContent = task.dueDate;
    
        taskInfo.appendChild(taskName);
        taskInfo.appendChild(taskDueDate);
    
        const arrowIcon = document.createElement("iconify-icon");
        arrowIcon.setAttribute("icon", "material-symbols:arrow-back-ios-rounded");
        arrowIcon.setAttribute("style", "color: black");
        arrowIcon.setAttribute("width", "18");
        arrowIcon.setAttribute("height", "18");
        arrowIcon.classList.add("arrow-icon");
    
        taskButton.appendChild(taskInfo);
        taskButton.appendChild(arrowIcon);
    
        taskItem.appendChild(taskButton);
    
        boardView.appendChild(taskItem);
      })});
}

function populateBoardView() {
  const boardView = document.getElementById("board-view");
  boardView.innerHTML = ""; // Clear existing content

 
}

function addTask(){
  let task_name = document.querySelector("#task_name").value.trim();
  let type;
  let description = document.querySelector("#description").value.trim();
  let day = document.querySelector("#day").value.trim();
  let Month = document.querySelector("#Month").value.trim();
  let year = document.querySelector("#year").value.trim();
  let currentDate = new Date();
  currentDate.setDate(day);
  currentDate.setMonth(Month - 1); // החודשים בתוך האובייקט Date מתחילים מ-0 (ינואר הוא 0, פברואר הוא 1, וכן הלאה)
  currentDate.setFullYear(year)
  let radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(button => {
      button.addEventListener('change', function() {
          // בדיקה אם הרדיו כפתור נבחר
          if (this.checked) {
              // השמת הערך שנבחר לתוך משתנה
            //  let selectedValue = this.value;
              type = this.value;
          }
      });
  });
  let task = new Task(task_name,type,currentDate,description);
  //console.log(task);
  const fxhr = new FXMLHttpRequest()
  fxhr.open("POST", "",true,null,task,null,current_user);
  fxhr.send("add task", () => {
      alert("you added suucsefuly");
  });


}



// close buttons inside overlays
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeOverlay.classList.add("hide");
    activeOverlay = null;
    // reenable scrolling
    document.body.classList.remove("overflow-hidden");
  });
});

// open status dropdown
statusSelect.addEventListener("click", () => {
  statusDropdown.classList.toggle("hide");
});

// click a task
taskItems.forEach((task) => {
  task.addEventListener("click", () => {
    viewTaskOverlay.classList.remove("hide");
    activeOverlay = viewTaskOverlay;
    // disable scrolling for content behind the overlay
    document.body.classList.add("overflow-hidden");
  });
});


