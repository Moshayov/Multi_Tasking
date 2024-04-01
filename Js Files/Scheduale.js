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
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h)=>{
            h.classList.remove('big');
        }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);

home = document.querySelector("#home"),
  formContainer = document.querySelector(".form_container"),
  signupBtn = document.querySelector("#signup"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginButton = document.querySelector("#login_now"),
  signup_Button = document.querySelector("#signup_Now");
  var loginForm = document.getElementById("home");
  const EXPMINUTES=2;
  let numOfTry=0;
  //home.classList.add("show");


/*login page*/

function login(){ 
    let usernameValue =  document.querySelector("#username").value.trim();
    let passwordValue = document.querySelector("#password_login").value.trim();
  
    if (!usernameValue || !passwordValue) {
      alert("Please enter username and password.");
      return;
    }
    const fxht = new FXMLHttpRequest()
    fxhr.open("GET", "");
    fxhr.send("usernames", (user) => {
        console.log(user);
        if (user.username == usernameValue&& user.password==passwordValue) {
            alert("welcome");
            localStorage.setItem("username", JSON.stringify(username));
            // Show the todo list
            console.log("hiiii");
            loginForm.style.display = "none";

            //todo.style.display = "block";
            //show_tasks(username);
        } else {
            alert("wrong");
        }
    });

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
  
  function authenticateUser(username, password) {
    const users = getUsersFromLocalStorage();
    return users.some(user => user.username == username && user.password == password);
  }

  function displayDateMessage(date) {
    let message = "";
    message = `Last Login: ${date}`;
    // Create a new div element
    const modal = document.createElement("div");
    modal.classList.add("modal");
  
    // Create content inside the modal
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>${message}</p>
      </div>
    `;
  
    // Append the modal to the body
    document.body.appendChild(modal);
    // Close the modal when the close button is clicked
    const closeButton = modal.querySelector(".close");
     closeButton.addEventListener("click", () => {
      window.location.href = "Games_Home.html";
    });
  
  }

  