'use strict';

let config = {
    type: Phaser.AUTO,
    width: 620,
    height: 620,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true 
        }
    },
    audio: {
        disableWebAudio: false,
        noAudio: false,
        autoDetect: true, 
    },
    scene: [ Load , Kitchen ],
}

let textConfig = {
    fontFamily: 'Courier',
    color: '#ffffff',
    fontSize: '18px',
    strokeThickness: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75',
    padding: { x: 10, y: 5}
}

let game = new Phaser.Game(config)

let w = game.config.width;
let h = game.config.height;
let centerX = w/2;
let centerY = h/2;
let offset = 10;