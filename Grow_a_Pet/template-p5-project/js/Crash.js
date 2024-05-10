class Crash {
    constructor() {

        this.showEye = false; //the eye will display if this is true
        this.finalScare = false; //the pet will...get birthed...when this is true
        this.eyed = false; //variable to prevent the eye scare from happening everytime the button is pressed
        this.petSize = 0; //image of the pet birth starts at 0
        this.growthRate = 100; // how fast the pet size will grow
        this.bg = 255; //color of the bg

    }

    draw() {

        bgm.stop();
        oscillator.stop();

        //screen starts off closed
        push();
        imageMode(CENTER);
        image(screenOffImg, toy.x, toy.y);
        pop();

        //eye scare display
        this.eyeScare();

        //display of the cracks
        push();
        imageMode(CENTER);
        image(crackImg, toy.x, toy.y);
        image(crack2Img, toy.x, toy.y);
        pop();

        //final scare display
        this.birth();
        
    }

    eyeScare() {
        if(this.showEye && !this.eyed) {
            push();
            imageMode(CENTER);
            image(eyeImg, toy.x, toy.y);
            pop();

        let eyeInterval;

        //how long the eye will show before the final jumpscare
        if(!eyeInterval) {
            eyeInterval = setInterval(() => {
                clearInterval(eyeInterval);
                scareSFX.play();
                this.finalScare = true;
                this.eyed = true;
                this.showEye = false;
            }, 1500);
        }
        }
    }

    birth() {
        if(this.finalScare) {
            monsterEvolveSFX.play();
            background(this.bg);
            this.bg = this.bg-10;
            push();
            imageMode(CENTER);
            image(brokenToyImg, toy.x, toy.y);
            image(petBirthImg, toy.x, toy.y-175, this.petSize, this.petSize);
            this.petSize = this.petSize + this.growthRate;
            pop();

            let birthInterval;

            //how long the scare will last before it goes to the end state
            if(!birthInterval) {
                birthInterval = setInterval(() => {
                    clearInterval(birthInterval);
                    currentState = new Ending;
                }, 800);
            }
        }
    }

    mousePressed() {

        if(mouseInsideCenterButton()) {
            //select button for on screen options
            buttonCenter.size = 50;
            this.showEye = true;
            scareSFX.setVolume(0.08);
            // scareSFX.play();
            }
    }
}