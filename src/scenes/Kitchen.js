class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchenScene")
    }

    create() {
        this.add.image(centerX, centerY, "kitchenGrid")

        this.addColliders()
    }
    update() {
        
    }

    addColliders() {
        this.table = this.add.rectangle(230+offset, 170+offset, 229, 115, 0x000000, 0)
        this.physics.add.existing(this.table, true)

        this.pantry = this.add.rectangle((400/2)+offset, (400-56/2)+offset, 57*7, 56, 0x000000, 0)
        this.physics.add.existing(this.pantry, true)

        this.oven = this.add.rectangle((56/2)+offset, (57*3/2)+offset, 56, 57*3, 0x000000, 0)
        this.physics.add.existing(this.oven, true)

        this.microwave = this.add.rectangle((57*3)+offset, (56/2)+offset, 57*4, 56, 0x000000, 0)
        this.physics.add.existing(this.microwave, true)
    }
}
