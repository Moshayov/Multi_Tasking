const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log("nav function")
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
    
  },
    poppin: function(ev){
      console.log(location.hash, 'popstate event');
      let hash = location.hash.replace('#' ,'');
      document.querySelector('.active').classList.remove('active');
      document.getElementById(hash).classList.add('active');
      console.log(hash)
      history.pushState({}, hash, `#${hash}`);
      document.getElementById(hash).dispatchEvent(app.show);
  }
  
}

document.addEventListener('DOMContentLoaded', app.init);

home = document.querySelector("#home"),
  signupBtn = document.querySelector("#signup"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginButton = document.querySelector("#login_now"),
  signup_Button = document.querySelector("#signup_Now"),
  signup = document.querySelector('#Sign_Up'),
  loginForm = document.getElementById("#home");
  signup.classList.add("show");
  home.classList.add("show");
  let userTasks=[];

function login(event){ 
    //formContainer.classList.remove("active");
    event.preventDefault();
    usernameValue =  document.querySelector("#username").value.trim();
    let passwordValue = document.querySelector("#password_login").value.trim();
    Task_click = document.querySelector("#task_nav");
    
    let flage=false;
    if (!usernameValue || !passwordValue) {
      alert("Please enter username and password.");
      return;
    }
    const fxhr = new FXMLHttpRequest()
    fxhr.open("GET", "");
    fxhr.send("usernames", (users) => {
      users.forEach((user)=> {if (user.username == usernameValue&& user.password==passwordValue) {
              alert("welcome");
              flage=true;
              localStorage.setItem("username", JSON.stringify(user.username));
              console.log("hiiii");              
              // Initial display of tasks
              fetchAndDisplayTasks(usernameValue);
              window.location.href = "#Tasks";
            }
          } )

        if (!flage) {
          alert("user name  or password is not correct");
      }
     
    });
    console.log(flage);
  }

  function sign_up(event) {
    event.preventDefault();
    let flage = false;
    let usernameValue = document.querySelector("#username_sign_Up").value.trim();
    let passwordValue = document.querySelector("#password_signUp").value.trim();
    let passwordConfirmValue = document.querySelector("#Confirm_password").value.trim();

    if (!usernameValue || !passwordValue || !passwordConfirmValue) {
        alert("Please enter username, password, and password confirmation.");
        flage = true;
    }

    if (passwordConfirmValue !== passwordValue && !flage) {
        alert("The passwords you entered do not match, please re-enter");
        flage = true;
    }

    if (!flage) {
        const fxhr = new FXMLHttpRequest();
        fxhr.open("GET", "");
        fxhr.send("usernames", (users) => {
            let userExists = false;
            users.forEach((user)=> {
                if (user.username == usernameValue) {
                    alert("The user already exists in the system, please pick another name");
                    userExists = true;
                }
            });

            if (!userExists) {
                let user = new User(usernameValue, passwordValue);
                fxhr.open("POST", "", true, user, null, null);
                fxhr.send("add user", () => {
                    alert("User added successfully");
                    window.location.href = "#home";
                });
            }
        });
    }
}

  pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
      let getPwInput = icon.parentElement.querySelector("input");
      if (getPwInput.type === "password") {
        getPwInput.type = "text";
        icon.classList.replace("uil-eye-slash", "uil-eye");
      } else {
        getPwInput.type = "password";
        icon.classList.replace("uil-eye", "uil-eye-slash");
      }
    });
  });

/*
// Function to display tasks in board view
function displayTasksBoardView(tasks) {
  const boardContainer = document.getElementById('board-view');
  boardContainer.innerHTML = ''; // Clear previous content

  // Loop through tasks and organize them by type (To do, Doing, Done)
  const tasksByType = {
    "To do": [],
    "Doing": [],
    "Done": []
  };

  tasks.forEach(task => {
    tasksByType[task.type].push(task);
  });

  // Loop through task types and create lists for each type
  Object.keys(tasksByType).forEach(type => {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list');

    const listHeader = document.createElement('h2');
    listHeader.classList.add('list-header');
    const circle = document.createElement('span');
    circle.classList.add('circle', `${type.toLowerCase().replace(/\s/g, '-')}-background`); // Replace spaces with hyphens
    const text = document.createElement('span');
    text.classList.add('text');
    text.textContent = type;
    listHeader.appendChild(circle);
    listHeader.appendChild(text);

    const tasksList = document.createElement('ul');
    tasksList.classList.add('tasks-list', `${type.toLowerCase().replace(/\s/g, '-')}`); // Replace spaces with hyphens

    // Loop through tasks of current type and create task items
    tasksByType[type].forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.classList.add('task-item');

      const taskName = document.createElement('p');
      taskName.classList.add('task-name');
      taskName.textContent = task.task_name;

      const taskDueDate = document.createElement('p');
      taskDueDate.classList.add('task-due-date');
      taskDueDate.textContent = `Due on ${task.currentDate}`;

      // Append task elements to task item
      taskItem.appendChild(taskName);
      taskItem.appendChild(taskDueDate);

      // Append task item to tasks list
      tasksList.appendChild(taskItem);
    });

    // Append list header and tasks list to list container
    listContainer.appendChild(listHeader);
    listContainer.appendChild(tasksList);

    // Append list container to board container
    boardContainer.appendChild(listContainer);
  });
}
*/
// Function to display tasks in board view

