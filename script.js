var currentDay = $("#currentDay");
var allPlans = [];
//utilize jquery for .text to insert date element/format.
//currentDay.text(moment().format("MMMM Do YYYY, h:mm:ss a"));
//now the date and time is posted, NOT RUNNING YET.

//create a way for the clock(timestamp) to be live.
//create a function that can be refresh the time stamp every second.

var timeInterval; //just creating the var
function setTime() {
  currentDay.text(moment().format("MMMM Do YYYY, h:mm:ss a"));
}
//the function to put the time stamp is done now tell the timeInterval to rerun the function every second.
timeInterval = setInterval(setTime, 1000);
//now the timer is counting down
//console.log("Current Day");

//Because jquery is in play, use the following to show the current time on the calendar. Creating a past presetn future desing to the flow of the page.
//create a var that addresses class of "time-block" from the html.
var timeblocks = $(".time-block");
//console.log(timeblocks);

//using the ".each(){}" jquery allows us to loop constantly showing what time block is in the curent time.
timeblocks.each(function () {
  var specificTimeblock = $(this); //"this" refers to everything within {}. if it is not it refers to entire page.
  //create a variable that will isolate the specificTimeblock  id.
  var specificTimeblockId = specificTimeblock.attr("id");
  //create a variable that will show the current hour. (momentjs.com) but before that need to convert the id string that has been created in to a whole number.
  specificTimeblockId = parseInt(specificTimeblockId);
  var currentHour = moment().hour();
  console.log("THIS TIMEBLOCK IS", specificTimeblock);
  console.log("the current hour is", currentHour);
  //these console logs and the process up to this point is creating a loop where the page will ask itself, every second, what hour is it. Then compare it to the "id" to make sure the following can be rendered. past present future. Now we initiate the "IF STATEMENT"
  if (currentHour > specificTimeblockId) {
    specificTimeblock.addClass("past"); //remember, these classes id's etc have to match css/html
  } else if (currentHour === specificTimeblockId) {
    specificTimeblock.addClass("present");
  } else {
    specificTimeblock.addClass("future");
  }
});
//talk the above out. Deductive reasoning... if the specificTimeblockId is less than, equal too, or anything else.... then it is past present or future. last else... there is not other choice but future.
//at this point... take a moment go to the html.. add a text area and a save button to each div time
// now time to connect the saveBtn.
var saveBtn = $(".saveBtn");
//similiar to addEventListener('click') the want here is to use jquery and go straight to the function and use the "this" to find each saveBtn to do the same function. A glabal array is needed for the next step. Add it to the top seciton of the js.
saveBtn.on("click", function (event) {
  event.preventDefault(); //keeps the page from refreshing and kicking out what is manually added
  var button = $(this); //focusing on this function
  var buttonParent = button.parent();
  var textAreaSibling = button.siblings("textarea"); //where the user enters information
  var newPlan = {
    time: buttonParent.attr("id"),
    text: textAreaSibling.val(), //.val()grabs what the user input on the click of save
  };
  allPlans.push(newPlan);
  console.log(allPlans);
  localStorage.setItem("plans", JSON.stringify(allPlans)); // store the array as a string
});
//now, the information that was input by the user, it has to be recalled on the refresh.
function getAllExistingPlans() {
  if (localStorage.getItem("plans")) {
    allPlans = JSON.parse(localStorage.getItem("plans"));
  }
  if (allPlans.length > 0) {
    for (var i = 0; i < allPlans.length; i++) {
      console.log(allPlans[i]);
      var parent = $(`#${allPlans[i].time}`); //find each user input and the time it was done
      var textAreaChild = parent.children("textarea");
      textAreaChild.val(allPlans[i]); //this tells what the function needs to do with the user input that was found
      console.log(allPlans);
    }
  }
}
getAllExistingPlans(); //what why...
