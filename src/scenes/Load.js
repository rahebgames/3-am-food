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
        this.load.image('table', './assets/table.png')
        this.load.image('oven', './assets/oven.png')
        this.load.image('sink', './assets/sink.png')
        this.load.image('pantry', './assets/pantry.png')
        this.load.image('fridge', './assets/fridge.png')
        this.load.image('microwave', './assets/microwave.png')
    }

    create() {
        this.scene.start('kitchenScene')
    }
}