// Hamburger menu

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');
  
    let showMenu = false;
  
    menuBtn.addEventListener('click', function() {
      if (!showMenu) {
        menu.style.display = 'block';
        showMenu = true;
      } else {
        menu.style.display = 'none';
        showMenu = false;
      }
    });
  });
  


let  signOut= {


logOut: function () {
    console.log(firebase)
    firebase.auth().signOut().then(() =>{
    console.log("Logged Out");
    window.location.href = '/public/index.html';

})
.catch ((error) => {
    //error
});
}
}