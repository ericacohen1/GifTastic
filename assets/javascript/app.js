// create array to store buttons that will be on the page initially
var topics = ["Chocolate", "Cookies", "Fruit", "Chicken", "Salad"]

// make buttons from array appear on page
for (i = 0; i < topics.length; i++) {
    makeUserSearchButtons(topics[i]);
}

// get api key 
var apiKey = "DzZU75llEsl2wTZcrKIoC5GcAi2fcKcN";
var searches = [];

// git giphy results based on text from userInput
function displayFoodInfo(userInput) {


    var food = $(this).attr("data-giphy") || userInput;
    console.log(food);
    $("#content").empty();

    //making a variable that will later allow a user to input any food and use the API to find it
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + food + "&limit=10&offset=0&rating=G&lang=en";
    // Creating an AJAX call for the specific food button being clicked
    // This call is communicating to my api key which is stored in a variable above
    $.ajax({
        url: queryURL,
        method: "GET"
    //once ajax function gets info, it will begin everything below
    }).done(function (response) {
        console.log(response);
        var data = response.data;
        // loop through all images 
        for (var i = 0; i < data.length; i++) {
            // display a list of gifs
            var newImg = $("<img>");
            newImg.attr("src", data[i].images.downsized.url);
            // append all images to the content ID that we created
            $("#content").append(newImg);

            //create a paragraphy element in html
            var p = $("<p>");
            // get data rating and make it text
            p.text(data[i].rating);
            // add data rating to content div
            $("#content").append("Rating: " + data[i].rating);
            
            // got images to start static
            // need to make the image animate and stop on clicks
            newImg.attr("src", data[i].images.original_still.url);
            newImg.attr("data-state", "still");
            newImg.attr("data-still", data[i].images.original_still.url);
            newImg.attr("data-animate", data[i].images.original.url);
            var state = $(this).attr("data-state");
            
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
        }

        $("#user-input").val("");
    });
}


// make new buttons when the user enters a new food
function makeUserSearchButtons(input) {
    var newBtn = $("<button>");
    newBtn.addClass("giphy-btn");
    newBtn.text(input);
    newBtn.attr("data-giphy", input);
    $('.button-container').append(newBtn);
}
// when the user clicks the submit button
$("#submit").on("click", function (e) {
    e.preventDefault();
    // take the value from the user-input field
    var userInput = $("#user-input").val();
    makeUserSearchButtons(userInput);
    // displayFoodInfo(userInput);
});

// when the user dynamically generated giphy button
$(document).on("click", ".giphy-btn", displayFoodInfo);