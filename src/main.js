'use strict';

let config = {
    type: Phaser.AUTO,
    width: 420,
    height: 420,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load , Kitchen ],
}

let textConfig = {
    fontFamily: 'Courier',
    fontSize: '200 px',
    color: '#ffffff',
}

let game = new Phaser.Game(config)

let w = game.config.width;
let h = game.config.height;
let centerX = w/2;
let centerY = h/2;
let offset = 10;