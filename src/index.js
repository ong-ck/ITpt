import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js

import { getFirestore,
         collection, 
         addDoc
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import { 
  score, 
  get_age_group, 
  get_push_up, 
  get_sit_up, 
  get_run_row, 
  get_run_score,
  get_add_push_up,
  get_add_sit_up,
  get_run_time_cut,
} from "./calculator.js";

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

const db = getFirestore();
/*
var e = [
  {
    title: 'All Day Event',
    start: '2022-06-03',
    description: "description for All Day Event"
  }];

function draw(e) {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: e,
    editable: true
  });
  calendar.render();
}
*/
// does not work
/*
$("button").click(function () {
  fetch('https://ippt.vercel.app/api?age=18&situps=40&pushups=20&run=720', { method: "GET", mode: 'no-cors', headers: { 'Content-Type': 'application/json',}})
     .then( response => response.json() )
     .then( data => console.log(data) )

});
*/

$(document).ready(function () {
  /* Sample code to add data to database from 
  https://firebase.google.com/docs/firestore/quickstart#web-version-9_2
  
  const docRef = addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
  */

  //draw(e);
  //document.getElementById("signout").style.visibility = "hidden";
  $(".signout").hide();
  $(".cal").hide();
  $(".rewards").hide();
  $("#result").hide();

  $('ul.navbar-left > li')
    .click(function (e) {
      $('ul.navbar-nav > li')
        .removeClass('active');
      $(this).addClass('active');
    });

  $("form").submit(function(event){
    event.preventDefault();
    var age = $("input[name='age']",this).val();
    var pushups = $("input[name='pushups']",this).val();
    var situps = $("input[name='situps']",this).val();
    var run_min = $("input[name='run_min']",this).val();
    var run_sec = $("input[name='run_sec']",this).val();

    if (run_sec < 10) {
      run_sec = "0" + String(run_sec);
    }

    $("form").hide();
    $("#result").show();

    var s = score(age, pushups, situps, run_min, run_sec);
    var age_group = get_age_group(age);
    var push_up_points = get_push_up(age_group, pushups);
    var sit_up_points = get_sit_up(age_group, situps);
    var run_row = get_run_row(run_min, run_sec);
    var run_points = get_run_score(age_group, run_row);

    $("#points").empty().prepend(s + " POINTS")
    $("#age").empty().prepend(age)
    $("#pushup_num").empty().prepend(pushups);
    $("#pushup_points").empty().prepend(push_up_points);
    $("#pushup_rec").empty().prepend(get_add_push_up(age_group, pushups, push_up_points));
    $("#situp_num").empty().prepend(situps);
    $("#situp_points").empty().prepend(sit_up_points);
    $("#situp_rec").empty().prepend(get_add_sit_up(age_group, situps, sit_up_points));
    $("#run_num").empty().prepend(run_min + " : " + run_sec);
    $("#run_points").empty().prepend(run_points);
    $("#run_rec").empty().prepend(get_run_time_cut(age_group, run_min, run_sec, run_row, run_points));

    if (s >= 85) {
      $("#gold").css({ 'display': 'inline' });
    } else if (s >= 75) {
      $("#silver").css({ 'display': 'inline' });
    } else if (s >= 61) {
      $("#pass").css({ 'display': 'inline' });
    } else {
      $("#fail").css({ 'display': 'inline' });
    }
    
  });
});

$("#cal_agn").click(function () {
  $("form").show();
  $("#result").hide();
  $("#gold").css({ 'display': 'none' });
  $("#silver").css({ 'display': 'none' });
  $("#pass").css({ 'display': 'none' });
  $("#fail").css({ 'display': 'none' });
});

$("#brand_link").click(function () {
  $(".cal").hide();
  $("#cal_link").removeClass('active');
  $(".rewards").hide();
  $("#rewards_link").removeClass('active');
  $(".home").show();
  $("#home_link").addClass('active');
});

$("#home_link").click(function () {
  $(".cal").hide();
  $(".rewards").hide();
  $(".home").show();
});

$("#cal_link").click(function () {
  $(".home").hide();
  $(".rewards").hide();
  $(".cal").show();
});

$("#rewards_link").click(function () {
  $(".home").hide();
  $(".cal").hide();
  $(".rewards").show();
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