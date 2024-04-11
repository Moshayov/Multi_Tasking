// elements
const radioButtons = document.querySelectorAll("input[name='status-option']");
const radioButtonsEdit = document.querySelectorAll("input[name='status-option-edit']");
const boardView = document.getElementById("board-view");
const closeButtons = document.querySelectorAll(".close-button");
const statusSelect = document.getElementById("status-select");
const statusSelectEdit =  document.getElementById("status-select-edit");
const statusDropdown = document.getElementById("status-dropdown");
const statusDropdownEdit = document.getElementById("status-dropdown-edit");
const taskItems = document.querySelectorAll(".task-item");
const notification = document.getElementById("notification");
//const current_user ="";
let type_mission = "To do";

function get_current_user(){
  const fxhr = new FXMLHttpRequest()
  fxhr.open("GET", "",false);
   return fxhr.send("current_user");
}

// the current active overlay
let activeOverlay = null;

//get task type
radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", (event) => {
    const eventTarget = event.target;
    const type_ = eventTarget.value;

    switch (type_) {
      case "To do":
        type_mission = "To do";
        break;
      case "Doing":
        type_mission = "Doing";
        break;
      case "Done":
          type_mission = "Done";
          break;
    }
  });
});
//get task type for edit 
radioButtonsEdit.forEach((radioButton) => {
  radioButton.addEventListener("change", (event) => {
    const eventTarget = event.target;
    const type_ = eventTarget.value;

    switch (type_) {
      case "To do":
        type_mission = "To do";
        break;
      case "Doing":
        type_mission = "Doing";
        break;
      case "Done":
          type_mission = "Done";
          break;
    }
  });
});

function view_task(){
  const fxhr = new FXMLHttpRequest()
    fxhr.open("GET", "",true,null," ",get_current_user());
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
        taskDueDate.textContent = task.currentDate;
    
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
// open status dropdown
statusSelectEdit.addEventListener("click", () => {
  statusDropdownEdit.classList.toggle("hide");
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

/*add task */
function addTask(event) {
  event.preventDefault();
  let task_name = document.querySelector("#task_name").value.trim();
  let description = document.querySelector("#description").value.trim();
  let day = document.querySelector("#day").value.trim();
  let Month = document.querySelector("#Month").value.trim();
  let year = document.querySelector("#year").value.trim();
  let Task_dedline = new Date();
  var currentDate = new Date();
  Task_dedline.setDate(day);
  Task_dedline.setMonth(Month - 1);
  if(!task_name||!day||!year||!Month){
    alert("Please fill all the fields");
    return;
  }
  // Check if the other date is valid and not in the past
  if ( Task_dedline < currentDate) {
    console.log("Invalid date or date in the past");
  } else {
    console.log("Valid date and not in the past");
  }

  Task_dedline.setFullYear(year);
  const fxhr = new FXMLHttpRequest();
  let task = new Task(task_name, type_mission, Task_dedline, description);
  current_user =get_current_user()
  console.log(current_user);
  fxhr.open("POST", "", true, null, task, null, current_user);
  fxhr.send("add task", (flage) => {
    console.log(flage);
    if(flage)
    {
    alert("you added successfully");
    //להכניס לו משתמש
    fetchAndDisplayTasks(current_user);
    window.location.href = "#Tasks";}
  });
}
