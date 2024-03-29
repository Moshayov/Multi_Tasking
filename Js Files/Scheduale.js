
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
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide"),
  loginButton = document.querySelector("#login_now"),
  signup_Button = document.querySelector("#signup_Now");
  const EXPMINUTES=2;
  let numOfTry=0;
  home.classList.add("show");


loginButton.addEventListener("click", (e) => { 
    e.preventDefault();
    let timeExp= isBlocked();
    if(timeExp!==-1){
      // Convert milliseconds to seconds
      var seconds = Math.floor((timeExp / 1000) % 60);
      // Convert milliseconds to minutes
      var minutes = Math.floor(timeExp / (1000 * 60));
      alert(`Too many attempts Try again in ${minutes} minutes and ${seconds} seconds`);
      return;
    }
    let usernameValue =  document.querySelector("#username").value.trim();
    let passwordValue = document.querySelector("#password_login").value.trim();
  
    if (!usernameValue || !passwordValue) {
      alert("Please enter username and password.");
      return;
    }
  
    if (authenticateUser(usernameValue, passwordValue)) {
        localStorage.setItem('username', usernameValue);
        const users = getUsersFromLocalStorage();
        const userIndex = users.findIndex(user => user.username === usernameValue);
        const currentUser = users[userIndex];
        // קבלת מידע על הזמן הנוכחי
        const currentDate = new Date();
        if(currentUser.count==0){
          updateUser(usernameValue,currentDate);
          window.location.href = "Games_Home.html";
        }
        updateUser(usernameValue,currentDate);
        displayDateMessage(currentUser.currentDate);
  
    } 
    else {
        numOfTry++;
        if(numOfTry>=3){
          setLocalStorageExpiration('blocked',EXPMINUTES);
          numOfTry=0;
          alert(`Too many attempts Try again in ${EXPMINUTES} minutes`);
        }
        else{
          alert("Invalid username or password. Please try again.");
        }
    }
  
  });

  