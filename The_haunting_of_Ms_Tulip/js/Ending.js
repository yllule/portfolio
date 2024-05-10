class Ending {
    constructor() {

    }

    draw() {

        outside.stop();
        
        push();
        rectMode(CENTER);
        fill(255, 0, 0);
        rect(width/2, height/2, 500, 750);
        pop();

        //text
        push();
        textSize(30);
        fill(255);
        textAlign(CENTER);
        textFont('Georgia');
        text('You died', width/2, height/2);
        textSize(7.5);
        text('Original unedited images by : Charlotte May, Vlada Karpovich, Askar Abayev, Antaryami Das,', width/2, height-120);
        text('Darina Belonogova, Karolina Grabowska, cottonbro studio, Zen Chung on Pexels', width/2, height-100);
        text('and Forte Foundry, Annie Spratt, Arno Smit, Hans Isaacson, Aaron Huber, Kate Darmody, Julian Hochgesang on Unsplash and rorozoa on freepik', width/2, height-75);
        text('Audio by : Percy Duke, theplax, nixeno, yadronoff, Artninja, adh.dreaming, felix.blume on Freesound', width/2, height-50);
        pop();
    }

    mousePressed() {

    }

    mouseReleased() {

    }

    keyPressed() {

    }
}