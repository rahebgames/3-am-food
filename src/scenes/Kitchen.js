class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchenScene")
    }

    create() {
        this.loseCond = false
        this.tileSize = 57.25

        let playerSize = 56.25
        this.add.image(centerX, centerY, "kitchenGrid")
        this.player = this.physics.add.sprite((57.25*6)+(56.25/2)+offset, (56.25/2)+offset, 'spiderman')
        this.player.setDisplaySize(playerSize, playerSize)
        this.player.body.setSize(500, 500)
        this.player.setImmovable(true)

        this.keys = this.input.keyboard.createCursorKeys()

        this.targetY = this.player.y

        this.addChecks()
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.down)) {
            this.targetY = this.player.y + this.tileSize
            this.movingDown = true
            this.player.body.setVelocityY(200)
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
            this.targetY = this.player.y - this.tileSize
            this.movingUp = true
            this.player.body.setVelocityY(-200)
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
            this.targetX = this.player.x - this.tileSize
            this.movingLeft = true
            this.player.body.setVelocityX(-200)
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.targetX = this.player.x + this.tileSize
            this.movingRight = true
            this.player.body.setVelocityX(200)
        }
        this.playerTileChecker()

        if (this.check && this.check.checkDone) {
            //this.check.destroy()
        }
        if (this.check) {
            this.check.update()
        }
    }

    addChecks() {
        this.tile1 = this.add.rectangle((57.25*6)+(56/2)+offset, (56.25/2)+(57.25*3)+offset, 56.25, 56.25, 0x000000, 0)
        this.physics.add.existing(this.tile1, true)

        this.physics.add.collider(this.player, this.tile1, () => {
            if (!this.check) {
                this.pauseTint = this.add.rectangle(centerX, centerY, 420, 420, 0x000000, 0.5)
                this.check = new Skillcheck(this, centerX, centerY)
            }
        })

    }

    playerTileChecker() {
        if (this.movingDown) {
            console.log("moving player")
            if (this.player.y >= this.targetY) {
                this.player.body.setVelocityY(0)
                this.player.body.reset(this.player.x, this.targetY)
                this.movingDown = false
            }
        } else if (this.movingUp) {
            if (this.player.y <= this.targetY) {
                this.player.body.setVelocityY(0)
                this.player.body.reset(this.player.x, this.targetY)
                this.movingUp = false
            }
        } else if (this.movingLeft) {
            if (this.player.x <= this.targetX) {
                this.player.body.setVelocityX(0)
                this.player.body.reset(this.targetX, this.player.y)
                this.movingLeft = false
            }
        } else if (this.movingRight) {
            if (this.player.x >= this.targetX) {
                this.player.body.setVelocityX(0)
                this.player.body.reset(this.targetX, this.player.y)
                this.movingRight = false
            }
        }
    }


}
