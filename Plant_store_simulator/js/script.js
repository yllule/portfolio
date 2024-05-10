/**
Catherine Zaloshnja
Final Project

(point and click game, click on the customers you want to serve)

My idea for this project had to be simplified. You can check out the proposal for what I was aiming for.
I wanted the player to be able to tend to plants in between customers, but I ran out of time.
I also wanted to have an intro of you meeting the owner and getting hired for the day.
The tasks you do for customers are really simple in the end. I wanted them to be a bit more complex like for example forming a bouquet by picking out what flowers go in,
or having to guess which plant the customer is talking about, with there being a wrong answer you can give them and them reacting to it.
In the end I was only able to make the player choose what plant to give the character, without the customer reacting to their decision, so it is very simple and...not very fun.
But hopefully the little bits of lore and story make up for it.

The ending scene is a bit buggy sometimes, but i just wanted to have something to let you know that it's the end of the game.

sounds are from Sirkoto51 and 3bagbrew on freesound.org
*/

"use strict";


let config = {
    type : Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: `arcade`
    },
    scene: [Boot, Play, Npctask1, Npctask2, Npctask3, Npctask5, Npctask6, Npctask7, Plant1task]
};

let game = new Phaser.Game(config);