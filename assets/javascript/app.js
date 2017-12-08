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

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + food + "&limit=10&offset=0&rating=G&lang=en";
    // Creating an AJAX call for the specific food button being clicked
    // This call is communicating to my api key which is stored in a variable above
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
            // display a list of gifs
            var newImg = $("<img>");
            newImg.attr("src", data[i].images.downsized.url);
            $("#content").append(newImg);

            var p = $("<p>");
            p.text(data[i].rating);
            $("#content").append("Rating: " + data[i].rating);
            
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







// onclick to animate gifs 
// onclick again to stop animation