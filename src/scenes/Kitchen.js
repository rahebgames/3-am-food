class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchenScene")
    }

    create() {
        this.checkPassed = false
        this.checkDone = false
        
        this.activeTile = null
        this.tileSize = 85.71
        let playerSize = 84.71

        this.addProps()

        this.player = this.physics.add.sprite((this.tileSize*6)+(this.tileSize/2)+offset, (this.tileSize/2)+offset, 'spiderman')
        this.player.body.setSize(700, 1400)
        this.player.setDisplaySize(playerSize, playerSize)
        this.keys = this.input.keyboard.createCursorKeys()

        this.house = this.add.image(centerX, centerY, 'house')
        this.house.setDisplaySize(w, h)
        this.house.visible = false

        this.addSkillChecks()
        this.addObstacleCollisions()
    }

    update() {
        this.movementHandler()
        this.skillCheckHandler()
    }

    skillCheckHandler() {
        if (this.check && this.checkDone) {
            this.check.delete()
            this.check = null

            this.pauseTint.destroy()
            this.pauseTint = null

            this.activeTile.body.enable = false
        } else if (this.check) {
            this.check.update()
        }

        if (!this.checkPassed && this.checkDone) {
            this.house.visible = true
        } else if (!this.check && this.checkDone) {
            this.checkDone = false
            this.checkPassed = false
        }
    }

    addProps() {
        this.add.image(centerX, centerY, "kitchenGrid")
        this.table = this.physics.add.sprite(centerX, centerY, 'table')
        this.oven = this.physics.add.sprite((this.tileSize * 4) + offset, (this.tileSize / 2) + offset, 'oven')
        this.sink = this.physics.add.sprite((this.tileSize / 2) + offset, (this.tileSize * 2) + offset, 'sink')
        this.pantry = this.physics.add.sprite((this.tileSize * 5) + offset, (this.tileSize * 6) + (this.tileSize / 2) + offset, 'pantry')
        this.fridge = this.physics.add.sprite((this.tileSize * 3 / 2) + offset, (this.tileSize * 6) + (this.tileSize / 2) + offset, 'fridge')
        this.microwave = this.physics.add.sprite((this.tileSize * 3 / 2) + offset, (this.tileSize / 2) + offset, 'microwave')
    }

    addObstacleCollisions() {
        this.table.setImmovable(true)
        this.physics.add.collider(this.player, this.table)

        this.oven.setImmovable(true)
        this.physics.add.collider(this.player, this.oven)

        this.sink.setImmovable(true)
        this.physics.add.collider(this.player, this.sink)

        this.pantry.setImmovable(true)
        this.physics.add.collider(this.player, this.pantry)

        this.fridge.setImmovable(true)
        this.physics.add.collider(this.player, this.fridge)

        this.microwave.setImmovable(true)
        this.physics.add.collider(this.player, this.microwave)   
    }

    addSkillChecks() {
        this.tile1 = this.add.rectangle((this.tileSize*6)+(this.tileSize/2)+offset, (this.tileSize/2)+(this.tileSize*3)+offset, this.tileSize, this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.tile1, true)

        this.tileOneCollider = this.physics.add.overlap(this.player, this.tile1, () => {
            if (!this.check) {
                this.activeTile = this.tile1
                this.pauseTint = this.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5)
                this.check = new Skillcheck(this, centerX, centerY)
            }
        })

        this.tile2 = this.add.rectangle((this.tileSize*3)+(this.tileSize/2)+offset, (this.tileSize/2)+(this.tileSize)+offset, this.tileSize, this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.tile2, true)

        this.tileTwoCollider = this.physics.add.overlap(this.player, this.tile2, () => {
            if (!this.check) {
                this.activeTile = this.tile2
                this.pauseTint = this.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5)
                this.check = new Skillcheck(this, centerX, centerY)
            }
        })

    }

    movementHandler() {
        this.player.body.setVelocity(0)
        if (this.keys.down.isDown) {
            this.player.body.setVelocityY(200)
        } else if (this.keys.up.isDown) {
            this.player.body.setVelocityY(-200)
        } else if (this.keys.left.isDown) {
            this.player.body.setVelocityX(-200)
        } else if (this.keys.right.isDown) {
            this.player.body.setVelocityX(200)
        }
        
    }
}
