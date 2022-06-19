var p = MindFusion.Scheduling;

// create a new instance of the calendar 
var calendar = new p.Calendar(document.getElementById("calendar"));

calendar.theme = "standard";

//visualize the calendar
calendar.render();