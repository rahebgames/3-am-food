class Skillcheck extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frontTexture, backTexture) {
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0.5);
        this.setInteractive();
        this.frontTexture = frontTexture
        this.backTexture = backTexture

        this.side = true

        // Click action
        this.on('pointerdown', () => {
            if (this.side) this.side = false
            else this.side = true
        }, this)
    }

    update() {
        if (this.side) this.setTexture(this.frontTexture)
        else this.setTexture(this.backTexture)
    }
}