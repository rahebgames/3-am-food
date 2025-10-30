class Skillcheck extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0.5);
        this.scene = scene

        this.limitLeft = 50+offset
        this.limitRight = 350+offset
        scene.add.rectangle(centerX, centerY, 300, 25, 0xc7c7c7, 1)

        this.zone = scene.add.rectangle(centerX, centerY, 50, 25, 0xfafafa, 1)

        this.slider = scene.physics.add.sprite(this.limitLeft, centerY, 'slider')

        this.speed = 200
        this.slider.body.setVelocityX(this.speed)

    }

    update() {
        if (this.slider.x > this.limitRight) {
            this.slider.body.setVelocityX(-this.speed)
        }
        if (this.slider.x < this.limitLeft) {
            this.slider.body.setVelocityX(this.speed)
        }  

        if (Phaser.Input.Keyboard.JustDown(this.scene.keys.space)) {
            if (this.slider.x >= 150+offset && this.slider.x <= 250+offset) {
                console.log("nice")
            } else {
                console.log("oops")
            }
        }

    }
}