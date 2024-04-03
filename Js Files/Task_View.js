// Function to display task details dynamically
function displayTaskDetails(task) {
    document.getElementById("task-name").textContent = task.task_name;
    document.getElementById("task-description").textContent = task.description;
    document.getElementById("task-due-date").textContent = task.currentDate;
    document.getElementById("task-status").classList.add("blue-background"); // Adjust based on task status
    document.getElementById("task-status-text").textContent = "Doing"; // Adjust based on task status
  }
  
  // Event listener to open task details overlay when a task name is clicked
  document.getElementById("board-view").addEventListener("click", function(event) {
    if (event.target.classList.contains("task-name")) {
      const taskId = event.target.getAttribute("data-task-id");
      const task = getTaskDetailsFromServer(taskId); // Fetch task details from server
      displayTaskDetails(task);
      document.getElementById("view-task-overlay").classList.remove("hide");
    }
  });
  
  // Function to fetch task details from server (you need to implement this)
  function getTaskDetailsFromServer(taskId) {
    // Make an AJAX request to the server to get task details
    // You may use the existing server functions to fetch task details
    // Return the task details received from the server
  }
  