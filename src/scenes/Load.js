class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/';
        this.load.image('kitchenGrid', 'KitchenGrid.png')
        this.load.image('spiderman', 'spiderman.png')
        this.load.image('slider', 'slider.png')
        this.load.image('house', 'house.png')
    }

    create() {
        this.scene.start('kitchenScene')
    }
}