class Kitchen extends Phaser.Scene {
    constructor() {
        super("kitchenScene")
    }

    create() {
        this.checkPassed = false
        this.checkDone = false
        this.cheeseGrilled = false
        this.cheeseDone = false
        
        this.activeTile = null
        this.tileSize = 85.71
        let playerSize = 84.71

        this.creak = this.sound.add('floor-creak', {
            volume: 2
        })
        this.hum = this.sound.add('hum', {
            loop: true,
            volume: 0.5
        })
        this.clang = this.sound.add('clang', {
            volume: 0.7
        })
        this.scream = this.sound.add('scream', {
            volume: 1
        })
        this.objective = this.sound.add('objective', {
            volume: 1
        })
        this.step = 1

        this.addProps()
        this.propActive = false

        this.player = this.physics.add.sprite((this.tileSize*6)+(this.tileSize/2)+offset, (this.tileSize/2)+offset, 'spiderman')
        this.player.body.setSize(600, 1400)
        this.player.setDisplaySize(playerSize, playerSize)
        this.keys = this.input.keyboard.createCursorKeys()

        this.addObjectiveText()
        this.addHelperText()

        this.house = this.add.image(centerX, centerY, 'house')
        this.house.setDisplaySize(w, h)
        this.house.visible = false

        this.addPropCollisions()
        this.addSkillChecks()
        this.stepHandler()

        this.hum.play()
    }

    update() {
        if (this.check == null) {
            this.movementHandler()
        } else {
            this.player.setVelocity(0)
        }

        this.skillCheckHandler()
        this.stoveHandler()

        this.helperTextVisible()
        this.objectiveTextUpdate()
    }

    objectiveTextUpdate() {
        if (this.step == 2) {
            this.objectiveOne.visible = false
            this.objectiveTwo.visible = true
        } else if (this.step == 3) {
            this.objectiveTwo.visible = false
            this.objectiveThree.visible = true
        } else if (this.step == 4) {
            this.winText.visible = true
        }
    }

    addObjectiveText() {
        this.objectiveOne = this.add.text(0, 0, 'Objective: retrieve grilled cheese \ningredients from fridge', textConfig)
        this.objectiveTwo = this.add.text(0, 0, 'Objective: grill the cheese on the oven', textConfig)
        this.objectiveTwo.visible = false
        this.objectiveThree = this.add.text(0, 0, 'Objective: put dishes in the sink', textConfig)
        this.objectiveThree.visible = false
        this.winText = this.add.text(200, centerY, "You Win!", {
            fontSize: "48px",
            backgroundColor: 'rgba(0, 0, 0, 0.75',
        })
        this.winText.visible = false

    }

