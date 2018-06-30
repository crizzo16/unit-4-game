// Characters
var characters = [
    {
        name: "Obi-Wan Kenobi",
        imgName: "obiWanKenobi",
        hitPointsMax: 120,
        hitPoints: 120,
        attackPowerMin: 5,
        attackPower: 5,
        counterAttackPower: 15,
        type: "select"
    },
    {
        name: "Luke Skywalker",
        imgName: "lukeSkywalker",
        hitPointsMax: 100,
        hitPoints: 100,
        attackPowerMin: 15,
        attackPower: 15,
        counterAttackPower: 5,
        type: "select"
    },
    {
        name: "Darth Sidious",
        imgName: "darthSidious",
        hitPointsMax: 150,
        hitPoints: 150,
        attackPowerMin: 5,
        attackPower: 5,
        counterAttackPower: 15,
        type: "select"
    },
    {
        name: "Boba Fett",
        imgName: "bobaFett",
        hitPointsMax: 180,
        hitPoints: 180,
        attackPowerMin: 15,
        attackPower: 15,
        counterAttackPower: 5,
        type: "select"
    },
    {
        name: "Han Solo",
        imgName: "hanSolo",
        hitPointsMax: 150,
        hitPoints: 150,
        attackPowerMin: 5,
        attackPower: 5,
        counterAttackPower: 15,
        type: "select"
    },
    {
        name: "Leia Organa",
        imgName: "leiaOrgana",
        hitPointsMax: 150,
        hitPoints: 150,
        attackPowerMin: 15,
        attackPower: 15,
        counterAttackPower: 15,
        type: "select"
    },
    {
        name: "Stormtrooper",
        imgName: "stormtrooper",
        hitPointsMax: 50,
        hitPoints: 50,
        attackPowerMin: 4,
        attackPower: 4,
        counterAttackPower: 2,
        type: "select"
    }
];

