// Initialize Firebase
var config = {
  apiKey: "AIzaSyBuAAO57T88HrMlT4IDVOfDGU_dum38oSI",
  authDomain: "d-rail.firebaseapp.com",
  databaseURL: "https://d-rail.firebaseio.com",
  projectId: "d-rail",
  storageBucket: "d-rail.appspot.com",
  messagingSenderId: "365190421121"
};
firebase.initializeApp(config);
var database = firebase.database();
var train={
  name:"Default_Train_Name",
  destination:"Default_City",
  frequency:"15",
  arrival:"00:00"
}

// update page based on items in the database
$("#submit").click(function(){
  event.preventDefault();

  //collect user input from fields
  var trainName=$("#1").val().trim();
  var firstTrain=moment($("#3").val().trim(), "HH:hh").format("X");
  var destination=$("#2").val().trim();
  var frequency=$("#4").val().trim();
  //check if already in the database

  

  train.name=trainName;
  train.destination=destination;
  train.frequency=frequency;
  train.arrival=firstTrain;

  //add a new emtry to the database
  database.ref().push(train);
});
