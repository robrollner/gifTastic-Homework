$(document).ready(function() {
//array of characters
    var characters = ["Bart Simpson", "Deadpool", "Dr Nick", "Doctor Who", "Philip J Fry", "Bender B Rodriguez", "Moe Szyslak", "Macho Man", "Dory", "Dug"];
    console.log(characters);

//renders character buttons
    function renderButtons() {
        $('#buttons-view').empty();

        for (var i = 0; i < characters.length; i++) {

            var newButton = $("<button class='btn btn-primary btn-lg active'>");
            newButton.attr("data-person", characters[i]);
            newButton.text(characters[i]);

            $("#buttons-view").append(newButton);
        }
    }
    renderButtons();

    // pushes array items to DOM
    $("#add-character").on("click", function(event) {
        event.preventDefault();
        var char = $("#character-input").val().trim();
        characters.push(char);
        renderButtons();
    });





    // changed "doucment" listener to more specific #buttons-view
    $("#buttons-view").on("click", ".btn-primary", function() {

        var person = $(this).attr("data-person");
        //API calls retunrs 15 repsonses only 1 loads...
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=15";
        console.log(queryURL);
	//calls giphy API
        $.get(queryURL).done(function(response) {
            var results = response.data;
            console.log(results);
        //assigned variables to still image and gif
            var stillImage = results[0].images.original_still.url
            var gifImage = results[0].images.original.url
        //loads rating object to html with click on character button
            $('.rating').html('Rated: ' + results[0].rating);
        //loads still image with click of character button
            $('.image').html('<img class="img-thumbnail" src="' + stillImage + ' "data-state="still"' + '>');
            $('.image').html('<img class="img-thumbnail" src="' + gifImage + ' "data-state="still"' + '>');

        });
        //supposed to add clicking event to image that changes src of still image to gif
        $(".img-thumbnail").on({
            'click': function() {
                var src = ($(this).attr('src') === stillImage) ?
                    stillImage :
                    gifImage;
                $(this).attr('src', src);
                console.log(img-thumbnail);

            }
        });

    });


});