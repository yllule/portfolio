class Carnivore {
    constructor() {

        //variables to check if the pet has been fed or watered or treated, which are the conditions needed for it to evolve
        this.fed = false;
        this.watered = false;
        this.disciplined = false;
        this.played = false;
        //if these are true, the feed, drink, info, medecine and talk "animation" will show
        this.showImageFeed = false;
        this.showImageWater = false;
        this.showImageMedecine = false;
        this.showImagePlay = false;
        this.showImageTalk = false;
        this.showTextFeed = false;
        this.showTextWater = false;
        this.showTextPlay = false;
        this.showTextTalk = false;
        //these variables will turn off when action animations play
        this.displayPlayer = true;
        this.displayPet = true;
        //if this is true, the screen will appear as off
        this.showOffScreen = false;

    }

    draw() {

        //adding bg music
        if (!bgm.isPlaying()) {
            bgm.setVolume(0.05);
            bgm.loop();
        }

        //display of the options on the screen
        this.displayFeed();
        this.displayDrink();
        this.displayWash();
        this.displayPlay();
        this.displayMedecine();
        this.displayTalk();
        this.displayInfo();
        this.displayOff();

        //display player, only displays if display player is true
        if(this.displayPlayer) {
            push();
            image(player2Img, player.x, player.y);
            pop();
        }

        //display pet, only displays if display pet is true
        if(this.displayPet) {
            push();
            image(carnivoreImg, pet.x, pet.y-58);
            pop();
        }

        //methods for what happens when the user takes certain actions
        this.actionFeed();
        this.actionWater();
        this.actionPlay();
        this.actionMedecine();
        this.actionTalk();
        this.actionInfoFeed();
        this.actionInfoWater();
        this.actionInfoPlay();
        this.actionInfoTalk();
        this.actionOff();


        this.checkEvolution();
        
    }

    //display of the options, the position values are funky here cause i'm trying to perfectly place the elements where needed
    displayFeed() {
        //when this option is targetted, it changes blending mode to indicate that that one is currently targetted
            if (currentIndex === 0) {
                push();
                blendMode(HARD_LIGHT);
                image(feedImg, toy.x-129, toy.y-117);
                pop();
            }
        //otherwise the option looks normal
            else {
                push();
                image(feedImg, toy.x-129, toy.y-117);
                pop();
            }
        }
    
    //same thing as display feed but for the other options
        displayDrink() {
        if (currentIndex === 1) {
            push();
            blendMode(HARD_LIGHT);
            image(drinkImg, toy.x-57, toy.y-118);
            pop();
        }
        else {
            push();
            image(drinkImg, toy.x-57, toy.y-118);
            pop();
        }
    }
    
        displayWash() {
        if (currentIndex === 2) {
            push();
            blendMode(REMOVE);
            image(washImg, toy.x+5, toy.y-113);
            pop();
        }
        else {
            push();
            blendMode(SOFT_LIGHT);
            image(washImg, toy.x+5, toy.y-113);
            pop();
        }
    }
    
        displayPlay() {
        if (currentIndex === 3) {
            push();
            blendMode(HARD_LIGHT);
            image(playImg, toy.x+85, toy.y-117);
            pop();
        }
        else {
            push();
            image(playImg, toy.x+85, toy.y-117);
            pop();
        }
    }
    
        displayMedecine() {
        if (currentIndex === 4) {
            push();
            blendMode(HARD_LIGHT);
            image(medecineImg, toy.x-133, toy.y+46);
            pop();
        }
        else {
            push();
            image(medecineImg, toy.x-133, toy.y+46);
            pop();
        }
    }
    
        displayTalk() {
        if (currentIndex === 5) {
            push();
            blendMode(HARD_LIGHT);
            image(talkImg, toy.x-60, toy.y+43);
            pop();
        }
        else {
            push();
            image(talkImg, toy.x-60, toy.y+43);
            pop();
        }
    }
    
        displayInfo() {
        if (currentIndex === 6) {
            push();
            blendMode(HARD_LIGHT);
            image(infoImg, toy.x+15, toy.y+44);
            pop();
        }
        else {
            push();
            image(infoImg, toy.x+15, toy.y+44);
            pop();
        }
    }
    
        displayOff() {
        if (currentIndex === 7) {
            push();
            blendMode(HARD_LIGHT);
            image(offImg, toy.x+85, toy.y+46);
            pop();
        }
        else {
            push();
            image(offImg, toy.x+85, toy.y+46);
            pop();
        }
    }

    actionFeed() {
    //start time variable for the feed animation
    let feedInterval;

    //display the feed animation for one second, makes the player asset not show
    if (this.showImageFeed) {
        image(playerFeed2Img, player.x, player.y);
        push();
        imageMode(CENTER);
        image(carnivoreFeedImg, pet.x+25, pet.y+17); //strange values here cause i'm trying to perfectly place the asset
        pop();
        this.displayPlayer = false;
        this.displayPet = false;

        //check if one second has passed since the feed frame was shown
        if (!feedInterval) {
            feedInterval = setInterval(() => {
                clearInterval(feedInterval);
                this.showImageFeed = false;
                this.displayPlayer = true;
                this.displayPet = true;
            }, 1000);
        }
    }
}

actionWater() {
    //start time interval for the water animation
    let waterInterval;

    //display the water animation, makes the player asset not show
    if (this.showImageWater) {
        image(playerWaterImg, player.x, player.y);
        this.displayPlayer = false;

        //check if one second has passed since the water frame was shown
        if (!waterInterval) {
            waterInterval = setInterval(() => {
                clearInterval(waterInterval);
                this.showImageWater = false;
                this.displayPlayer = true;
            }, 1000);
        }
    }
}

actionTalk() {
    //start time variable for the talk animation
    let talkInterval;

    //display the talk animation for one second
    if (this.showImageTalk) {
        image(talkBubble2Img, pet.x+65, pet.y-55);
        image(carnivoreImg, pet.x, pet.y-58);
        //i'm putting displaypet as false even though i'm adding the normal carnivore sprite to this animation, just so that the pet only evolves once the animation is done (petdisplay = true)
        this.displayPet = false;

        //check if one second has passed since the talk frame was shown
        if (!talkInterval) {
            talkInterval = setInterval(() => {
                clearInterval(talkInterval);
                this.showImageTalk = false;
                this.displayPet = true;
            }, 1000);
        }
    }
}

actionPlay() {
    //start time variable for the play animation
    let playInterval;

    //display the medecine animation for one second, makes the player asset not show
    if (this.showImagePlay) {
        image(carnivoreImg, pet.x, pet.y-58)
        image(ballImg, pet.x-25, pet.y-40);
        //i'm putting displaypet as false even though i'm adding the normal carnivore sprite to this animation, just so that the pet only evolves once the animation is done (petdisplay = true)
        this.displayPet = false;

        //check if one second has passed since the medecine frame was shown
        if (!playInterval) {
            playInterval = setInterval(() => {
                clearInterval(playInterval);
                this.showImagePlay = false;
                this.displayPet = true;
            }, 4000);
        }
    }

}

actionMedecine() {
    //start time variable for the medecine animation
    let medecineInterval;

    //display the medecine animation for one second, makes the player asset not show
    if (this.showImageMedecine) {
        image(playerMedecineImg, player.x, player.y);
        this.displayPlayer = false;

        //check if one second has passed since the medecine frame was shown
        if (!medecineInterval) {
            medecineInterval = setInterval(() => {
                clearInterval(medecineInterval);
                this.showImageMedecine = false;
                this.displayPlayer = true;
            }, 1000);
        }
    }
}

actionInfoFeed() {
    //same thing as above but with showing text when you choose the info button and text displays for 2 secs
    let feedTextInterval;

    if(this.showTextFeed) {
        push();
        textSize(14);
        textAlign(CENTER);
        text('My pet looks hungry...', width/2, height/2-15);
        pop();
        this.displayPlayer = false;
        this.displayPet = false;

        if (!feedTextInterval) {
            feedTextInterval = setInterval(() => {
                clearInterval(feedTextInterval);
                this.showTextFeed = false;
                this.displayPet = true;
                this.displayPlayer = true;
            }, 2000);
        }
    }
}

actionInfoWater() {
    //same thing as above method for water text for info button
    let waterTextInterval;

    if(this.showTextWater) {
        push();
        textSize(14);
        textAlign(CENTER);
        text('Maybe my pet could use some water...', width/2, height/2-15);
        pop();
        this.displayPlayer = false;
        this.displayPet = false;

        if(!waterTextInterval) {
            waterTextInterval = setInterval(() => {
                clearInterval(waterTextInterval);
                this.showTextWater = false;
                this.displayPet = true;
                this.displayPlayer = true;
            }, 2000);
        }
    }
}

actionInfoPlay() {
    //same thing as above method for play text for info button
    let playTextInterval;

    if(this.showTextPlay) {
        push();
        textSize(14);
        textAlign(CENTER);
        text('My pet looks bored...', width/2, height/2-15);
        pop();
        this.displayPlayer = false;
        this.displayPet = false;

        if(!playTextInterval) {
            playTextInterval = setInterval(() => {
                clearInterval(playTextInterval);
                this.showTextPlay = false;
                this.displayPet = true;
                this.displayPlayer = true;
            }, 2000);
        }
    }
}

actionInfoTalk() {
    //same thing as above method for talk text for info button
    let talkTextInterval;

    if(this.showTextTalk) {
        push();
        textSize(14);
        textAlign(CENTER);
        text(`That was fun!`, width/2, height/2-20)
        text(`I should praise my pet for being good.`, width/2, height/2-5);
        pop();
        this.displayPlayer = false;
        this.displayPet = false;

        if(!talkTextInterval) {
            talkTextInterval = setInterval(() => {
                clearInterval(talkTextInterval);
                this.showTextTalk = false;
                this.displayPet = true;
                this.displayPlayer = true;
            }, 2000);
        }
    }
}

actionOff() {
    //screen turns off if player selects off button (off screen asset goes over everything)
        if(this.showOffScreen) {
            //bgm stops when you turn the toy off
            bgm.stop();
            push();
            imageMode(CENTER);
            image(screenOffImg, toy.x, toy.y);
            pop();
        }
}

mousePressed() {

        if(mouseInsideCenterButton()) {
            //select button for on screen options
            buttonCenter.size = 50;

                if (currentIndex === 0) {
                    this.showImageFeed = true;
                    this.fed = true;
                }
                else if (currentIndex === 1) {
                    this.showImageWater = true;
                    this.watered = true;
                }

                else if(currentIndex === 3) {
                    this.showImagePlay = true;
                    this.played = true;
                }
                else if(currentIndex === 4) {
                    this.showImageMedecine = true;
                }

                else if(currentIndex === 5) {
                    this.showImageTalk = true;
                    this.disciplined = true;
                }

                //the info action shows what the pet needs
                else if (currentIndex === 6) {
                    if (!this.fed) {
                        this.showTextFeed = true;
                    }
                    //to prevent both texts from appearing at the same time, the water text shows up only if the pet has been fed, so the feed text is first to show up
                    if (!this.watered && this.fed) {
                        this.showTextWater = true;
                    }
                    if (this.watered && this.fed && !this.played) {
                        this.showTextPlay = true;
                    }
                    if (this.watered && this.fed && this.played) {
                        this.showTextTalk = true;
                    }
                }
                //turn the game off if you press the off option (makes the off screen appear in front of everything)
                else if (currentIndex === 7) {
                    this.showOffScreen = !this.showOffScreen; // Toggle the state
                }
            } 
        //turn the game back on if you press the center button
        else if (mouseInsideCenterButton() && this.showOffScreen) {
            this.showOffScreen = false;
        }
}

checkEvolution() {

        //the pet needs to be fed, watered, played with and discipline before evolving
        if(this.fed && this.watered && this.played && this.disciplined && this.displayPlayer && this.displayPet) {
            //audio for pet evolution
                monsterEvolveSFX.setVolume(0.05);
                monsterEvolveSFX.play();

            //change state to carnivore
            currentState = new Monster;
        }
    }
}