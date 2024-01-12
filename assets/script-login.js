const firebaseConfig = {
  apiKey: "AIzaSyCZaF8U9TyuYaGcL7_WU5la2GBxRkBK0Mc",
  authDomain: "test-login-page-e7b09.firebaseapp.com",
  projectId: "test-login-page-e7b09",
  storageBucket: "test-login-page-e7b09.appspot.com",
  messagingSenderId: "185374551631",
  appId: "1:185374551631:web:eee5e67bce63810636c43a",
  measurementId: "G-R9NDT6LY28"
};

// Initializing Firebase
var firebase = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

// getting the warning field
var freeField = document.getElementById('free');

// Setting up the register function
function register() {
  // Getting all the input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  username = document.getElementById('username').value

  // Validating input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    ('email or password is invalid.')
    return
  }
  if (validate_username(username) == false) {
    freeField.innerHTML = 'One or More Extra Fields is Outta Line!!'
    return
  }

  // Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Creating user variable
      var user = auth.currentUser

      // Adding user to Firebase Database
      var database_ref = database.ref()

      // Creating User data
      var user_data = {
        email: email,
        username: username,
        last_login: Date.now()
      }

      // Pushing user data to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)

      // User creating message
      freeField.innerHTML = 'User Created!!'
    })
    .catch(function (error) {
      var error_code = error.code
      var error_message = error.message
      console.log(error_message)
    })
}

// Setting up the login function
function login() {
  // Getting all input fields
  username = document.getElementById("username").value;
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validating input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    freeField.innerHTML = 'Email or Password is invalid'
    return
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Craeting user variable
      var user = auth.currentUser

      // Adding user to Firebase Database
      var database_ref = database.ref()

      // Creating User data
      var user_data = {
        last_login: Date.now()
      }

      // Pushing user data Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)

      // Login message
      freeField.innerHTML = 'User Logged In!!'

      // Redirecting to movie site after logging in
      window.location.href = "https://a-r3n.github.io/movie-recommendation-project/index-interface.html"

    })
    .catch(function (error) {
      var error_code = error.code
      var error_message = error.message
      console.log(error_message)
    })
}

// Validating the Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // if Email is valid
    return true
  } else {
    // if Email is not valid
    return false
  }
}

function validate_password(password) {
  // To ensure a password that is longer than 6 characters
  if (password < 6) {
    return false
  } else {
    return true
  }
}

// validating the username field
function validate_username(username) {
  if (username == null) {
    return false
  }

  if (username.length <= 0) {
    return false
  } else {
    return true
  }
}