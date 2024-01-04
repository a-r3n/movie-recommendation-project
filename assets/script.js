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
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
document.querySelector('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get user info
  const email = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  // Log the user in
  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log('User logged in:', cred.user);
      // Redirect to another page or update the UI
    })
    .catch((err) => {
      console.error(err);
      alert('Error during login: ' + err.message);
    });
});
