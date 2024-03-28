class User {
    constructor(username, password,tasks) {
      this.tasks=[];
      this.username = username;
      this.password = password;
    }
  }


class Task{
    constructor(task_name,type ,currentDate=new Date(), description) {
        let Date_ = currentDate.toUTCString();
        this.task_name=task_name;
        this.type=type;
        this.currentDate=Date_;
        this.type ="TO DO";
        this.description=description;

}
}

const USERS_KEY = "users";

class DataBase{

    constructor(){}
    //get user frpm local storage
    get(username) {
       const users = this.getAll();
       return users.find(user => user.username === username);

    }
    getAll() {
        const usersJSON = localStorage.getItem(USERS_KEY);
        return usersJSON ? JSON.parse(usersJSON) : [];
    }
    get_task(task_name) {
      
    }
    getAll_tasks() {
        const usersJSON = localStorage.getItem(USERS_KEY);
        return usersJSON ? JSON.parse(usersJSON) : [];
    }
    put(phoneNumber, data) {
        localStorage.setItem(phoneNumber, data);
    }
    post(phoneNumber, data) {
        console.log("5 DATABASE Create in LOCAL");
        localStorage.setItem(phoneNumber, data);
        console.log("6 DATABASE SUCCESS");
    }
    deletee(phoneNumber) {
        localStorage.removeItem(phoneNumber);
    }    

}