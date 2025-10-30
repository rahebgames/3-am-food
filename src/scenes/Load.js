class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        //this.load.path = './assets/';
        this.load.image('kitchenGrid', './assets/KitchenGrid.png')
        this.load.image('spiderman', './assets/spiderman.png')
        this.load.image('slider', './assets/slider.png')
        this.load.image('house', './assets/house.png')
    }

    create() {
        this.scene.start('kitchenScene')
    }
}