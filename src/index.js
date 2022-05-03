import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'; // https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js

import { score } from "./calculator.js";

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

// register templates
var templates = {
  popupIsAllDay: function() {
    return 'All Day';
  },
  popupStateFree: function() {
    return 'Free';
  },
  popupStateBusy: function() {
    return 'Busy';
  },
  titlePlaceholder: function() {
    return 'Subject';
  },
  locationPlaceholder: function() {
    return 'Location';
  },
  startDatePlaceholder: function() {
    return 'Start date';
  },
  endDatePlaceholder: function() {
    return 'End date';
  },
  popupSave: function() {
    return 'Save';
  },
  popupUpdate: function() {
    return 'Update';
  },
  popupDetailDate: function(isAllDay, start, end) {
    var isSameDate = moment(start).isSame(end);
    var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

    if (isAllDay) {
      return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
    }

    return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
  },
  popupDetailLocation: function(schedule) {
    return 'Location : ' + schedule.location;
  },
  popupDetailUser: function(schedule) {
    return 'User : ' + (schedule.attendees || []).join(', ');
  },
  popupDetailState: function(schedule) {
    return 'State : ' + schedule.state || 'Busy';
  },
  popupDetailRepeat: function(schedule) {
    return 'Repeat : ' + schedule.recurrenceRule;
  },
  popupDetailBody: function(schedule) {
    return 'Body : ' + schedule.body;
  },
  popupEdit: function() {
    return 'Edit';
  },
  popupDelete: function() {
    return 'Delete';
  }
};

var cal = new tui.Calendar('#calendar', {
  defaultView: 'month',
  template: templates,
  useCreationPopup: true,
  useDetailPopup: true
})

/*
// jquery wrapper
var $calEl = $('#calendar').tuiCalendar({
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
  }
});

// You can get calendar instance
var calendarInstance = $calEl.data('tuiCalendar');

$("#add_e").click(function () {
  score();
  calendarInstance.createSchedules([{
    id: '1',
    calendarId: '1',
    title: 'my schedule',
    category: 'time',
    dueDateClass: '',
    start: '2022-05-15T22:30:00+09:00',
    end: '2022-05-19T02:30:00+09:00'
  }]);
});

$("#del_e").click(function () {
  calendarInstance.deleteSchedule("1", "1", false);
});
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
  //document.getElementById("signout").style.visibility = "hidden";
  $(".signout").hide();
  $(".cal").hide();
  $(".rewards").hide();

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
    var run = $("input[name='run']",this).val();
    alert(age);
  });
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