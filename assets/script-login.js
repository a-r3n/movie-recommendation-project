// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgwe08Id9ABD-hItlCdcOiOflks4nvOhY",
    authDomain: "movie-recommendation-pro-fc29b.firebaseapp.com",
    projectId: "movie-recommendation-pro-fc29b",
    storageBucket: "movie-recommendation-pro-fc29b.appspot.com",
    messagingSenderId: "763942579046",
    appId: "1:763942579046:web:10b966353190f847cef6a7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Function to log in
function login() {
  var userEmail = document.getElementById("username").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
  .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // You can redirect the user to a different page here
      window.location.href = '/index-interface.html'; 
  })
  .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.getElementById("login-error").innerHTML = errorMessage;
  });
}

// Prevent the form from submitting normally
document.getElementById("login-form").addEventListener("submit", function(event){
  event.preventDefault();
  login();
});
