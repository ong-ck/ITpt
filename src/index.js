import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js
import { getAuth, 
         onAuthStateChanged,
         GoogleAuthProvider,
         signInWithPopup,
         signOut,
       } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js


const firebaseApp = initializeApp({
  apiKey: "AIzaSyAabIrGuFwV69dJ2XsB5S5tEZ5vijR2Mc8",
  authDomain: "itpt-d53e0.firebaseapp.com",
  projectId: "itpt-d53e0",
  storageBucket: "itpt-d53e0.appspot.com",
  messagingSenderId: "857224886725",
  appId: "1:857224886725:web:14ae557f4292140be973ac",
  measurementId: "G-6J0EX5MG30"
});
// const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);
const auth = getAuth();
const user = auth.currentUser;

$(document).ready(function () {
  //document.getElementById("signout").style.visibility = "hidden";
  $(".signout").hide();
  $('ul.navbar-nav > li')
          .click(function (e) {
      $('ul.navbar-nav > li')
          .removeClass('active');
      $(this).addClass('active');
  });
});




document.getElementById("signin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    //document.getElementById("signin").style.visibility = 'hidden';
    //document.getElementById("signout").style.visibility = 'visible';
    $(".signin").hide();
    $(".signout").show();
    $("#welcome").append(user.displayName);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
});

document.getElementById("signout").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    //document.getElementById("signin").style.visibility = 'visible';
    //document.getElementById("signout").style.visibility = 'hidden';
    $(".signin").show();
    $(".signout").hide();
  }).catch((error) => {
    // An error happened.
  });
});

onAuthStateChanged(auth, user => {
  if (user != null) {
    console.log('logged in!');
  } else {
    console.log('No user');
  }
});