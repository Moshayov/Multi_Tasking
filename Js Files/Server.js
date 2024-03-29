class Server{
    constructor(){
        this.db =new DataBase();

    }

    receiveRequest(request,username=null,data=null){
        if(request=== "GETALL"){
            return this.getAll();
        }
        else if(request=== "GET"){
            return this.get(username);
        }
        else if(request=== "POST"){
            return this.post(username,data);
        }
        else if(request=== "PUT"){
            return this.put(username,data);
        }
        else if(request=== "DELETE"){
            return this.del(task);
        }
        else{
            alert("wrong request : "+ request)
            return false;
        }  
    }

    get(username) {
        return this.db.get(username);
    }
    getAll() {
        return this.db.getAll();
    }
    post(phoneNumber, data) {
        console.log("4 server POST to DB ");
        this.db.post(phoneNumber, data);
        console.log("7 server return");
    }
    put(phoneNumber, data) {
        this.db.put(phoneNumber, data);
    }
    del(phoneNumber) {
        this.db.deletee(phoneNumber);
    }     
}