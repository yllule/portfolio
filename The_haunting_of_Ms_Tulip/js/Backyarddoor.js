class Backyarddoor {
    constructor() {

        this.fade = 0;
        this.fadeSpeed = 2;

    }

    draw() {
        //images

        push();
        imageMode(CENTER);
        tint(255, this.fade);
        if (this.fade < 255) {
          this.fade = this.fade + this.fadeSpeed; 
        }
        image(backyardDoorImg, width/2, height/2);
        pop();

        push();
        imageMode(CENTER);
        image(uparrowImg, width/2, height-75);
        if(spiritBoxOn) {
            image(handImg, width-50, height/2+100);
            image(notesImg, 75, height/2+100);
        }
        pop();
    }

    mousePressed() {
        spiritBoxOn = true;
    }

    mouseReleased() {
        spiritBoxOn = false;
        staticbg.stop();
        staticvoices.stop();
    }

    keyPressed() {
        if (keyCode === UP_ARROW) {
            currentState = new Garden;
        }
    }
}