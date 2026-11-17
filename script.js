$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.rest-button').click(clickedRestButton);



  
})

var petMessageTimer;
var petIsHappy = true;
var petIsAlive = true;
var happySound = new Audio('sounds/happy.mp3');
var treatSound = new Audio('sounds/treat.mp3');

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = {name:"Billy", weight: 12, happiness: 1, sleepiness: 0};

function clickedTreatButton() {
  if (!petIsAlive || !petIsHappy || petNeedsRest()) {
  return;
}
  // Increase pet happiness
  pet_info.happiness += 1;
  // Increase pet weight
  pet_info.weight += 1;
  // Increase pet sleepiness
  pet_info.sleepiness += 1;
  checkAndUpdatePetInfoInHtml();
  //prevent overlapping sounds
  if (pet_info.happiness === 10) {
    messageToDisplay = "I'm so happy, you gotta hear this! Might be a good time to go exercise!";
    happySound.currentTime = 7;
    happySound.play();
  } else {
    treatSound.currentTime = 0;
    treatSound.play();
  }
  showPetMessage("That was delicious!");
}

function clickedPlayButton() {
  if (!petIsAlive || !petIsHappy || petNeedsRest()) {
  return;
}
  // Increase pet happiness
  pet_info.happiness += 1;
  // Decrease pet weight
  pet_info.weight -= 1;
  // Increase pet sleepiness
  pet_info.sleepiness += 1;
  checkAndUpdatePetInfoInHtml();
    if (pet_info.happiness === 10) {
    messageToDisplay = "I'm so happy, you gotta hear this! Might be a good time to go exercise!";
    happySound.currentTime = 7;
    happySound.play();
  }
  showPetMessage("That was fun, let's do it again!");
}

function clickedExerciseButton() {
  if (!petIsAlive || !petIsHappy || petNeedsRest()) {
  return;
}
  // Decrease pet happiness
  pet_info.happiness -= 1;
  // Decrease pet weight
  pet_info.weight -= 1;
  // Increase pet sleepiness
  pet_info.sleepiness += 1;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Whew, that was a good workout!");
}

function clickedRestButton() {
  if (!petIsAlive || !petIsHappy) {
  return;
}
  //Decrease pet happiness
  pet_info.sleepiness -= 1;
  checkAndUpdatePetInfoInHtml();
  showPetMessage("Nap time!");
}
//check if pet needs rest before allowing any other actions
function petNeedsRest() {
  if (pet_info.sleepiness >= 10) {
    showPetMessage("Billy is too sleepy. Please let him rest!");
    return true;
  }

  return false;
}

//Shows the pet's comments with fadeIn and fadeOut.
function showPetMessage(message) {
  clearTimeout(petMessageTimer);

  var messageElement = $('.pet-message');
  var messageToDisplay;

  if (!petIsHappy) {
    messageToDisplay = "Billy is angry with you. Take better care of it! (refresh page to try again)";
  } else if (!petIsAlive) {
    messageToDisplay = "Billy has died due to malnutrition. Give it more treats! (refresh page to try again)";
  } else if (pet_info.sleepiness >= 10) {
    messageToDisplay = "Billy is too sleepy. Please let him rest!";  
  } else if (pet_info.weight > 16) {
    messageToDisplay = "It's been a while since I've exercised...";
  } else if (pet_info.weight <= 2) {
    messageToDisplay = "I'm so hungry! Please feed me!";
  } else if (pet_info.happiness === 10) {
    messageToDisplay = "I'm so happy, you gotta hear this! Might be a good time to go exercise!";
    //Sound plays when condition is met
    happySound.currentTime = 7; // Set the start time to 7 seconds
    happySound.play();
  } else if (pet_info.happiness <= 2) {
    messageToDisplay = "I'm so sad! Please play with me!";
  } else{
    messageToDisplay = message;
  }


  messageElement.text(messageToDisplay).fadeIn(300);
  petMessageTimer = setTimeout(function() {
    messageElement.fadeOut(300);
  }, 1800);
}

function checkAndUpdatePetInfoInHtml() {
  checkIfPetHappy();
  checkIfPetDies();
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkIfPetHappy() {
  if (pet_info.happiness <= 0) {
    petIsHappy = false;

    document.querySelector(".pet-image").setAttribute("src", "images/shoebill-stork.jpg");
    document.querySelector(".pet-image").setAttribute("alt", "Billy is Angry with you.");
  }
}

function checkIfPetDies() {
  if (pet_info.weight <= 0) {
    petIsAlive = false;

    document.querySelector(".pet-image").setAttribute("src", "images/sleeping-stork.jpeg");
    document.querySelector(".pet-image").setAttribute("alt", "Billy is only sleeping.");
  }
}

function checkWeightAndHappinessBeforeUpdating() {
// Keep either stat from going below zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  if (pet_info.sleepiness < 0) {
    pet_info.sleepiness = 0;
  }
}
  
// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.sleepiness').text(pet_info.sleepiness);
}
