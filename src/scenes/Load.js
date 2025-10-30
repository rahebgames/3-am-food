class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('kitchenGrid', 'kitchenGrid.png')
        this.load.image('spiderman', 'spiderman.png')
        this.load.image('slider', 'slider.png')
    }

    create() {
        this.scene.start('kitchenScene')
    }
}