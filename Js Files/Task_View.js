function displayTaskDetails(taskIndex) {
    const task = userTasks[taskIndex]; // userTasks הוא המשתנה שבו מחזיקים את רשימת המשימות
    // כאן תוסיף קוד שמציג את הפרטים המתאימים בדף, לדוגמה:
    document.getElementById('task-name').textContent = task.task_name;
    document.getElementById('task-description').textContent = task.description;
    document.getElementById('task-due-date').textContent = task.due_date;
    document.getElementById('task-status').textContent = task.status;
}

