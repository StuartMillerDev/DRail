var train={
  name:"Default_Train_Name",
  destination:"Default_City",
  frequency:"1",
  arrival:"00:00"
}

//create a new train with 4 inputs
function addTrain(name, destination, frequency, arrival){
  train.name=name;
  train.destination=destination;
  train.frequency=frequency;
  train.arrival=arrival;
  return train;
}

//search for a train with the name and time of arrival and remove it
function removeTrain(name, arrival){

}
