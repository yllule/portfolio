class Diningroom {
    constructor() {

    }

    draw() {
        //images
        push();
        imageMode(CENTER);
        image(diningRoomImg, width/2, height/2);
        image(arrowImg, width-75, height-75);
        image(arrow2Img, 75, height-75);
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
        if (keyCode === LEFT_ARROW) {
            currentState = new Kitchen;
        }

        if (keyCode === RIGHT_ARROW) {
            currentState = new Livingroom;
        }
    }
    
    scare() {
        footstepsSFX.play();
    }
}