$(document).ready(function () {
    var canAttack = false;
    var canChoosePlayer = true;
    var haveEnemy = false;
    var isDead = false;

    var round = 1;
    console.log("round: " + round);

    fillCharacterSelection();

    var charBoxFunc = function () {
        var charSelect = returnCharacter(this.getAttribute("id"), "id");
        
        //If type is select
        if (charSelect.type === "select") {
            $(".user-instructions").html("<p>Choose someone to fight!</p>");

            //Loop through all characters 
            for (var i = 0; i < characters.length; i++) {
                //If the selected character
                if (this.getAttribute("id") === characters[i].imgName && canChoosePlayer) {
                    //Switch class to player
                    $("#" + characters[i].imgName).removeClass("select-character");
                    $("#" + characters[i].imgName).addClass("player-character");
                    characters[i].type = "player";

                    //move it to the player zone
                    $("#" + characters[i].imgName).detach().appendTo(".player-character-zone");
                }
                //If any other character
                else if (canChoosePlayer) {
                    //switch class to to defender
                    $("#" + characters[i].imgName).removeClass("select-character");
                    $("#" + characters[i].imgName).addClass("defender-character");
                    characters[i].type = "defender";
                }
            }
            canChoosePlayer = false;
        }

        //If type is defender
        if (charSelect.type === "defender") {
            if (!haveEnemy && !isDead) {
                $(".user-instructions").html("<p>Attack your chosen enemy!</p>");

                var idName = this.getAttribute("id");
                var charObj = returnCharacter(idName, "id");

                //Switch class to enemy
                $("#" + idName).removeClass("defender-character");
                $("#" + idName).addClass("enemy-character");
                charObj.type = "enemy";

                //Move it to the enemy zone
                $("#" + idName).detach().appendTo(".enemy-character-zone");

                
            //We now have an enemy
            haveEnemy = true;
            canAttack = true;
            }
        }
    };

    attackBtxFunc = function () {
        //Only attack if both player and enemy have been selected
        if (canAttack && haveEnemy) {
            var enemy = findCharacter("enemy");
            var player = findCharacter("player");

            //Change enemy's HP & update screen
            enemy.hitPoints -= player.attackPower;
            $(".enemy-character").find(".character-HP").text("HP: " + enemy.hitPoints);
            //update the screen

            //Change player's HP
            player.hitPoints -= enemy.counterAttackPower;
            //update the screen
            $(".player-character").find(".character-HP").text("HP: "
                + player.hitPoints);

            

            //Only add basic-box class if there are contents
            if (!($(".fight-outcome").hasClass(".basic-box"))) {
                $(".fight-outcome").addClass("basic-box");
            }
            $(".fight-outcome").html("<p>You attacked " + enemy.name + " for " + player.attackPower + " damage.</p><p>" + enemy.name + " attacked you for " + enemy.counterAttackPower + " damage.</p>");

            //Check to see if enemy's HP dropped below zero
            if (enemy.hitPoints <= 0) {
                //remove the enemy
                $(".enemy-character").remove();
                //we no longer have an enemy to fight
                haveEnemy = false; //we don't have an enemy
                canAttack = false; //we can't attack what isn't there

                $(".user-instructions").html("<p>You won! Choose another enemy!</p>");
            }

            //Check to see if the player's HP dropped below zero
            if (player.hitPoints <= 0) {
                //Don't let player attack again
                canAttack = false;
                console.log("SO DEAD");
                $(".player-character").find(".character-image").addClass("death");
                isDead = true;
                //Let them know they lost
                $(".user-instructions").html("<p>You died! Reset to start a new game!</p>");
            }

            //Double player's AP only after we've displayed it on the screen
            player.attackPower *= 2;
        }
    };

    /**
     * When you select a character
     * Depends on the designated type for character
     */
    $(".character-box").on("click", charBoxFunc);

    //Attack button
    $(".attack-btn").on("click", attackBtxFunc);

    /**
     * Fills the character selection area
     */
    function fillCharacterSelection() {
        if (!($(".user-instructions").hasClass(".basic-box"))) {   
            $(".user-instructions").empty();
            $(".user-instructions").addClass("basic-box");
            $(".user-instructions").html("<p>Choose a character to play!</p>");
        }
        for (var i = 0; i < characters.length; i++) {
            //Create character div
            var character = $("<div>");
            character.addClass("character-box select-character");
            character.attr("id", characters[i].imgName);

            //Add image
            var imgName = "<img class='character-image' id='" + characters[i].imgName + "Img' src='assets/images/" + characters[i].imgName + ".jpg'/>";
            character.append(imgName);


            //Add Character Name
            var charName = $("<h3>");
            charName.addClass("character-name");
            charName.text(characters[i].name);
            character.append(charName);

            //Add Hit Points
            var charHP = $("<h4>");
            charHP.addClass("character-HP");
            charHP.text("HP: " + characters[i].hitPoints)
            character.append(charHP);

            //Add it to the screen
            $(".select-character-list").append(character);
        }
    };

    //Reset button
    $(".reset-btn").on("click", function () {

        //Debugging
        round++;
        console.log("***************");
        console.log("round: " + round);

        //Reset HP and AP
        for (var i = 0; i < characters.length; i++) {
            characters[i].hitPoints = characters[i].hitPointsMax;
            characters[i].attackPower = characters[i].attackPowerMin;
            characters[i].type = "select";
        }

        //clear out areas
        $(".player-character-zone").empty();
        $(".enemy-character-zone").empty();
        $(".select-character-list").empty();
        $(".fight-outcome").empty();
        $(".fight-outcome").removeClass("basic-box");

        //Fill with Characters again
        fillCharacterSelection();

        //Reset booleans
        canAttack = false;
        canChoosePlayer = true;
        haveEnemy = false;
        isDead = false;

        $(".character-box").on("click", charBoxFunc);
        $(".attack-btn").on("click", attackBtxFunc);
    });





    /**
     * Using the class or id name, find the character object associated with it
     * @param {string} temp the name of the class or id
     * @param {string} type either class or id
     * @return the character object
     */
    function returnCharacter(temp, type) {
        for (var i = 0; i < characters.length; i++) {
            if (type === "class") {
                if ($("." + temp).getAttribute("id") === characters[i].imgName) {
                    return characters[i];
                }
            } else if (type === "id") {
                if (temp === characters[i].imgName) {
                    return characters[i];
                }
            }
        }
    };

    /**
     * Finds the charcter object based on the type
     * @param {string} type select, player, enemy, or defender
     */
    function findCharacter(type) {
        for (var i = 0; i < characters.length; i++) {
            if (characters[i].type === type) {
                return characters[i];
            }
        }
    };

});