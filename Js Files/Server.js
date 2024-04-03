class Server{
    db;
    constructor(){
        this.db =new DataBase();

    }
    prossess_data(data, dispatcher = (x) => {}){

        var recivedData = JSON.parse(data);
        
        if(recivedData["d"].method === 'GET'){
            if(recivedData["body"] == "usernames"){
                dispatcher(this.getAll());
            } 
            else if(recivedData["body"] == "tasks"){
                return this.getAll_tasks(recivedData["d"].user_name);
            }
            else if(recivedData["body"] == "current_user"){
                return this.get_current_user();
            }
            else if(recivedData["body"]=="task")
            {
                dispatcher(this.getTask(recivedData["d"].task_name,recivedData["d"].user_name));
            }
            else{
                dispatcher(this.GET(recivedData["d"].user.username));
            }
        } 
        else if(recivedData["d"].method === 'POST' ){
            if (recivedData["body"]=="add user") {
                dispatcher( this.post(recivedData["d"].user.username, recivedData["d"].user.password));
            } 
            else {
                dispatcher(this.post_task(recivedData["d"].user_name,  recivedData["d"].task));
            }
          
        } 
        else if(recivedData["d"].method === 'PUT'){
            this.Update(recivedData["d"].user.username, recivedData["d"].task_name,recivedData["d"].task);
            //dispatch the event
            dispatcher();
        }
        else if(recivedData["d"].method == 'DELETE'){
            this.Deletee(recivedData["d"].user_name, recivedData["d"].task_name);
            //dispatch the event
            dispatcher();
        }

        return true;
    }

     //create
     post(username, password){
        this.db.post(username, password);
    }

    post_task(username, new_task){
       return this.db.post_task(username, new_task);
     }

    //read
    get_current_user(){
        let user =  this.db.get_current_user();
        console.log(user)
        return user;
    }

    getAll() {
        return this.db.getAll();
    }

    getAll_tasks(username){
        return this.db.getAll_tasks(username);
    }

    getTask(task_name, user_name){
        return this.db.getTask(task_name, user_name);
    }

    GET(user_name){
        return this.db.GET(user_name);
    }

    //update
    Update(username, task_name, new_task){
        return this.db.Update(username, task_name, new_task);
    }
    
    //delete
    Deletee(username, task_name){
        return this.db.Deletee(username, task_name);
    }

    
}