function displayTasksBoardView(tasks, username) {
  var usernameElement = document.getElementById("user_name");
  usernameElement.textContent = username;
  const boardContainer = document.getElementById('board-view');
  boardContainer.innerHTML = ''; // Clear previous content

  // Loop through tasks and organize them by type (To do, Doing, Done)
  const tasksByType = {
      "To do": [],
      "Doing": [],
      "Done": []
  };

  tasks.forEach(task => {
      tasksByType[task.type].push(task);
  });

  // Loop through task types and create lists for each type
  Object.keys(tasksByType).forEach(type => {
      const listContainer = document.createElement('div');
      listContainer.classList.add('list');

      const listHeader = document.createElement('h2');
      listHeader.classList.add('list-header');

      // Add colored circle next to task type
      const circle = document.createElement('span');
      circle.classList.add('circle', `${type.toLowerCase().replace(/\s/g, '-')}-background`);
      listHeader.appendChild(circle);

      const text = document.createElement('span');
      text.classList.add('text');
      text.textContent = type;
      listHeader.appendChild(text);

      // Create tasks list
      const tasksList = document.createElement('ul');
      tasksList.classList.add('tasks-list', `${type.toLowerCase().replace(/\s/g, '-')}`);

      // Loop through tasks of current type and create task items
      tasksByType[type].forEach((task, index) => {
          const taskItem = document.createElement('li');
          taskItem.classList.add('task-item');

          const taskButton = document.createElement('button');
          taskButton.classList.add('task-button');

          const taskDetails = document.createElement('div');
          taskDetails.classList.add('task-details');

          // Add triangle icon to task button
          const triangleIcon = document.createElement('iconify-icon');
          triangleIcon.setAttribute('icon', 'mdi:triangle');
          triangleIcon.setAttribute('style', 'color: black');
          triangleIcon.setAttribute('width', '18');
          triangleIcon.setAttribute('height', '18');
          triangleIcon.classList.add('triangle-icon');
          taskButton.appendChild(triangleIcon);

          // Task name and due date
          const taskName = document.createElement('p');
          taskName.classList.add('task-name');
          taskName.textContent = task.task_name;

          const taskDueDate = document.createElement('p');
          taskDueDate.classList.add('task-due-date');
          taskDueDate.textContent = `Due on ${task.currentDate}`;

          // Append task details to task button
          taskDetails.appendChild(taskName);
          taskDetails.appendChild(taskDueDate);
          taskButton.appendChild(taskDetails);

          // Add click event to task button to display task details
          taskButton.addEventListener('click', () => {
              window.location.href="#Task-View"
              displayTaskDetails(task, index);
          });

          // Append task button to task item
          taskItem.appendChild(taskButton);

          // Append task item to tasks list
          tasksList.appendChild(taskItem);
      });

      // Append list header and tasks list to list container
      listContainer.appendChild(listHeader);
      listContainer.appendChild(tasksList);

      // Append list container to board container
      boardContainer.appendChild(listContainer);
  });
}

// Function to fetch tasks and display them
function fetchAndDisplayTasks(user_name) {
    const fxhr = new FXMLHttpRequest()
    fxhr.open("GET", " ",false,null,null," ",user_name);
    userTasks = fxhr.send("tasks")
    console.log(userTasks);
  // Display tasks in board view
  if(userTasks){
  console.log(userTasks);
  displayTasksBoardView(userTasks,user_name);
}
}

function displayTaskDetails(task, index) {
  console.log('לחצו על משימה מספר ' + index);
  document.getElementById('task-name').textContent = task.task_name;
  document.getElementById('task-description').textContent = task.description;
  document.getElementById('task-due-date').textContent = task.currentDate;
  document.getElementById('task-status').textContent = task.type;
}