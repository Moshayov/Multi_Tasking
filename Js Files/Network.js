class Network {
  server = new Server();
      send_to_server_async(data, dispatcher){    
          this.server.prossess_data(data, dispatcher);
      }
  
      send_to_server(data){
          let result =  this.server.prossess_data(data);
          console.log(result);
          console.log("im in send to server")
          return result;
      }
  }
  