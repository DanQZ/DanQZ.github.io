class UI { //make this later
    constructor() {

        this.numberOfTowerTypes = 4;

        //general
        this.whiteSquare = new Image();
        this.whiteSquare.src = "assets/whiteSquare100x100.png";

        this.UIPathClosed = new Image();
        this.UIPathClosed.src = "assets/pathClosed.png";

        //general upgrades
        this.UI1PierceImage = new Image();
        this.UI1PierceImage.src = "assets/UI+1Pierce.png";
        this.UI1DamageImage = new Image();
        this.UI1DamageImage.src = "assets/UI+1Damage.png";
        this.UI1AtkSpdImage = new Image();
        this.UI1AtkSpdImage.src = "assets/UI+1AtkSpd.png";
        this.UI10RangeImage = new Image();
        this.UI10RangeImage.src = "assets/10RangeButton.png";

        //dart
        this.UITripleShotImage = new Image();
        this.UITripleShotImage.src = "assets/tripleShotButton.png";
        this.UIBorderBounceImage = new Image();
        this.UIBorderBounceImage.src = "assets/borderBounceButton.png";
        this.UIExplodingImage = new Image();
        this.UIExplodingImage.src = "assets/explodingDartButton.png";


        //boomerang
        this.UIDoubleRangImage = new Image();
        this.UIDoubleRangImage.src = "assets/doubleRangButton.png";
        this.UIInfiniteRangImage = new Image();
        this.UIInfiniteRangImage.src = "assets/infiniteRangButton.png";
        this.UIBouncingRangImage = new Image();
        this.UIBouncingRangImage.src = "assets/bouncingRangButton.png";
        this.UIQuadraRangImage = new Image();
        this.UIQuadraRangImage.src = "assets/quadraRangButton.png";

        //bomb    
        this.UIFragBombsImage = new Image();
        this.UIFragBombsImage.src = "assets/fragBombButton.png";
        this.UIClusterBombsImage = new Image();
        this.UIClusterBombsImage.src = "assets/clusterBombButton.png";

        //tack    
        this.UI1TacksImage = new Image();
        this.UI1TacksImage.src = "assets/UI+1TacksButton.png";
        this.UIRingOfFireImage = new Image();
        this.UIRingOfFireImage.src = "assets/UIRoFButton.png";
        this.UIRadiationImage = new Image();
        this.UIRadiationImage.src = "assets/UIRadiationButton.png";
        //end of images


        this.buttonArrayCoords = [];
        this.buttonSize = 100;
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 3; x++) {
                this.buttonArrayCoords[3 * y + x] = [canvas.width - ((2 - x) * this.buttonSize) - this.buttonSize / 2, y * this.buttonSize + this.buttonSize / 2];
            }
        }


        this.towerMenuImages = [
            dartChimp,      //1
            boomerangChimp, //2
            cannonSprite,   //3
            tackShooterSprite, //4
        ];

        this.towerMenuCosts = [
            100, //dart
            250, //boomerang
            500, //bomb
            300, //tack
        ];

        this.upgradeButtons = [];
        this.towerMenuButtons = [];
        this.messages=[];


        for (let i = 0; i < this.numberOfTowerTypes; i++) {
            this.towerMenuButtons.push(new UIButton(this.whiteSquare, "tower " + (i + 1) + " button", "tower", i + 1)); //keep i+1 as tower type starts at 1
        }

        for (let i = 0; i < this.numberOfTowerTypes; i++) {
            this.towerMenuButtons[i].pos = this.buttonArrayCoords[i];
        }

        /*
        this.numberOfTowerTypes;
        this.towerMenuButtons = [];
        this.upgradeMenuButtons = [];
        this.upgradesVisible = false;
        this.buttonArrayCoords = [];
        this.buttonSize = 100;*/

    }

    upgradeTower(parentButton, upgradeType) {

        switch (selectedTower.towerType) {
            case 1:// dart
                switch (upgradeType) {
                    case 1: //+1 pierce
                        selectedTower.pierce += 1;
                        selectedTower.pierceLevel += 1;
                        break;
                    case 2: //+1 damage
                        selectedTower.damage += 1;
                        selectedTower.damageLevel += 1;
                        break;
                    case 3: //+10% attack speed
                        selectedTower.APS *= 1.1;
                        selectedTower.atkSpeedLevel += 1;
                        break;
                    case 4: //activate triple shot darts
                        selectedTower.tripleShot = true;
                        break;
                    case 5: //activate border bouncing darts
                        selectedTower.borderBounce = true;
                        break;
                    case 6: //activate explosive darts
                        selectedTower.explosive = true;
                        break;
                    case 7: //+10% range
                        selectedTower.range *= 1.1;
                        selectedTower.rangeLevel += 1;
                        break;
                }
                break;
            case 2://boomerang
                switch (upgradeType) {
                    case 1: //+1 pierce
                        selectedTower.pierce += 1;
                        selectedTower.pierceLevel += 1;
                        break;
                    case 2: //+1 damage
                        selectedTower.damage += 1;
                        selectedTower.damageLevel += 1;
                        break;
                    case 3: //+10% attack speed
                        selectedTower.APS *= 1.1;
                        selectedTower.atkSpeedLevel += 1;
                        break;
                    case 4: //activate double boomerang throwing
                        selectedTower.doubleRang = true;
                        break;
                    case 5: //activate bouncing
                        selectedTower.bouncing = true;
                        break;
                    case 6: //activate infinite looping
                        selectedTower.infiniteLoop = true;
                        break;
                    case 7: //activate quad rangs
                        selectedTower.quadraRang = true;
                        break;
                }
                break;
            case 3://cannon
                switch (upgradeType) {
                    case 1: //x1.1 range
                        selectedTower.range *= 1.1;
                        selectedTower.rangeLevel += 1;
                        break;
                    case 2: //+1 damage
                        selectedTower.explosionDamage += 1;
                        selectedTower.explosionDamageLevel += 1;
                        break;
                    case 3: //+10% attack speed
                        selectedTower.APS *= 1.1;
                        selectedTower.atkSpeedLevel += 1;
                        break;
                    case 4: //activate frags
                        selectedTower.fragBomb = true;
                        break;
                    case 5: //activate cluster
                        selectedTower.clusterBomb = true;
                        break;
                }

                break;
            case 4://tack shooter
                switch (upgradeType) {
                    case 1: //+1 pierce
                        selectedTower.pierce += 1;
                        selectedTower.pierceLevel += 1;
                        break;
                    case 2: //+1 damage
                        selectedTower.damage += 1;
                        selectedTower.damageLevel += 1;
                        break;
                    case 3: //+10% attack speed
                        selectedTower.APS *= 1.1;
                        selectedTower.atkSpeedLevel += 1;
                        break;
                    case 4: //ring of fire
                        selectedTower.ringOfFire = true;
                        break;
                    case 5: //radiation field
                        selectedTower.radiation = true;
                        selectedTower.tackSpeed /= 5;
                        selectedTower.pierce = Infinity;
                        selectedTower.tackLifespan = Infinity;
                        selectedTower.range = canvas.width;
                        break;
                    case 6: //+1 tacks
                        selectedTower.numOfTacks += 1;
                        selectedTower.numOfTacksLevel += 1;
                        break;
                }
                break;
        }

        this.updateUpgrades();
    }

    updateUpgrades() {
        this.closeUpgrades();
        this.showUpgrades();
    }


    buyNewTower(parentButton, towerType) {
        towerHovering = towerType;
        towerHoveringImage = this.towerMenuImages[towerType - 1];
    }

    placeTower() {
        this.closeUpgrades();
        money -= this.towerMenuCosts[tempTower.towerType - 1];
        tempTower = null;
        selectedTower = null;
        towers.push(new Tower(towerHovering, mousePos));
        towerHovering = -1;
    }

    clickTowerMenu() {
        this.closeUpgrades();
        selectedTower = null;
        let closestTowerMenuButton = this.closestTowerMenuButtonTo(mousePos);
        closestTowerMenuButton.Activate();
        tempTower = new Tower(towerHovering);
    }

    closestTowerMenuButtonTo() {
        let minDist = Infinity;
        let minIndex = -1;
        for (let i = 0; i < this.towerMenuButtons.length; i++) {
            let distance = findDistance(mousePos, this.towerMenuButtons[i].pos);
            if (distance < minDist) {
                minIndex = i;
                minDist = distance;
            }
        }
        if (minIndex == -1) {
            return -1;
        }
        return this.towerMenuButtons[minIndex];
    }

    mouseOverMenuButton() {

        for (let i = 0; i < this.towerMenuButtons.length; i++) {
            let UIButton = this.towerMenuButtons[i];
            let xLower = UIButton.pos[0] - UIButton.buttonImage.width / 2;
            let xUpper = UIButton.pos[0] + UIButton.buttonImage.width / 2;
            let yLower = UIButton.pos[1] - UIButton.buttonImage.height / 2;
            let yUpper = UIButton.pos[1] + UIButton.buttonImage.height / 2;
            let inXBounds = (mousePos[0] > xLower && mousePos[0] < xUpper);
            let inYBounds = (mousePos[1] > yLower && mousePos[1] < yUpper);

            if (inXBounds && inYBounds) {
                return true;
            }
        }
        return false;
    }

    closestUpgradeButtonTo(mousePos) {
        let minDist = Infinity;
        let minIndex = -1;
        for (let i = 0; i < this.upgradeButtons.length; i++) {
            let distance = findDistance(mousePos, this.upgradeButtons[i].pos);
            if (distance < minDist) {
                minIndex = i;
                minDist = distance;
            }
        }
        if (minIndex == -1) {
            return -1;
        }
        return this.upgradeButtons[minIndex];
    }

    mouseOverUpgradeButton() {

        for (let i = 0; i < this.upgradeButtons.length; i++) {
            let UIButton = this.upgradeButtons[i];
            let xLower = UIButton.pos[0] - UIButton.width / 2;
            let xUpper = UIButton.pos[0] + UIButton.width / 2;
            let yLower = UIButton.pos[1] - UIButton.height / 2;
            let yUpper = UIButton.pos[1] + UIButton.height / 2;
            let inXBounds = (mousePos[0] > xLower && mousePos[0] < xUpper);
            let inYBounds = (mousePos[1] > yLower && mousePos[1] < yUpper);

            if (inXBounds && inYBounds) {
                return true;
            }
        }
        return false;
    }
    showUpgrades() {//temporary showupgrade method, will make a more modular one later

        upgradeMenuOpened = true;
        switch (selectedTower.towerType) {
            case 1://dart 
                this.upgradeButtons.push(new UIButton(this.UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                this.upgradeButtons.push(new UIButton(this.UI1DamageImage, "+1 Damage button", "upgrade", 2));
                this.upgradeButtons.push(new UIButton(this.UI1AtkSpdImage, "1.1x AtkSpd button", "upgrade", 3));
                this.upgradeButtons.push(new UIButton(this.UI10RangeImage, "+10% range button", "upgrade", 7));

                if (!selectedTower.tripleShot)
                    this.upgradeButtons.push(new UIButton(this.UITripleShotImage, "triple shot button", "upgrade", 4));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.borderBounce)
                    this.upgradeButtons.push(new UIButton(this.UIBorderBounceImage, "border bounce button", "upgrade", 5));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.explosive)
                    this.upgradeButtons.push(new UIButton(this.UIExplodingImage, "explosive darts button", "upgrade", 6));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));

                

                    

                break;

            case 2: //boomerang
                this.upgradeButtons.push(new UIButton(this.UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                this.upgradeButtons.push(new UIButton(this.UI1DamageImage, "+1 Damage button", "upgrade", 2));
                this.upgradeButtons.push(new UIButton(this.UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));

                if (!selectedTower.doubleRang) {
                    this.upgradeButtons.push(new UIButton(this.UIDoubleRangImage, "double rang button", "upgrade", 4));
                }
                else {
                    if (!selectedTower.quadraRang)
                        this.upgradeButtons.push(new UIButton(this.UIQuadraRangImage, "quadra rang button", "upgrade", 7));
                    else
                        this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));
                }

                if (!selectedTower.bouncing)
                    this.upgradeButtons.push(new UIButton(this.UIBouncingRangImage, "bouncing rang button", "upgrade", 5));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.infiniteLoop)
                    this.upgradeButtons.push(new UIButton(this.UIInfiniteRangImage, "infinite loop rang button", "upgrade", 6));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "UIPathClosed", "blank", -1));

                break;
            case 3: //cannon
                this.upgradeButtons.push(new UIButton(this.UI10RangeImage, "+1 Range button", "upgrade", 1));
                this.upgradeButtons.push(new UIButton(this.UI1DamageImage, "+1 Damage button", "upgrade", 2));
                this.upgradeButtons.push(new UIButton(this.UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));

                if (!selectedTower.fragBomb)
                    this.upgradeButtons.push(new UIButton(this.UIFragBombsImage, "frag bomb button", "upgrade", 4));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.clusterBomb)
                    this.upgradeButtons.push(new UIButton(this.UIClusterBombsImage, "cluster bomb button", "upgrade", 5));
                else
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));
                break;
            case 4: //tack
                this.upgradeButtons.push(new UIButton(this.UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                this.upgradeButtons.push(new UIButton(this.UI1DamageImage, "+1 Damage button", "upgrade", 2));
                this.upgradeButtons.push(new UIButton(this.UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));
                this.upgradeButtons.push(new UIButton(this.UI1TacksImage, "+1 tacks button", "upgrade", 6));

                if (!selectedTower.ringOfFire && !selectedTower.radiation) {
                    this.upgradeButtons.push(new UIButton(this.UIRingOfFireImage, "ring of fire button", "upgrade", 4));
                    this.upgradeButtons.push(new UIButton(this.UIRadiationImage, "radiation button", "upgrade", 5));
                }
                else {
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));
                    this.upgradeButtons.push(new UIButton(this.UIPathClosed, "pathClosed", "blank", -1));
                }

                break;
        }

        for (let i = 0; i < this.upgradeButtons.length; i++) {
            this.upgradeButtons[i].pos = this.buttonArrayCoords[this.buttonArrayCoords.length - i - 1];
        }
        
    }

    hoverUpgrades()
    {
        this.messages.length=0;
        switch (selectedTower.towerType) {
            case 1://dart 
                switch(this.closestUpgradeButtonTo(mousePos).buttonTypeType){
                case 1:
                    this.messages.push("Pierce");
                    this.messages.push("It pierces");
                    this.messages.push("Cost money");
                    break;
                case 2:
                    this.messages.push("Damge");
                    this.messages.push("It damages");
                    this.messages.push("Cost money");
                    break; 
                }
                break;
        }
    }

    closeUpgrades() {
        this.upgradeButtons = [];
        upgradeMenuOpened = false;
    }

}
