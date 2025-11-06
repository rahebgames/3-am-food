class Stove extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this)
        this.setOrigin(0.5);
        this.scene = scene

        this.bar = scene.add.rectangle(centerX, centerY, 25, 400, 0xc7c7c7, 1)
        this.cheese = scene.physics.add.sprite(centerX, centerY-200, 'grilledCheese').setScale(0.5).setSize(300, 100)

        this.gravity = 200      
        this.jump = 50

        this.floor = this.scene.add.rectangle(centerX, centerY+200+10, 25, 20, 0x000000, 0)
        this.scene.physics.add.existing(this.floor, true)
        this.scene.physics.add.collider(this.cheese, this.floor, () => {
            if (this.gravity > 50) {
                this.scene.cheeseDone = true
                this.scene.clang.play()
            } else {
                this.scene.cheeseDone = true
                this.scene.cheeseGrilled = true
            }
            this.cheese.body.setVelocityY(0)
        })
    }

    update() {
        if (this.scene.keys.space.isDown) {
            this.gravity -= 5
        } else {     
            this.gravity += 1
        }
        this.cheese.body.setVelocityY(this.gravity)
    }

    delete() {
        this.bar.destroy()
        this.bar = null

        this.cheese.destroy()
        this.cheese = null

        this.floor.destroy()
        this.floor = null
    }
} 