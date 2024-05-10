class Death {
    constructor() {

        //variables to check if the pet has been fed or watered or treated, which are the conditions needed for it to evolve
        this.fed = false;
        //if these are true, the feed, drink, info, medecine and talk "animation" will show
        this.showImageFeed = false;
        this.showImageWater = false;
        this.showImageWash = false;
        this.showImageMedecine = false;
        this.showImagePlay = false;
        this.showImageTalk = false;
        this.showTextFeed = false;
        //these variables will turn off when action animations play
        this.displayPlayer = true;
        this.displayPet = true;
        //if this is true, the screen will appear as off
        this.showOffScreen = false;

        this.counter = 0; //variable to count how many times actionFeed() has happened
        this.ripBozo = false; //variable that turns true at the end of the animation where the pet eats the player

        this.food = {
            x : toy.x-129,
            y: toy.y-65,
            vy: 3 //speed that the food will fall down from
        }

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
            image(deathImg, pet.x-10, pet.y-90);
            pop();
        }

        //methods for what happens when the user takes certain actions
        this.actionFeed();
        this.actionWater();
        this.actionWash();
        this.actionPlay();
        this.actionMedecine();
        this.actionTalk();
        this.actionInfoFeed();
        this.actionOff();

        this.eaten();   //'animation' of the player avatar getting eaten
        this.sentience(); //the final 'animation' that will play, after it's done, the next state begins
        
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
            blendMode(HARD_LIGHT);
            image(washImg, toy.x+5, toy.y-113);
            pop();
        }
        else {
            push();
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
    if (this.showImageFeed && this.counter < 4) {
        image(playerFeed2Img, player.x, player.y);
        push();
        imageMode(CENTER);
        image(deathFeedImg, pet.x+20, pet.y-23); //strange values here cause i'm trying to perfectly place the asset
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
    if (this.showImageWater && this.counter < 4) {
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

actionWash() {
        //start time interval for the wash animation
        let washInterval;

        //display the wash animation, makes the player asset not show
        if (this.showImageWash && this.counter < 4) {
            image(playerWashImg, player.x, player.y);
            this.displayPlayer = false;
    
            //check if one second has passed since the wash frame was shown
            if (!washInterval) {
                washInterval = setInterval(() => {
                    clearInterval(washInterval);
                    this.showImageWash = false;
                    this.displayPlayer = true;
                }, 1000);
            }
        }

}

actionTalk() {
    //start time variable for the talk animation
    let talkInterval;

    //display the talk animation for one second
    if (this.showImageTalk && this.counter < 4) {
        image(talkBubble3Img, pet.x+83, pet.y-55);

        //check if one second has passed since the talk frame was shown
        if (!talkInterval) {
            talkInterval = setInterval(() => {
                clearInterval(talkInterval);
                this.showImageTalk = false;
            }, 1000);
        }
    }
}

actionPlay() {
    //start time variable for the play animation
    let playInterval;

    //display the play animation for one second, makes the player asset not show
    if (this.showImagePlay && this.counter < 4) {
        image(ballImg, pet.x-25, pet.y-40);

        //check if one second has passed since the medecine frame was shown
        if (!playInterval) {
            playInterval = setInterval(() => {
                clearInterval(playInterval);
                this.showImagePlay = false;
            }, 4000);
        }
    }

}

actionMedecine() {
    //start time variable for the medecine animation
    let medecineInterval;

    //display the medecine animation for one second, makes the player asset not show
    if (this.showImageMedecine && this.counter < 4) {
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
        if(this.counter === 0) {
            textSize(14);
        }
        else if(this.counter === 1) {
            textSize(19);
        }
        else if(this.counter === 2) {
            textSize(24);
        }
        else if(this.counter === 3) {
            textSize(29);
        }
        textAlign(CENTER);
        text('My pet looks hungry!!', width/2, height/2-15);
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

actionOff() {
    //screen turns off if player selects off button (off screen asset goes over everything)
        if(this.showOffScreen && this.counter < 4) {
            //bgm stops when you turn the toy off
            bgm.stop();
            push();
            imageMode(CENTER);
            image(screenOffImg, toy.x, toy.y);
            pop();
        }
}

eaten() {
    if(this.deathAnim) {
        this.displayPet = false; //pet asset doesn't show bcz it gets replaced by animation
        this.displayPlayer = false; //normal player asset doesn't show bcz they get eaten
        //player getting eaten audio
        bgm.stop();

        // deathSFX.play();
        push();
        imageMode(CENTER);
        image(sentienceGif, pet.x-30, pet.y-30);
        pop();
        //display the crack only once the player gets eaten
        push();
        imageMode(CENTER);
        image(crackImg, toy.x, toy.y);
        pop();
        let animInterval;

        if(!animInterval && this.counter === 4) {
            animInterval = setInterval(() => {
                clearInterval(animInterval);
                this.ripBozo = true;
                this.deathAnim = false;
            }, 7000);
        }
    }
}

sentience() {
    //the final 'animation' that will play, after it's done, the crash state begins
    if (this.ripBozo) {
        bgm.stop();
        monsterEvolveSFX.setVolume(0.05);
        monsterEvolveSFX.play();
        image(foodImg, this.food.x, this.food.y - 20);
        push();
        imageMode(CENTER);
        image(deathFeed2Img, pet.x-90, pet.y-30);
        pop();

        //food movement (falls down)
        this.food.y = this.food.y + this.food.vy;

        //food resets position
        let reset = height / 2 - 10;
        if (this.food.y > reset) {
            this.food.y = toy.y - 65;
        }

        //display the crack
        push();
        imageMode(CENTER);
        image(crackImg, toy.x, toy.y);
        pop();

        let anim2Interval;

        //how long the monster will self feed before it switches to the next state
        if(!anim2Interval) {
            anim2Interval = setInterval(() => {
                clearInterval(anim2Interval);
                currentState = new Crash;
            }, 1000);
        }
    }
}

mousePressed() {

        if(mouseInsideCenterButton()) {
            //select button for on screen options
            buttonCenter.size = 50;

                if (currentIndex === 0) {
                    this.showImageFeed = true;
                    this.fed = true;
                    this.counter = this.counter+1; //keeps track of how many times the pet has been fed
                    if(this.counter === 4) {
                        deathSFX.setVolume(0.1);
                        deathSFX.play();
                        oscillator.start();
                        this.deathAnim = true; //this variable controls whether the player getting eaten animation will play (the eaten method)
                    }
                }
                else if (currentIndex === 1) {
                    this.showImageWater = true;
                }

                else if(currentIndex === 2) {
                    this.showImageWash = true;
                }

                else if(currentIndex === 3) {
                    this.showImagePlay = true;
                }

                else if(currentIndex === 4) {
                    this.showImageMedecine = true;
                }

                else if(currentIndex === 5) {
                    this.showImageTalk = true;
                }

                //the info action shows what the pet needs
                else if (currentIndex === 6) {
                    if (this.counter < 4) {
                        this.showTextFeed = true;
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
}