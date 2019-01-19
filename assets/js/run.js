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
//database reference
var database = firebase.database();
//Train object
var train={
  name:"Default_Train_Name",
  destination:"Default_City",
  frequency:"15",
  first_train:"00:00"
}

$("#delete").click(function(){
  console.log("Delete Row");

});
// update page based on items in the database
$("#submit").click(function(){
  event.preventDefault();

  //collect user input from fields
  var trainName=$("#1").val().trim();
  var firstTrain=$("#3").val().trim();
  var destination=$("#2").val().trim();
  var frequency=$("#4").val().trim();
  clearForm();
  train.name=trainName;
  train.destination=destination;
  train.frequency=frequency;
  train.first_train=firstTrain;
  database.ref().push(train);

  // resetTrain();
});

$(".delete").click(function(){
  console.log("REMOVE ROW");
});

$("#clear").click(function(){
  event.preventDefault();
  //delete all rows
  console.log("CLEAR ALL ROWS");
  $("tbody").html("");
  database.ref().set(null);
});

database.ref().on("child_removed",function(childSnapshot){

});

//collect change from the database and add a row to the table
database.ref().on("child_added", function(childSnapshot) {
event.preventDefault();
  //database train object
  var name=childSnapshot.val().name;
  var destination=childSnapshot.val().destination;
  var firstTrain=childSnapshot.val().first_train
  var frequency=childSnapshot.val().frequency

  //current key
  var key= childSnapshot.key;

  if(false){
    //remove item if already in the database
    // $("#notificationHere").append($("<h6 id='errorMessage'>ITEM ALREADY EXISTS</h6>"));
    // var windowTimeout = setTimeout(function(){
    //     $("#errorMessage").remove();
    //   }, 2000);
    //    database.ref(key).remove();
    //   console.log("Duplicate detected: ", train, key);
        // resetTrain();
  }
  else {
    //add item
    $("#notificationHere").append($("<h5 id='successMessage'>ITEM ADDED</h5>"));
    var windowTimeout = setTimeout(function(){
      $("#successMessage").remove();
    }, 2000);
    var td=$("<td>DELETE</td>");

    var newRow = $("<tr>").append(
      $("<td>").text(name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(firstTrain),
      //calculate time left
      $("<td>").text(function(){
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        // console.log("firstTrainConverted: ",firstTrainConverted);
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
        var tRemainder = diffTime % frequency;
        // console.log("tRemainder: ",tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        // console.log("first_train TIME: " + moment(nextTrain).format("hh:mm"));
        return tMinutesTillTrain;
      }),$("<td id="+key+" class="+"delete"+" onclick="+"$(this).parent().remove()>DELETE</td>")

    );
    // td.attr("data-key",key);
     // newRow.attr("data-name",key);
    $("#trainTable").append(newRow);
    // resetTrain();
  }


});

function clearForm(){
  $('#1').val('');
  $('#2').val('');
  $('#3').val('');
  $('#4').val('');
}
function resetTrain(){
  train={
    name:"Default_Train_Name",
    destination:"Default_City",
    frequency:"15",
    first_train:"00:00"
  };
}
