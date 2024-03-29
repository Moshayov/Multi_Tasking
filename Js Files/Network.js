class Network {
    constructor() {
        this.server=new Server();
    }
    sendRequest(request, data) {
        console.log("3 network send");
      let server = this.server;
      let result = server.receiveRequest(request, data);
      console.log("network result"+"  "+result);
      if (result != null) {
        return result;
      }
    }
  }