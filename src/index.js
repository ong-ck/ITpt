import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"; // https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"; // https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js

import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
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
  measurementId: "G-6J0EX5MG30",
});

// const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider(firebaseApp);
const auth = getAuth();
const user = auth.currentUser;
var user_id = null;
const db = getFirestore();

/**
 * Global variables used
 */
//Array to hold all the events.
var allEvents = [];

//Variable to hold the user's credits.
var total_credits = 0;

/**
 * Calendar function
 */

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

/**
 * This function adds activity added in calendar to the database.
 * @param {*} activity The event object to be added into the database.
 */
function db_add(activity) {
  let activity_title = activity["title"];
  let activity_start = activity["start"];
  let activity_id = activity["id"];
  let activity_time = activity["extendedProps"]["time"];
  let activity_desc = activity["extendedProps"]["description"];

  const docRef = setDoc(doc(db, "users", user_id, "activities", activity_id), {
    id: activity_id,
    title: activity_title,
    start: activity_start,
    extendedProps: {
      time: activity_time,
      description: activity_desc,
    },
  });
}

/**
 * This functions exports the calender into a .ics file for the user to download.
 */
function exportCalendar() {
  var filenametrue = "myCalendar";
  filenametrue = filenametrue.replace(/[_\W]+/g, "_") + ".ics";
  var icsContent =
    "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//itpt.ml//ITpt\r\n" +
    "CALSCALE:GREGORIAN\r\nBEGIN:VTIMEZONE\r\nTZID:Asia/Singapore\r\n" +
    "LAST-MODIFIED:20201011T015911Z\r\n" +
    "TZURL:http://tzurl.org/zoneinfo-outlook/Asia/Singapore\r\n" +
    "X-LIC-LOCATION:Asia/Singapore\r\nBEGIN:STANDARD\r\nTZNAME:+08\r\n" +
    "TZOFFSETFROM:+0800\r\nTZOFFSETTO:+0800\r\nDTSTART:19700101T000000\r\n" +
    "END:STANDARD\r\nEND:VTIMEZONE\r\n";

  for (let i = 0; i < allEvents.length; i += 1) {
    console.log(allEvents[i]);
    let date = new Date();
    let timestamp =
      date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2) +
      "Z";
    let start =
      allEvents[i]["start"].replaceAll("-", "") +
      "T" +
      allEvents[i]["extendedProps"]["time"] +
      "00"; // example format: 20220621T210536Z
    let title = allEvents[i]["title"];
    let uid = allEvents[i]["id"];
    let description = allEvents[i]["extendedProps"]["description"];

    icsContent +=
      "BEGIN:VEVENT\r\nDTSTAMP:" +
      timestamp +
      "\r\n" +
      "UID:" +
      uid +
      "\r\n" +
      "DTSTART;VALUE=DATE:" +
      start +
      "\r\nDTEND;VALUE=DATE:" +
      start +
      "\r\n" +
      "SUMMARY:" +
      title +
      "\r\nDESCRIPTION:" +
      description +
      "\r\nEND:VEVENT\r\n";
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
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    //Calendar settings.
    initialView: "dayGridMonth",
    initialDate: "2022-06-01",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "exportCalendar dayGridMonth,timeGridWeek,timeGridDay",
    },
    selectable: true,
    events: allEvents,
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
    select: function (info) {
      $("#insert_date")
        .empty()
        .prepend("Date: " + moment(info.startStr).format("Do MMMM YYYY"));

      let titleStr = prompt("Enter the activity");
      if (titleStr != null) {
        let start_date = moment(info.startStr).format("YYYY-MM-DD");
        let timeStr = prompt("Enter the time of the activity in 24hrs format");

        if (timeStr != null) {
          let descriptStr = prompt("Enter the details of the activity");

          console.log(titleStr);
          console.log(start_date);
          console.log(timeStr);
          console.log(descriptStr);

          //Create the event object
          let e = {
            id: UIDgen(),
            title: titleStr,
            start: start_date,
            eventBackgroundColor: "red",
            extendedProps: {
              time: timeStr,
              description: descriptStr == null ? "Nill" : descriptStr,
            },
          };

          if (e.title != null) {
            allEvents.push(e);

            calendar.addEvent({
              ...e,
            });

            // Add specific activity to Firestore
            if (user_id != null) {
              db_add(e);
            }
          }
        }
      }
    },

    //Select and Delete events
    eventClick: function (info) {
      let a = calendar.getEventById(info.event.id);

      //Updates details in event popup
      $("#infoLabel").empty().prepend(info.event.title);
      $("#activity_date")
        .empty()
        .prepend("Date: " + moment(info.event.start).format("Do MMMM YYYY"));
      $("#activity_time")
        .empty()
        .prepend("Time: " + info.event.extendedProps.time);
      $("#activity_description")
        .empty()
        .prepend("Details: " + info.event.extendedProps.description);

      //Toggles modal which dispalys the event info.
      $("#eventForm").modal("toggle");

      //Delete Event
      $("#delBtn").click(function () {
        a.remove();
        allEvents = allEvents.filter((data) => data.id != info.event.id); // filter out deleted data

        // Deletes clicked activity from Firestore
        if (user_id != null) {
          let doc_id = info.event.id;
          deleteDoc(doc(db, "users", user_id, "activities", doc_id));
        }

        $("#eventForm").modal("toggle");
      });

      //Complete Event
      $("#completeBtn").click(function () {

        //Adds 5 credits to the user's credits
        addDoc(collection(db, "users", user_id, "credits"), {
          amount: 5
        });

        //Removes activity.
        a.remove();
        allEvents = allEvents.filter((data) => data.id != info.event.id); // filter out deleted data

        if (user_id != null) {
          let doc_id = info.event.id;
          deleteDoc(doc(db, "users", user_id, "activities", doc_id));
        }

        $("#eventForm").modal("toggle");
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
  $(".profile").hide();

  $("ul.navbar-left > li").click(function (e) {
    $("ul.navbar-nav > li").removeClass("active");
    $(this).addClass("active");
  });

  //Get the information from the form.
  $("#cal_form").submit(function (event) {
    event.preventDefault();
    var age = $("input[name='age']", this).val();
    var pushups = $("input[name='pushups']", this).val();
    var situps = $("input[name='situps']", this).val();
    var run_min = $("input[name='run_min']", this).val();
    var run_sec = $("input[name='run_sec']", this).val();

    if (run_sec < 10) {
      run_sec = "0" + String(run_sec);
    }

    $("#cal_form").hide();
    $("#result").show();

    //Calculate the respective IPPT scores.
    var s = score(age, pushups, situps, run_min, run_sec);
    var age_group = get_age_group(age);
    var push_up_points = get_push_up(age_group, pushups);
    var sit_up_points = get_sit_up(age_group, situps);
    var run_row = get_run_row(run_min, run_sec);
    var run_points = get_run_score(age_group, run_row);

    // Display the results.
    $("#points")
      .empty()
      .prepend(s + " POINTS");
    $("#age").empty().prepend(age);
    $("#pushup_num").empty().prepend(pushups);
    $("#pushup_points").empty().prepend(push_up_points);
    $("#pushup_rec")
      .empty()
      .prepend(get_add_push_up(age_group, pushups, push_up_points));
    $("#situp_num").empty().prepend(situps);
    $("#situp_points").empty().prepend(sit_up_points);
    $("#situp_rec")
      .empty()
      .prepend(get_add_sit_up(age_group, situps, sit_up_points));
    $("#run_num")
      .empty()
      .prepend(run_min + " : " + run_sec);
    $("#run_points").empty().prepend(run_points);
    $("#run_rec")
      .empty()
      .prepend(
        get_run_time_cut(age_group, run_min, run_sec, run_row, run_points)
      );

    if (s >= 85) {
      $("#gold").css({ display: "inline" });
    } else if (s >= 75) {
      $("#silver").css({ display: "inline" });
    } else if (s >= 61) {
      $("#pass").css({ display: "inline" });
    } else {
      $("#fail").css({ display: "inline" });
    }

    // Save results to database
    $("#save_result").click(function () {
      addDoc(collection(db, "users", user_id, "ipptScores"), {
        pushup: parseInt(pushups),
        pushupPoints: parseInt(push_up_points),
        situp: parseInt(situps),
        situpPoints: parseInt(sit_up_points),
        run_min: parseInt(run_min),
        run_sec: parseInt(run_sec),
        runPoints: parseInt(run_points),
        points: parseInt(s),
      }).then(() => {
        alert("Results succesfully saved!");
        $("#cal_form").show();
        $("#result").hide();
      });
    });
  });
});

$("#cal_agn").click(function () {
  $("#cal_form").show();
  $("#result").hide();
  $("#gold").css({ display: "none" });
  $("#silver").css({ display: "none" });
  $("#pass").css({ display: "none" });
  $("#fail").css({ display: "none" });
});

$("#brand_link").click(function () {
  $(".cal").hide();
  $("#cal_link").removeClass("active");
  $(".rewards").hide();
  $("#rewards_link").removeClass("active");
  $(".home").show();
  $("#home_link").addClass("active");
  $(".profile").hide();
});

$("#home_link").click(function () {
  $(".cal").hide();
  $(".rewards").hide();
  $(".home").show();
  $(".profile").hide();
});

$("#cal_link").click(function () {
  $(".home").hide();
  $(".rewards").hide();
  $(".cal").show();
  $(".profile").hide();
});

$("#rewards_link").click(function () {
  $(".home").hide();
  $(".cal").hide();
  $(".rewards").show();
  $(".profile").hide();
});

$("#profile_link").click(function () {
  // Updates the profile page with user details.
  let creditTemp = 0; //This is to prevent the function from incrementing from the previous count.
  const creditsSnapshot = getDocs(
    collection(db, "users", user_id, "credits")
  )
    .then((creditsSnapshot) => {
      creditsSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        creditTemp += parseInt(doc.data()["amount"]);
        total_credits = creditTemp;
      });
    })
    .then(() => {
      $("#credits_num").empty().prepend(total_credits); // update current credit amount
    });

  // add IPPT scores
  const scoreSnapshot = getDocs(
    collection(db, "users", user_id, "ipptScores")
  ).then((scoreSnapshot) => {
    let largestPoints = 0;
    let largestPushup = 0;
    let largestSitup = 0;
    let largestRunPoints = 0;
    scoreSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data()["points"] >= largestPoints) {
        largestPoints = doc.data()["points"];
        $("#ipptProgress").prop("value", doc.data()["points"]);
        $("#currentPointsLabel")
          .css(
            "margin-left",
            String((parseInt(doc.data()["points"]) / 85) * 88) + "%"
          )
          .empty()
          .prepend(doc.data()["points"] + " Point(s)");
      }

      if (doc.data()["pushup"] >= largestPushup) {
        largestPushup = doc.data()["pushup"];
        $("#profile_pushup_num").empty().prepend(doc.data()["pushup"]);
        $("#profile_pushup_points")
          .empty()
          .prepend(doc.data()["pushupPoints"] + " Points");
      }

      if (doc.data()["situp"] >= largestSitup) {
        largestSitup = doc.data()["situp"];
        $("#profile_situp_num").empty().prepend(doc.data()["situp"]);
        $("#profile_situp_points")
          .empty()
          .prepend(doc.data()["situpPoints"] + " Points");
      }

      if (doc.data()["runPoints"] >= largestRunPoints) {
        largestRunPoints = doc.data()["runPoints"];
        $("#profile_run_num")
          .empty()
          .prepend(doc.data()["run_min"] + " : " + doc.data()["run_sec"]);
        $("#profile_run_points")
          .empty()
          .prepend(doc.data()["runPoints"] + " Points");
      }
    });
  });
  $(".home").hide();
  $("#home_link").removeClass("active");
  $(".cal").hide();
  $("#cal_link").removeClass("active");
  $(".rewards").hide();
  $("#rewards_link").removeClass("active");
  $(".profile").show();
});

