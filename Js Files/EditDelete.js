function deleteTask(username, taskName) {
    const fxhr = new FXMLHttpRequest();
    fxhr.open("DELETE", "", true, null, null, taskName, username);
    fxhr.send("", () => {
        // Optionally, perform any action after deletion (e.g., refresh the UI)
        alert("Task deleted successfully");
    });
}
function editTask(username, taskName, updatedTask) {
    const fxhr = new FXMLHttpRequest();
    fxhr.open("PUT", "", true, null, updatedTask, taskName, username);
    fxhr.send("", () => {
        // Optionally, perform any action after editing (e.g., refresh the UI)
        alert("Task edited successfully");
        //לעדכן את התצוגה של המשתמש
        //לקרוא לפונקציה שמביאה לי את המשימות ומציגה לי אותן 
    });
}



