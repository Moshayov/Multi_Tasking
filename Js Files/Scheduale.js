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
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
      let currentPage = location.hash.replace('#' ,'');
      console.log(currentPage);
     if(currentPage=="Sign_Up"){
      formContainer = document.querySelector(".form_container");
     }
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
  signup_Button = document.querySelector("#signup_Now");
  var loginForm = document.getElementById("#home");
  
  const EXPMINUTES=2;
  let numOfTry=0;
  home.classList.add("show");


function login(){ 
    //formContainer.classList.remove("active");
    let usernameValue =  document.querySelector("#username").value.trim();
    let passwordValue = document.querySelector("#password_login").value.trim();
  
    if (!usernameValue || !passwordValue) {
      alert("Please enter username and password.");
      return;
    }
    const fxhr = new FXMLHttpRequest()
    fxhr.open("GET", "");
    fxhr.send("usernames", (user) => {
        console.log(user);
        if (user.username == usernameValue&& user.password==passwordValue) {
            alert("welcome");
            localStorage.setItem("username", JSON.stringify(username));
            // Show the todo list
            console.log("hiiii");
            //loginForm.style.display = "none";

            //todo.style.display = "block";
            //show_tasks(username);
        } else {
            alert("wrong");
        }
    });

  }

  function sign_up(){
    
    let flage= false;
    let usernameValue =  document.querySelector("#username_sign_Up").value.trim();
    let passwordValue = document.querySelector("#password_signUp").value.trim();
    let passwordConfirmValue = document.querySelector("#Confirm_password").value.trim();
    while(!flage)
    {
        let usernameValue =  document.querySelector("#username_sign_Up").value.trim();
        let passwordValue = document.querySelector("#password_signUp").value.trim();
        let passwordConfirmValue = document.querySelector("#Confirm_password").value.trim();
        console.log(usernameValue);
        console.log(passwordConfirmValue);
        console.log(passwordValue);
        if (!usernameValue || !passwordValue|| !passwordConfirmValue) {
          alert("Please enter username  password and password Confirm.");
          flage=false;
          break;
        }
  
        if (passwordConfirmValue != passwordValue) {
          console.log(passwordConfirmValue);
          console.log(passwordValue);
          alert("The passwords you entered do not match, please re-enter");
          
          flage=false;
          return;
        }
        const fxhr = new FXMLHttpRequest()
        fxhr.open("GET", "");
        fxhr.send("usernames", (user) => {
            console.log(user);
            if (user.username == usernameValue&& user.password==passwordValue) {
                alert("the user already exist in the system");
                localStorage.setItem("username", JSON.stringify(username));
                console.log("iiii");
            } else {
                flage=true;
              }
        });
  }
  if(flage){
    let user = new User(usernameValue,passwordValue);
    fxhr.open("POST", "",true,user,null,null);
    fxhr.send("add user", (u) => {
        console.log("the user added suucsefuly");
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