/**
 * Sign in out function.
 */

/**
 * Sign in feature.
 */
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
      $("#profile_dropdown").empty().prepend(user.displayName);
      $("#welcome")
        .empty()
        .prepend("Welcome " + user.displayName);

      // Updates the profile page with user details
      // add user credits
      const creditsSnapshot = getDocs(
        collection(db, "users", user_id, "credits")
      )
        .then((creditsSnapshot) => {
          creditsSnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            total_credits += parseInt(doc.data()["amount"]);
          });
        })
        .then(() => {
          $("#credits_num").empty().prepend(total_credits); // update current credit amount
        });

      // add IPPT scores
      const scoreSnapshot = getDocs(
        collection(db, "users", user_id, "ipptScores")
      ).then((scoreSnapshot) => {
        let largestPoints = 0;
        let largestPushup = 0;
        let largestSitup = 0;
        let largestRunPoints = 0;
        scoreSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.data()["points"] >= largestPoints) {
            largestPoints = doc.data()["points"];
            $("#ipptProgress").prop("value", doc.data()["points"]);
            $("#currentPointsLabel")
              .css(
                "margin-left",
                String((parseInt(doc.data()["points"]) / 85) * 88) + "%"
              )
              .empty()
              .prepend(doc.data()["points"] + " Point(s)");
          }

          if (doc.data()["pushup"] >= largestPushup) {
            largestPushup = doc.data()["pushup"];
            $("#profile_pushup_num").empty().prepend(doc.data()["pushup"]);
            $("#profile_pushup_points")
              .empty()
              .prepend(doc.data()["pushupPoints"] + " Points");
          }

          if (doc.data()["situp"] >= largestSitup) {
            largestSitup = doc.data()["situp"];
            $("#profile_situp_num").empty().prepend(doc.data()["situp"]);
            $("#profile_situp_points")
              .empty()
              .prepend(doc.data()["situpPoints"] + " Points");
          }

          if (doc.data()["runPoints"] >= largestRunPoints) {
            largestRunPoints = doc.data()["runPoints"];
            $("#profile_run_num")
              .empty()
              .prepend(doc.data()["run_min"] + " : " + doc.data()["run_sec"]);
            $("#profile_run_points")
              .empty()
              .prepend(doc.data()["runPoints"] + " Points");
          }
        });
      });
    })
    .catch((error) => {
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

/**
 * Sign out feature.
 */
document.getElementById("signout").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      //document.getElementById("signin").style.visibility = 'visible';
      //document.getElementById("signout").style.visibility = 'hidden';
      $(".signin").show();
      $(".signout").hide();
    })
    .catch((error) => {
      // An error happened.
    });
});

