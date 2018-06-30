$(document).ready(function () {
    // Initialize variables
    var red, yellow, green, blue, compScore, userScore, notDone;
    var wins = 0;
    var losses = 0;

    $("#losses").html(losses);
    $("#wins").html(wins);


    // Sets up for the first game
    reset();


    /**
     * Resets the values of the crystals and the scores
     */
    function reset() {
        notDone = true;

        red = Math.floor(Math.random() * 12) + 1;
        yellow = Math.floor(Math.random() * 12) + 1;
        green = Math.floor(Math.random() * 12) + 1;
        blue = Math.floor(Math.random() * 12) + 1;

        compScore = Math.floor(Math.random() * 102) + 19;
        userScore = 0;

        $("#compareScore").html(compScore);
        $("#userScore").html(userScore);

        $("#wins").css({"color": "white"});
        $("#winWord").css({"color": "white"});
        $("#losses").css({"color": "white"});
        $("#loseWord").css({"color": "white"});
    };



    function doneCheck() {
        // If the user matches the score
        if (userScore === compScore) {
            notDone = false;
            wins++;
            $("#wins").html(wins);
            $("#wins").css({"color": "red"});
            $("#winWord").css({"color": "red"});
        }
        // If the user goes over the score
        else if (userScore > compScore) {
            notDone = false;
            losses++;
            $("#losses").html(losses);
            $("#losses").css({"color": "red"});
            $("#loseWord").css({"color": "red"});
        }
    };



    // Crystal Functions
    $("#red-crystal").click(function () {
        //If starting a new game
        if (!notDone) {
            reset();
        }

        // Regular gameplay

        // Add the amount to the main score
        userScore += red;
        $("#userScore").html(userScore);

        // Check to see if win or bust
        doneCheck();

    });

    $("#yellow-crystal").click(function () {
        //If starting a new game
        if (!notDone) {
            reset();
        }

        // Regular gameplay

        // Add the amount to the main score
        userScore += yellow;
        $("#userScore").html(userScore);

        // Check to see if win or bust
        doneCheck();


    });

    $("#green-crystal").click(function () {
        //If starting a new game
        if (!notDone) {
            reset();
        }

        // Regular gameplay

        // Add the amount to the main score
        userScore += green;
        $("#userScore").html(userScore);

        // Check to see if win or bust
        doneCheck();


    });

    $("#blue-crystal").click(function () {
        //If starting a new game
        if (!notDone) {
            reset();
        }

        // Regular gameplay

        // Add the amount to the main score
        userScore += blue;
        $("#userScore").html(userScore);

        // Check to see if win or bust
        doneCheck();


    });
});