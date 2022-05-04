class UI { //make this later
    /*constructor(){

        this.numberOfTowerTypes;
        this.towerMenuButtons = [];
        this.upgradeMenuButtons = [];
        this.upgradesVisible = false;
        this.buttonArrayCoords = [];
        this.buttonSize = 100;
	
    }

    Update(){

    }
*/

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

    clickMenu(){
        this.closeUpgrades();
        selectedTower = null;
        let closestMenuButton = this.closestMenuButtonTo(mousePos);
        closestMenuButton.Activate();
        tempTower = new Tower(towerHovering);
    }
    

    buyNewTower(parentButton, towerType) {
        towerHovering = towerType;
        towerHoveringImage = towerMenuImages[towerType - 1];
    }

    placeTower() {
        this.closeUpgrades();
        money -= towerMenuCosts[tempTower.towerType - 1];
        tempTower = null;
        selectedTower = null;
        towers.push(new Tower(towerHovering, mousePos));
        towerHovering = -1;
    }

    closestMenuButtonTo(){
        let minDist = Infinity;
        let minIndex = -1;
        for(let i = 0; i < towerMenuButtons.length; i++){
            let distance = findDistance(mousePos, towerMenuButtons[i].pos);
            if(distance < minDist){
                minIndex = i;
                minDist = distance;
            }
        }
        if(minIndex == -1){
            return -1;
        }
        return towerMenuButtons[minIndex];
    }
    
    mouseOverMenuButton(){
        
        for(let i = 0; i < towerMenuButtons.length; i++){
            let UIButton = towerMenuButtons[i];
            let xLower = UIButton.pos[0] - UIButton.buttonImage.width/2;
            let xUpper = UIButton.pos[0] + UIButton.buttonImage.width/2;
            let yLower = UIButton.pos[1] - UIButton.buttonImage.height/2;
            let yUpper = UIButton.pos[1] + UIButton.buttonImage.height/2;
            let inXBounds = (mousePos[0] > xLower && mousePos[0] < xUpper);
            let inYBounds = (mousePos[1] > yLower && mousePos[1] < yUpper);
            
            if(inXBounds && inYBounds){
                return true;
            }
        }
        return false;
    }
    
    closestUpgradeButtonTo(mousePos){
        let minDist = Infinity;
        let minIndex = -1;
        for(let i = 0; i < upgradeButtons.length; i++){
            let distance = findDistance(mousePos, upgradeButtons[i].pos);
            if(distance < minDist){
                minIndex = i;
                minDist = distance;
            }
        }
        if(minIndex == -1){
            return -1;
        }
        return upgradeButtons[minIndex];
    }
    
    mouseOverUpgradeButton(){
        
        for(let i = 0; i < upgradeButtons.length; i++){
            let UIButton = upgradeButtons[i];
            let xLower = UIButton.pos[0] - UIButton.width/2;
            let xUpper = UIButton.pos[0] + UIButton.width/2;
            let yLower = UIButton.pos[1] - UIButton.height/2;
            let yUpper = UIButton.pos[1] + UIButton.height/2;
            let inXBounds = (mousePos[0] > xLower && mousePos[0] < xUpper);
            let inYBounds = (mousePos[1] > yLower && mousePos[1] < yUpper);
            
            if(inXBounds && inYBounds){
                return true;
            }
        }
        return false;
    }
    showUpgrades() {//temporary showupgrade method, will make a more modular one later

        upgradeMenuOpened = true;
        switch (selectedTower.towerType) {
            case 1://dart 
                upgradeButtons.push(new UIButton(UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
                upgradeButtons.push(new UIButton(UI1AtkSpdImage, "1.1x AtkSpd button", "upgrade", 3));
                upgradeButtons.push(new UIButton(UI10RangeImage, "+10% range button", "upgrade", 7));

                if (!selectedTower.tripleShot)
                    upgradeButtons.push(new UIButton(UITripleShotImage, "triple shot button", "upgrade", 4));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.borderBounce)
                    upgradeButtons.push(new UIButton(UIBorderBounceImage, "border bounce button", "upgrade", 5));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.explosive)
                    upgradeButtons.push(new UIButton(UIExplodingImage, "explosive darts button", "upgrade", 6));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

                break;

            case 2: //boomerang
                upgradeButtons.push(new UIButton(UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
                upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));

                if (!selectedTower.doubleRang) {
                    upgradeButtons.push(new UIButton(UIDoubleRangImage, "double rang button", "upgrade", 4));
                }
                else {
                    if (!selectedTower.quadraRang)
                        upgradeButtons.push(new UIButton(UIQuadraRangImage, "quadra rang button", "upgrade", 7));
                    else
                        upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
                }

                if (!selectedTower.bouncing)
                    upgradeButtons.push(new UIButton(UIBouncingRangImage, "bouncing rang button", "upgrade", 5));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.infiniteLoop)
                    upgradeButtons.push(new UIButton(UIInfiniteRangImage, "infinite loop rang button", "upgrade", 6));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "UIPathClosed", "blank", -1));

                break;
            case 3: //cannon
                upgradeButtons.push(new UIButton(UI10RangeImage, "+1 Range button", "upgrade", 1));
                upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
                upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));

                if (!selectedTower.fragBomb)
                    upgradeButtons.push(new UIButton(UIFragBombsImage, "frag bomb button", "upgrade", 4));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

                if (!selectedTower.clusterBomb)
                    upgradeButtons.push(new UIButton(UIClusterBombsImage, "cluster bomb button", "upgrade", 5));
                else
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
                break;
            case 4: //tack
                upgradeButtons.push(new UIButton(UI1PierceImage, "+1 Pierce button", "upgrade", 1));
                upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
                upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));
                upgradeButtons.push(new UIButton(UI1TacksImage, "+1 tacks button", "upgrade", 6));

                if (!selectedTower.ringOfFire && !selectedTower.radiation) {
                    upgradeButtons.push(new UIButton(UIRingOfFireImage, "ring of fire button", "upgrade", 4));
                    upgradeButtons.push(new UIButton(UIRadiationImage, "radiation button", "upgrade", 5));
                }
                else {
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
                    upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
                }

                break;
        }

        for (let i = 0; i < upgradeButtons.length; i++) {
            upgradeButtons[i].pos = buttonArrayCoords[buttonArrayCoords.length - i - 1];
        }
    }

    closeUpgrades() {
        upgradeButtons = [];
        upgradeMenuOpened = false;
    }

}
