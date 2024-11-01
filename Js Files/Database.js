class User {
    constructor(username, password,tasks=[]) {
      this.tasks=tasks;
      this.username = username;
      this.password = password;
    }
  }


class Task{
    constructor(task_name,type="TO DO" ,currentDate=new Date(), description) {
        let Date_ = currentDate.toUTCString();
        this.task_name=task_name;
        this.type=type;
        this.currentDate=Date_;
        this.description=description;
}
}

const USERS_KEY = "users";

class DataBase{

    constructor(){}
    /*****GET*****/

    //get user frpm local storage
    GET(username) {
       const users = this.getAll();
       return users.find(user => user.username === username);
    }
    /*get all the users */
    getAll() {
        const usersJSON = localStorage.getItem(USERS_KEY);
        return usersJSON ? JSON.parse(usersJSON) : [];
    }
    /*get specific task (for delete if needed) */
    getTask(task_name,user_name) {
        const user = this.GET(user_name);
        return user.tasks.find(task=>task.task_name==task_name)
    }
    /*get all task of the  user */
    getAll_tasks(username) {
        const users = this.getAll();
        const user = users.find(user => user.username === username);
        console.log("hi im in get all task");
        console.log(username);
        console.log(user);
        return user ? user.tasks : [];
    }
    get_current_user(){
        const usersJSON = localStorage.getItem('username');
        return usersJSON ? JSON.parse(usersJSON): ' ';
    }

    /***UPDATE*****/

    /*update task  */
    Update(user_name,task_name, task) {
        let users = this.getAll();
        let user = users.find(user => user.username === user_name);
        if (user) {
            let taskIndex = user.tasks.findIndex(task => task.task_name === task_name);
            if (taskIndex !== -1) {
                console.log(task_name);
                console.log(task.task_name);
                user.tasks.splice(taskIndex, 1, task);
                this.saveALL(users);
                console.log("Task updated successfully");
            } else {
                console.log("Task not found");
            }
        } else {
            console.log("User not found");

        }
    }

    /***ADD****/

    /*add new user to the system */
    post(username, password) {
        const users = this.getAll();
        let newUser =new User(username,password);
        users.push(newUser);
        this.saveALL(users);
    }

    
    /*add new task to the user list */
    post_task(username, newtask) {
        const users = this.getAll();
        let user = users.find(user => user.username === username);
        console.log(newtask);
        if (user) {
            if (user.tasks.some(task => task?.task_name === newtask.task_name)) {
                alert("The task is already exist in the system,\n please pick another name");
                return false;
            } else {
                user.tasks.push(newtask);
                this.saveALL(users);
                console.log("Task added successfully");
                return true;
            }
        } 
        console.log("User not found");
        return false;
    }
    

    /****DELETE****/
    /*delte a task from the list of tasks of specific user*/ 
    Deletee(username,task_name) {       
        let users = this.getAll();
        let user = users.find(user => user.username === username);
        console.log(username);
        if (user) {
            let taskIndex = user.tasks.findIndex(task => task.task_name === task_name);
            if (taskIndex !== -1) {
                user.tasks.splice(taskIndex, 1);
                this.saveALL(users);
                console.log("Task deleted successfully");
            } else {
                console.log("Task not found");
            }
        } else {
            console.log("User not found");
        }
    }

 
    /*save all changes to local storage,function to avoid code duplication  */
    saveALL(users){
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
}    