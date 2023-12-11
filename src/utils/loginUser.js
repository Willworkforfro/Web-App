

// window.onload= () => { 
//     document.getElementById('blog').style.display = 'none'


let userID = "";
let notesArray=[]

let appAuthentification = {

                user:"",
                email: null,

createLogin: function(){

this.emailReg = document.getElementById('create-user-email').value;
this.passwordReg = document.getElementById('create-user-password').value;

firebase.auth().createUserWithEmailAndPassword(this.emailReg, this.passwordReg)
.then((userCredential) => {
// Signed in 
var user = userCredential.user;
console.log(user)
document.getElementById('create-login-form').style.display = 'none'

})
.catch((error) => {
var errorCode = error.code;
var errorMessage = error.message;

console.error(errorCode, errorMessage); // Log the error details
        // Handle errors, display an error message, etc.
// ..
});

},

signIn:function (){

this.email = document.getElementById('sign-in-email-input').value;
this.password = document.getElementById('sign-in-password').value;


firebase.auth().signInWithEmailAndPassword(this.email, this.password) 
.then((userCredential) => {
    // Signed in
    // add a property called userID and then update that property on sign in
    userID = userCredential.user.uid
    user = userCredential.user.uid
console.log(userCredential)
 // Check the logs in the console to see if this message appears
 console.log("Before redirection");
 // Attempt redirection
 window.location.href = '/public/main.html';
})
.catch((error) => {
 var errorCode = error.code;
 var errorMessage = error.message;
 console.error(errorCode, errorMessage);

 // Check if this message appears in the console upon error
 console.log("Redirection failed due to error:", errorMessage);
});

}
}