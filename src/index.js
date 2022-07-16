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
  getDoc,
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
 * Adds activity added in calendar to the database.
 * @param {*} activity
 */
//Array to hold all the events.
var allEvents = [];

//Variable to hold the user's credits.
var total_credits = 0;

//Variable to hold the user's IPPT Goal.
var ippt_goal = 85;

/**
 * Calendar function
 */

/**
 * Global variables used
 */
var allEvents = []; // Array to hold all the events
var total_credits = 0;

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
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "exportCalendar refreshCalendar howToUse",
    },
    selectable: true,
    eventStartEditable: true,
    events: allEvents,
    customButtons: {
      //Export calendar
      exportCalendar: {
        text: "Export",
        click: function () {
          exportCalendar();
        },
      },
      refreshCalendar: {
        text: "Refresh",
        click: function () {
          calendar.changeView("dayGridMonth");
        },
      },
      howToUse: {
        text: "Instructions",
        click: function () {
          //Calendar Instructions
          $("#instructions_modal").modal("toggle");
          $("#insert_activity").hide();
          $("#reschedule_activity").hide();
          $("#delete_activity").hide();
          $('#insert_tablink').removeClass('active');
          $('#reschedule_tablink').removeClass('active');
          $('#delete_tablink').removeClass('active');

          $('#insert_tablink').click(function() {
            $("#insert_activity").show();
            $("#reschedule_activity").hide();
            $("#delete_activity").hide();
            $('#insert_tablink').addClass('active');
            $('#reschedule_tablink').removeClass('active');
            $('#delete_tablink').removeClass('active');
          });

          $('#reschedule_tablink').click(function() {
            $("#insert_activity").hide();
            $("#reschedule_activity").show();
            $("#delete_activity").hide();
            $('#insert_tablink').removeClass('active');
            $('#reschedule_tablink').addClass('active');
            $('#delete_tablink').removeClass('active');
          });

          $('#delete_tablink').click(function() {
            $("#insert_activity").hide();
            $("#reschedule_activity").hide();
            $("#delete_activity").show();
            $('#insert_tablink').removeClass('active');
            $('#reschedule_tablink').removeClass('active');
            $('#delete_tablink').addClass('active');
          });
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

        if (timeStr >= 0 && timeStr < 2400) {
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
        } else {
          alert("Please key in a valid time!");
        }
      }
    },
    
    //Select and Delete events
    eventClick: function (info) {
      let a = calendar.getEventById(info.event.id);

      //User is signed in
      if (user_id != null) {
      //Update the Start Date of the activity
      setDoc(doc(db, "users", user_id, "activities", info.event.id), {
        extendedProps: {
          time: info.event.extendedProps.time,
          description: info.event.extendedProps.description,
        },
        id: info.event.id,
        start: moment(info.event.start).format("YYYY-MM-DD"),
        title: info.event.title,
      });
    }

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
          amount: 5,
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

/**
 * Rewards Page Game
 */

//Instructions
$('#rewards_instruct_button').click(function() {
  $("#rewards_instruct_modal").modal("toggle");
  $("#summon_avatar").hide();
  $("#select_avatar").hide();
  $('#summon_tablink').removeClass('active');
  $('#select_tablink').removeClass('active');
});

$('#summon_tablink').click(function() {
  $("#summon_avatar").show();
  $("#select_avatar").hide();
  $('#summon_tablink').addClass('active');
  $('#select_tablink').removeClass('active');
});

$('#select_tablink').click(function() {
  $("#summon_avatar").hide();
  $("#select_avatar").show();
  $('#summon_tablink').removeClass('active');
  $('#select_tablink').addClass('active');
});

//Summon Avatar
$("#rewards_button").click(function () {
  // check if user has enough credits to use
  if (parseInt($("#rewards_credits").text()) > 0) {
    // deducts 5 credits from user
    addDoc(collection(db, "users", user_id, "credits"), {
      amount: -5,
    });

    /**
     * Users gets a random avatar and a popup confirmation
     */
    // variables to be used
    let numOfAvatar = 0;
    let avatarIndex = null;
    let url = null;

    const numOfAvatarSnapshot = getDoc(doc(db, "avatars", "numOfAvatars"))
      .then((doc) => {
        numOfAvatar = doc.data()["count"]; // gets total number of avatars available
        avatarIndex = Math.floor(Math.random() * numOfAvatar); // gets a random avatar index
      })
      .then(() => {
        // add avatar obtained to user database
        const avatarSnapshot = getDoc(doc(db, "avatars", String(avatarIndex)))
          .then((doc) => {
            // get avatar info from database
            console.log(doc.data());
            url = doc.data()["url"];
          })
          .then(() => {
            // add avatar info into user database
            setDoc(doc(db, "users", user_id, "avatars", String(avatarIndex)), {
              url: url,
            });
          })
          .then(() => {
            $("#avatar_won_placeholder").attr("src", String(url));
            $("#avatar_win").modal("toggle");
          });
      });
  } else if (user_id == null) {
    alert("Please sign in!");
  } else {
    alert("You do not have enough credits!");
  }

  // refresh rewards page to show updated credits
  $("#home_link").click();
  $("#rewards_link").click();
});

/**
 * User Profile
 */

/**
 * This function updates the user profile.
 */
function updateProfile() {
  //Updates the IPPT Goal
  const goalSnapshot = getDoc(
    doc(db, "users", user_id, "ipptGoal", "initialGoal")
  ).then((doc) => {
    if (doc.exists()) {
      console.log("document exist");
      ippt_goal = doc.data()["goal"];
    } else {
      console.log("document does not exist");
      ippt_goal = 85;
    }
    $("#goal_num")
      .empty()
      .prepend(ippt_goal + " Point(s)");
    console.log(ippt_goal);
  });

  // Updates the profile page with user details.
  let creditTemp = 0; //This is to prevent the function from incrementing from the previous count.
  const creditsSnapshot = getDocs(collection(db, "users", user_id, "credits"))
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
        $("#ipptProgress").prop("max", ippt_goal);
        $("#currentPointsLabel")
          .empty()
          .append("Best IPPT Score: " + largestPoints + " Point(s)");
        $("#goalLabel")
          .empty()
          .append("Desired IPPT Score: " + ippt_goal + " Point(s)");
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
}

//Save the ippt goal to database
$("#save_goal").click(function () {
  let tempIpptGoal = prompt("Key in your desired IPPT Goal");
  if (tempIpptGoal > 0 && tempIpptGoal <= 100) {
    setDoc(doc(db, "users", user_id, "ipptGoal", "initialGoal"), {
      goal: parseInt(tempIpptGoal),
    }).then(() => {
      alert("IPPT Goal succesfully updated!");
      updateProfile();
    });
  } else {
    alert("Please key in a valid IPPT Score!");
  }
});

// profile avatar
$("#avatar_placeholder").click(function () {
  $("#avatar_list").empty();
  let url_list = [];

  // obtain avatars available from user database
  const avatarSnapshot = getDocs(collection(db, "users", user_id, "avatars"))
    .then((avatarSnapshot) => {
      avatarSnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        url_list.push(doc.data()["url"]);
      });
    })
    .then(() => {
      // appends avatar images into modal
      for (let i = 0; i < url_list.length; i += 1) {
        $("#avatar_list").append(
          `<img id="image_${i}" class="avatar_list_item" src="${url_list[i]}" alt="Avatar List Item" style="display: block; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px;"/>`
        );
      }

      // adds click event listener to allow selection of avatar
      for (let i = 0; i < url_list.length; i += 1) {
        $(`#image_${i}`).click(() => {
          $("#avatar_placeholder").empty();
          $("#avatar_placeholder").append(
            `<img src="${url_list[i]}" alt="Avatar Image"/>`
          );
          $("#choose_avatar").modal("hide");
        });
      }
    })
    .then(() => {
      // if user has no avatar in database for selection
      if (url_list.length == 0) {
        $("#avatar_list").append(`<p>You currently have no avatars.</p>`);
      }
      $("#choose_avatar").modal("toggle");
    });
});

