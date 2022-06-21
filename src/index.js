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

/**
 * Calendar function
 */

//Array to hold all the events.
var allEvents = [];

/**
 * This functions generates a random number to be the event's ID
 * @returns The randomly generated event ID.
 */
function UIDgen() {
  var eventUIDN = "";
  for (var i = 0; i < 16; i++) {
    eventUIDN += Math.floor(Math.random() * (10 - 1 + 1) + 1);
  }
  return eventUIDN;
}

function exportCalendar() {
  var filenametrue = "myCalendar";
  filenametrue = filenametrue.replace(/[_\W]+/g, "_") + ".ics";
  var icsContent = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//itpt.ml//ITpt\r\n" + 
                   "CALSCALE:GREGORIAN\r\nBEGIN:VTIMEZONE\r\nTZID:Asia/Shanghai\r\n" + 
                   "LAST-MODIFIED:20220622T051600Z\r\n" + 
                   "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Shanghai\r\n" + 
                   "X-LIC-LOCATION:Asia/Shanghai\r\nBEGIN:STANDARDTZNAME:CST\r\n" + 
                   "TZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nDTSTART:19700101T000000\r\n" + 
                   "END:STANDARD\r\nEND:VTIMEZONE\r\n";
                   
  for (let i = 0; i < allEvents.length; i += 1) {
    console.log(allEvents[i]);
    let timestamp = allEvents[i]["start"].replaceAll("-", "") + "T000000Z"; // example format: 20220621T210536Z
    let start = allEvents[i]["start"].replaceAll("-", "");
    let title = allEvents[i]["title"];
    let uid = allEvents[i]["id"];

    icsContent += "BEGIN:VEVENT\r\nDTSTAMP:" + timestamp + "\r\n" + 
                  "UID:" + uid + "\r\n" + 
                  "DTSTART;VALUE=DATE:" + start + "\r\nDTEND;VALUE=DATE:" + start + "\r\n" + 
                  "SUMMARY:Pushup\r\nEND:VEVENT\r\n";
  }

  icsContent += "END:VCALENDAR";

  var hiddenDL = document.createElement("a");
  hiddenDL.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(icsContent)
  );
  hiddenDL.setAttribute("download", filenametrue);
  hiddenDL.setAttribute("target", "_blank");
  hiddenDL.style.display = "none";
  document.body.appendChild(hiddenDL);
  hiddenDL.click();
  document.body.removeChild(hiddenDL);
}

/**
 * This function initializes the FullCalendar.
 * @param {*} allEvents Array that holds all the event objects that will be added by the user.
 */
function initCalendar(allEvents) {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2022-06-01',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'exportCalendar dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable: true,
    events: allEvents,
    editable: true,
    customButtons: {
      //Export calendar
      exportCalendar: {
        text: "Export",
        click: function () {
          exportCalendar();
        },
      },
    },

    //Add events
    select: function(info) {
      let titleStr = prompt('Enter the activity');
      let start_date = moment(info.startStr).format('YYYY-MM-DD');
      console.log(start_date);
      
      let e = {
        title: titleStr,
        start: start_date,
        //end: end_date,
        id: UIDgen(),
      };

      if (e.title != null) {
        allEvents.push(e);
        calendar.addEvent({
          ...e
        });
      }
    },

    //Select and Delete events
    eventClick: function(info) {
      let a = calendar.getEventById(info.event.id);

      //Updates title in event popup
      $("#activity_title").empty().prepend("Title: "+ info.event.title);
      $("#activity_date").empty().prepend("Date: "+ info.event.start);

      //Toggles modal which dispalys the event info.
      $('#eventForm').modal('toggle');
      
      //Delete Event
      $('#delBtn').click(function(){  
        a.remove();
        allEvents = allEvents.filter(data => data.id != info.event.id); 
        $('#eventForm').modal('toggle');
      });     
    },
  });
  calendar.render();
}

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

  initCalendar(allEvents);

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