/**
 * Actions to take upon logging in and logging out.
 */
onAuthStateChanged(auth, (user) => {
  // when user logs in
  if (user != null) {
    console.log("logged in!");
    user_id = user.uid;

    // create empty documents upon login (for first time logging in)
    // create document with user_id in "users" collection
    setDoc(doc(db, "users", user_id), {});
    // create initial credits document
    setDoc(doc(db, "users", user_id, "credits", "initialCredit"), {
      amount: 0,
    });
    // create intial ipptScore document
    setDoc(doc(db, "users", user_id, "ipptScores", "initialScore"), {
      pushup: 0,
      pushupPoints: 0,
      situp: 0,
      situpPoints: 0,
      run_min: 0,
      run_sec: 0,
      runPoints: 0,
      points: 0,
    });

    const querySnapshot = getDocs(
      collection(db, "users", user_id, "activities")
    )
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          allEvents.push(doc.data());
        });
      })
      .then(() => {
        initCalendar(allEvents); // re-initialise calendar upon login
      });
  }
  // when user logs out
  else {
    console.log("No user");
    user_id = null;

    // Reset global variables upon logout
    allEvents = []; // cleans local events
    total_credits = 0;

    initCalendar(allEvents); // re-initialise calendar upon logout to clean slate
    $("#home_link").click(); // returns to homepage
  }
});