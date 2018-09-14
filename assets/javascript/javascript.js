$(document).ready(function () {
  var topics = ["Giraffe", "Horse","Koala","Corgi","Mosquito"] 
  function createButtons(){
    $("#buttonRow").empty();
    for(var i = 0; i<topics.length; i++){
      var creatingButtons = $("<button>");
      creatingButtons.attr("class", "btn animalButtons");
      creatingButtons.attr("data-name", topics[i]);
      creatingButtons.text(topics[i]);
      console.log(i);
      $("#buttonRow").append(creatingButtons);
    }
  }

  $(document).on("click", ".animalButtons", function () {
    console.log($(this).attr("data-name"))
    var work = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + work + "&api_key=udNeCR5X34QKOIJCFw7LIOXuxCsFvhj2&limit=10";
    $(".images").empty();
    $.ajax({
      url: queryURL,
      meathod: "GET"
    }).then(function (response) {
      var results = response.data;
      for (var i = 0; i < results.length-1; i++) {
        var urlAnimate = results[i].images.fixed_height.url;
        var urlStill = results[i].images.fixed_height_still.url;
        var rating = results[i].rating;
        var imgHolder = $("<div>");
        imgHolder.html(`<div><img style="height:200px;" src=${urlStill} data-still=${urlStill} data-animate=${urlAnimate} data-state="still" class="imageGif"><p>Rated ${rating}</p></div>`);
        var idHolder = "#image" + i;
        $(idHolder).append(imgHolder);
      }
    })
  });

  $(document).on("click", ".imageGif", function() {
    if ($(this).attr("data-state") === 'still') {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#addingButton").click(function(event){
    event.preventDefault();
    topics.push($("#animalname").val().trim());
    console.log(topics);
    createButtons();
    $("#animalname").val("");
  })

  createButtons();
});