    stoveHandler() {
        if (this.stoveCheck && this.cheeseDone) {
            this.stoveCheck.delete()
            this.stoveCheck = null

            this.pauseTint.destroy()
            this.pauseTint = null
            
        } else if (this.stoveCheck) {
            this.stoveCheck.update()
        }

        if (!this.cheeseGrilled && this.cheeseDone) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {   
                    if (!this.scream.isPlaying) {
                        this.scream.play()
                    }                 
                    this.house.visible = true
                    this.cheeseDone = false
                },
                callbackScope: this,
                loop: false,
            })
        } else if (!this.stoveCheck && this.cheeseDone) {
            this.step = 3
            if (!this.objective.isPlaying) this.objective.play()
            //console.log(this.step)
            this.cheeseGrilled = false
            this.cheeseDone = false
        }
    }

    addHelperText() {
        this.helper = false
        this.helperText = this.add.text(310, 20, 'Press [Space] to interact', textConfig)
    }

    helperTextVisible() {
        if (this.helper) {
            this.helperText.visible = true
        } else {
            this.helperText.visible = false
        }
        this.helper = false
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
            this.time.addEvent({
                delay: 1000,
                callback: () => {   
                    if (!this.scream.isPlaying) {
                        this.scream.play()
                    }                 
                    this.house.visible = true
                    this.checkDone = false
                },
                callbackScope: this,
                loop: false,
            })
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

    addPropCollisions() {
        this.table.setImmovable(true)
        this.physics.add.collider(this.player, this.table)

        this.oven.setImmovable(true)
        this.physics.add.collider(this.player, this.oven)
        this.ovenAction = this.add.rectangle((this.tileSize * 4) + offset, (this.tileSize / 2) + offset+20, (this.tileSize*2), this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.ovenAction, true)

        this.sink.setImmovable(true)
        this.physics.add.collider(this.player, this.sink)
        this.sinkAction = this.add.rectangle((this.tileSize / 2) + offset+10, (this.tileSize * 2) + offset+10, this.tileSize, (this.tileSize*2), 0x000000, 0)
        this.physics.add.existing(this.sinkAction, true)

        this.pantry.setImmovable(true)
        this.physics.add.collider(this.player, this.pantry)
        /*this.pantryAction = this.add.rectangle((this.tileSize * 5) + offset, (this.tileSize * 6) + (this.tileSize / 2) -10, (this.tileSize*4), this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.pantryAction, true)
        this.physics.add.overlap(this.player, this.pantryAction, () => {
            if (!this.check) {
                if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
                    console.log("hello")
                }
            }
        })*/

        this.fridge.setImmovable(true)
        this.physics.add.collider(this.player, this.fridge)
        this.fridgeAction = this.add.rectangle((this.tileSize * 3 / 2) + offset, (this.tileSize * 6) + (this.tileSize / 2) - 10, (this.tileSize*3), this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.fridgeAction, true)

        this.microwave.setImmovable(true)
        this.physics.add.collider(this.player, this.microwave)

    }

    stepHandler() {
        this.physics.add.overlap(this.player, this.fridgeAction, () => {
            this.helper = true
            if (Phaser.Input.Keyboard.JustDown(this.keys.space) && this.step == 1) {
                this.step = 2
                this.objective.play()
                console.log(this.step)
            }
        })

        this.physics.add.overlap(this.player, this.ovenAction, () => {
            if (!this.check && !this.stoveCheck) {
                this.helper = true
                if (Phaser.Input.Keyboard.JustDown(this.keys.space) && this.step == 2) {
                    this.pauseTint = this.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5)
                    this.stoveCheck = new Stove(this, centerX, centerY)
                } 
            }
        })

        this.physics.add.overlap(this.player, this.sinkAction, () => {
            this.helper = true
            if (Phaser.Input.Keyboard.JustDown(this.keys.space) && this.step == 3) {
                this.step = 4
                console.log(this.step)
                if (!this.objective.isPlaying) this.objective.play()
                this.winText.visible = true
            }
        })
    }

    addSkillChecks() {
        this.tile1 = this.add.rectangle((this.tileSize*6)+(this.tileSize/2)+offset, (this.tileSize/2)+(this.tileSize*3)+offset, this.tileSize, this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.tile1, true)

        this.tileOneCollider = this.physics.add.overlap(this.player, this.tile1, () => {
            
            if (!this.check) {
                this.creak.play()
                this.activeTile = this.tile1
                this.pauseTint = this.add.rectangle(centerX, centerY, w, h, 0x000000, 0.5)
                this.check = new Skillcheck(this, centerX, centerY)
            }
        })

        this.tile2 = this.add.rectangle((this.tileSize*3)+(this.tileSize/2)+offset, (this.tileSize/2)+(this.tileSize)+offset, this.tileSize, this.tileSize, 0x000000, 0)
        this.physics.add.existing(this.tile2, true)

        this.tileTwoCollider = this.physics.add.overlap(this.player, this.tile2, () => {
            if (!this.check) {
                this.creak.play()
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
        }
        if (this.keys.left.isDown) {
            this.player.body.setVelocityX(-200)
        } else if (this.keys.right.isDown) {
            this.player.body.setVelocityX(200)
        }
        
    }
}
