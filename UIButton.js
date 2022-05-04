class UIButton {
	constructor(buttonImage, imageName, buttonType, buttonTypeType){
		
		this.timesActivated = 0;
		this.buttonImage = buttonImage;
		this.pos = [0,0];
		this.imageName = imageName;
		this.width = buttonImage.width;
		this.height = buttonImage.height;
		this.buttonType = buttonType;
		this.buttonTypeType = buttonTypeType;
	}
	
	Activate(){
		this.timesActivated++;
		switch(this.buttonType){
			case "blank":
				break;
			case "upgrade": //upgrade
				if(money >= selectedTower.upgradePrice[this.buttonTypeType]){
					UI.upgradeTower(this, this.buttonTypeType); //buttonTypeType is upgradeType, selectedTower is towerType
					money -= selectedTower.upgradePrice[this.buttonTypeType];
				}
				break;
			case "tower": //menu and shit
				if(money >= UI.towerMenuCosts[this.buttonTypeType-1])
					UI.buyNewTower(this, this.buttonTypeType);
				break;
		}
	}
}