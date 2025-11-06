class Skillcheck extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0.5);
        this.scene = scene

        this.limitLeft = centerX-200
        this.limitRight = centerX+200
        
        this.bar = scene.add.rectangle(centerX, centerY, 400, 25, 0xc7c7c7, 1)
        this.zone = scene.add.rectangle(centerX, centerY, 80, 25, 0xff0000, 1)
        this.slider = scene.physics.add.sprite(this.limitLeft, centerY, 'slider')

        this.speed = 700
        this.slider.body.setVelocityX(this.speed)
    }

    delete() {
        this.bar.destroy()
        this.zone.destroy()
        this.slider.destroy()

        this.bar = null
        this.zone = null
        this.slider = null
    }

    update() {
        if (this.slider.x > this.limitRight) {
            this.slider.body.setVelocityX(-this.speed)
        }
        if (this.slider.x < this.limitLeft) {
            this.slider.body.setVelocityX(this.speed)
        }  

        if (Phaser.Input.Keyboard.JustDown(this.scene.keys.space)) {
            if (this.slider.x >= (centerX-40) && this.slider.x <= (centerX+40)) {
                this.scene.checkPassed = true
                this.scene.checkDone = true
            } else {
                this.scene.checkDone = true
            }
        }

    }
}