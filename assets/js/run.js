// Initialize Firebase
var config = {
  apiKey: "AIzaSyC3sUEXGdUj_8K74nQfZKY1DqTxXOJALVM",
  authDomain: "d-rail-f74d2.firebaseapp.com",
  databaseURL: "https://d-rail-f74d2.firebaseio.com",
  projectId: "d-rail-f74d2",
  storageBucket: "d-rail-f74d2.appspot.com",
  messagingSenderId: "1029714499178"
};
firebase.initializeApp(config);
var database = firebase.database();
var train={
  name:"Default_Train_Name",
  destination:"Default_City",
  frequency:"15",
  first_train:"00:00"
}

// update page based on items in the database
$("#submit").click(function(){
  event.preventDefault();

  //collect user input from fields
  var trainName=$("#1").val().trim();
  var firstTrain=$("#3").val().trim();
  var destination=$("#2").val().trim();
  var frequency=$("#4").val().trim();

//check if already in the database, if not, add to the database

  train.name=trainName;
  train.destination=destination;
  train.frequency=frequency;
  train.first_train=firstTrain;

  //add a new emtry to the database
  database.ref().push(train);

});

//collect change from the database and add a row to the table
database.ref().on("child_added", function(childSnapshot) {
  var name=childSnapshot.val().name;
  var destination=childSnapshot.val().destination;
  var firstTrain=childSnapshot.val().first_train
  var frequency=childSnapshot.val().frequency

  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(firstTrain),
    //calculate time left
    $("<td>").text(function(){
      var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
      console.log("firstTrainConverted: ",firstTrainConverted);
      var currentTime = moment();
      // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
      var tRemainder = diffTime % frequency;
      console.log("tRemainder: ",tRemainder);
      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      // console.log("first_train TIME: " + moment(nextTrain).format("hh:mm"));
      return tMinutesTillTrain;
    })
  );

  $("#trainTable").append(newRow);

});