// toggles the exercise recommendation modal
$("#recommend").click(function () {
  $("#pushup").hide();
  $("#situp").hide();
  $("#run").hide();
  $("#recommend_modal").modal("toggle");

  // opens the pushup tab
  $("#pushup_tablink").click(function () {
    $("#pushup_tablink").addClass("active");
    $("#situp_tablink").removeClass("active");
    $("#run_tablink").removeClass("active");
    $("#pushup_easy_tablink").removeClass("active");
    $("#pushup_med_tablink").removeClass("active");
    $("#pushup_hard_tablink").removeClass("active");

    $("#pushup").show();
    $("#situp").hide();
    $("#run").hide();

    $("#pushup_easy_rec").hide();
    $("#pushup_med_rec").hide();
    $("#pushup_hard_rec").hide();

    $("#pushup_easy_1").hide();
    $("#pushup_easy_2").hide();
    $("#pushup_med_1").hide();
    $("#pushup_med_2").hide();
    $("#pushup_hard_1").hide();
    $("#pushup_hard_2").hide();

    $("#pushup_easy_tablink").click(function () {
      $("#pushup_easy_tablink").addClass("active");
      $("#pushup_med_tablink").removeClass("active");
      $("#pushup_hard_tablink").removeClass("active");
      $("#pushup_easy_1_btn").removeClass("active");
      $("#pushup_easy_2_btn").removeClass("active");

      $("#pushup_easy_rec").show();
      $("#pushup_med_rec").hide();
      $("#pushup_hard_rec").hide();
      $("#pushup_easy_1").hide();
      $("#pushup_easy_2").hide();
    });

    $("#pushup_easy_1_btn").click(function () {
      $("#pushup_easy_1_btn").addClass("active");
      $("#pushup_easy_2_btn").removeClass("active");
      $("#pushup_easy_1").show();
      $("#pushup_easy_2").hide();
    });

    $("#pushup_easy_2_btn").click(function () {
      $("#pushup_easy_2_btn").addClass("active");
      $("#pushup_easy_1_btn").removeClass("active");
      $("#pushup_easy_2").show();
      $("#pushup_easy_1").hide();
    });

    $("#pushup_med_tablink").click(function () {
      $("#pushup_easy_tablink").removeClass("active");
      $("#pushup_med_tablink").addClass("active");
      $("#pushup_hard_tablink").removeClass("active");
      $("#pushup_med_1_btn").removeClass("active");
      $("#pushup_med_2_btn").removeClass("active");

      $("#pushup_easy_rec").hide();
      $("#pushup_med_rec").show();
      $("#pushup_hard_rec").hide();
      $("#pushup_med_1").hide();
      $("#pushup_med_2").hide();
    });

    $("#pushup_med_1_btn").click(function () {
      $("#pushup_med_1_btn").addClass("active");
      $("#pushup_med_2_btn").removeClass("active");
      $("#pushup_med_1").show();
      $("#pushup_med_2").hide();
    });

    $("#pushup_med_2_btn").click(function () {
      $("#pushup_med_2_btn").addClass("active");
      $("#pushup_med_1_btn").removeClass("active");
      $("#pushup_med_2").show();
      $("#pushup_med_1").hide();
    });

    $("#pushup_hard_tablink").click(function () {
      $("#pushup_easy_tablink").removeClass("active");
      $("#pushup_med_tablink").removeClass("active");
      $("#pushup_hard_tablink").addClass("active");
      $("#pushup_hard_1_btn").removeClass("active");
      $("#pushup_hard_2_btn").removeClass("active");

      $("#pushup_easy_rec").hide();
      $("#pushup_med_rec").hide();
      $("#pushup_hard_rec").show();
      $("#pushup_hard_1").hide();
      $("#pushup_hard_2").hide();
    });

    $("#pushup_hard_1_btn").click(function () {
      $("#pushup_hard_1_btn").addClass("active");
      $("#pushup_hard_2_btn").removeClass("active");
      $("#pushup_hard_1").show();
      $("#pushup_hard_2").hide();
    });

    $("#pushup_hard_2_btn").click(function () {
      $("#pushup_hard_2_btn").addClass("active");
      $("#pushup_hard_1_btn").removeClass("active");
      $("#pushup_hard_2").show();
      $("#pushup_hard_1").hide();
    });
  });

  // opens the situp tab
  $("#situp_tablink").click(function () {
    $("#pushup_tablink").removeClass("active");
    $("#situp_tablink").addClass("active");
    $("#run_tablink").removeClass("active");
    $("#situp_easy_tablink").removeClass("active");
    $("#situp_med_tablink").removeClass("active");
    $("#situp_hard_tablink").removeClass("active");

    $("#pushup").hide();
    $("#situp").show();
    $("#run").hide();

    $("#situp_easy_rec").hide();
    $("#situp_med_rec").hide();
    $("#situp_hard_rec").hide();

    $("#situp_easy_1").hide();
    $("#situp_easy_2").hide();
    $("#situp_med_1").hide();
    $("#situp_med_2").hide();
    $("#situp_hard_1").hide();
    $("#situp_hard_2").hide();

    $("#situp_easy_tablink").click(function () {
      $("#situp_easy_tablink").addClass("active");
      $("#situp_med_tablink").removeClass("active");
      $("#situp_hard_tablink").removeClass("active");
      $("#situp_easy_1_btn").removeClass("active");
      $("#situp_easy_2_btn").removeClass("active");

      $("#situp_easy_rec").show();
      $("#situp_med_rec").hide();
      $("#situp_hard_rec").hide();
      $("#situp_easy_1").hide();
      $("#situp_easy_2").hide();
    });

    $("#situp_easy_1_btn").click(function () {
      $("#situp_easy_1_btn").addClass("active");
      $("#situp_easy_2_btn").removeClass("active");
      $("#situp_easy_1").show();
      $("#situp_easy_2").hide();
    });

    $("#situp_easy_2_btn").click(function () {
      $("#situp_easy_2_btn").addClass("active");
      $("#situp_easy_1_btn").removeClass("active");
      $("#situp_easy_2").show();
      $("#situp_easy_1").hide();
    });

    $("#situp_med_tablink").click(function () {
      $("#situp_easy_tablink").removeClass("active");
      $("#situp_med_tablink").addClass("active");
      $("#situp_hard_tablink").removeClass("active");
      $("#situp_med_1_btn").removeClass("active");
      $("#situp_med_2_btn").removeClass("active");

      $("#situp_easy_rec").hide();
      $("#situp_med_rec").show();
      $("#situp_hard_rec").hide();
      $("#situp_med_1").hide();
      $("#situp_med_2").hide();
    });

    $("#situp_med_1_btn").click(function () {
      $("#situp_med_1_btn").addClass("active");
      $("#situp_med_2_btn").removeClass("active");
      $("#situp_med_1").show();
      $("#situp_med_2").hide();
    });

    $("#situp_med_2_btn").click(function () {
      $("#situp_med_2_btn").addClass("active");
      $("#situp_med_1_btn").removeClass("active");
      $("#situp_med_2").show();
      $("#situp_med_1").hide();
    });

    $("#situp_hard_tablink").click(function () {
      $("#situp_easy_tablink").removeClass("active");
      $("#situp_med_tablink").removeClass("active");
      $("#situp_hard_tablink").addClass("active");
      $("#situp_hard_1_btn").removeClass("active");
      $("#situp_hard_2_btn").removeClass("active");

      $("#situp_easy_rec").hide();
      $("#situp_med_rec").hide();
      $("#situp_hard_rec").show();
      $("#situp_hard_1").hide();
      $("#situp_hard_2").hide();
    });

    $("#situp_hard_1_btn").click(function () {
      $("#situp_hard_1_btn").addClass("active");
      $("#situp_hard_2_btn").removeClass("active");
      $("#situp_hard_1").show();
      $("#situp_hard_2").hide();
    });

    $("#situp_hard_2_btn").click(function () {
      $("#situp_hard_2_btn").addClass("active");
      $("#situp_hard_1_btn").removeClass("active");
      $("#situp_hard_2").show();
      $("#situp_hard_1").hide();
    });
  });

  // opens the 2.4km run tab
  $("#run_tablink").click(function () {
    $("#pushup_tablink").removeClass("active");
    $("#situp_tablink").removeClass("active");
    $("#run_tablink").addClass("active");
    $("#run_easy_tablink").removeClass("active");
    $("#run_med_tablink").removeClass("active");
    $("#run_hard_tablink").removeClass("active");

    $("#pushup").hide();
    $("#situp").hide();
    $("#run").show();

    $("#run_easy_rec").hide();
    $("#run_med_rec").hide();
    $("#run_hard_rec").hide();

    $("#run_easy_1").hide();
    $("#run_easy_2").hide();
    $("#run_med_1").hide();
    $("#run_med_2").hide();
    $("#run_hard_1").hide();
    $("#run_hard_2").hide();

    $("#run_easy_tablink").click(function () {
      $("#run_easy_tablink").addClass("active");
      $("#run_med_tablink").removeClass("active");
      $("#run_hard_tablink").removeClass("active");
      $("#run_easy_1_btn").removeClass("active");
      $("#run_easy_2_btn").removeClass("active");

      $("#run_easy_rec").show();
      $("#run_med_rec").hide();
      $("#run_hard_rec").hide();
      $("#run_easy_1").hide();
      $("#run_easy_2").hide();
    });

    $("#run_easy_1_btn").click(function () {
      $("#run_easy_1_btn").addClass("active");
      $("#run_easy_2_btn").removeClass("active");
      $("#run_easy_1").show();
      $("#run_easy_2").hide();
    });

    $("#run_easy_2_btn").click(function () {
      $("#run_easy_2_btn").addClass("active");
      $("#run_easy_1_btn").removeClass("active");
      $("#run_easy_2").show();
      $("#run_easy_1").hide();
    });

    $("#run_med_tablink").click(function () {
      $("#run_easy_tablink").removeClass("active");
      $("#run_med_tablink").addClass("active");
      $("#run_hard_tablink").removeClass("active");
      $("#run_med_1_btn").removeClass("active");
      $("#run_med_2_btn").removeClass("active");

      $("#run_easy_rec").hide();
      $("#run_med_rec").show();
      $("#run_hard_rec").hide();
      $("#run_med_1").hide();
      $("#run_med_2").hide();
    });

    $("#run_med_1_btn").click(function () {
      $("#run_med_1_btn").addClass("active");
      $("#run_med_2_btn").removeClass("active");
      $("#run_med_1").show();
      $("#run_med_2").hide();
    });

    $("#run_med_2_btn").click(function () {
      $("#run_med_2_btn").addClass("active");
      $("#run_med_1_btn").removeClass("active");
      $("#run_med_2").show();
      $("#run_med_1").hide();
    });

    $("#run_hard_tablink").click(function () {
      $("#run_easy_tablink").removeClass("active");
      $("#run_med_tablink").removeClass("active");
      $("#run_hard_tablink").addClass("active");
      $("#run_hard_1_btn").removeClass("active");
      $("#run_hard_2_btn").removeClass("active");

      $("#run_easy_rec").hide();
      $("#run_med_rec").hide();
      $("#run_hard_rec").show();
      $("#run_hard_1").hide();
      $("#run_hard_2").hide();
    });

    $("#run_hard_1_btn").click(function () {
      $("#run_hard_1_btn").addClass("active");
      $("#run_hard_2_btn").removeClass("active");
      $("#run_hard_1").show();
      $("#run_hard_2").hide();
    });

    $("#run_hard_2_btn").click(function () {
      $("#run_hard_2_btn").addClass("active");
      $("#run_hard_1_btn").removeClass("active");
      $("#run_hard_2").show();
      $("#run_hard_1").hide();
    });
  });
});

/**
 * Main document
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
  if (user_id != null) {
    // Updates the rewards page with user credits details.
    let creditTemp = 0; //This is to prevent the function from incrementing from the previous count.
    const creditsSnapshot = getDocs(collection(db, "users", user_id, "credits"))
      .then((creditsSnapshot) => {
        creditsSnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          creditTemp += parseInt(doc.data()["amount"]);
          total_credits = creditTemp;
        });
      })
      .then(() => {
        $("#rewards_credits").empty().prepend(total_credits); // update current credit amount
      });
  }
  $(".home").hide();
  $(".cal").hide();
  $(".rewards").show();
  $(".profile").hide();
});

$("#profile_link").click(function () {
  updateProfile();
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
      //updateProfile();
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
