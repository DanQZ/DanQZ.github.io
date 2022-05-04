class UIButton {
	constructor(buttonImage, imageName, buttonType, buttonTypeType){
		
		this.timesActivated = 0;
		this.buttonImage = buttonImage;
		this.pos = [0,0];
		this.imageName = imageName;
		this.width = buttonImage.naturalWidth;
		this.height = buttonImage.naturalHeight;
		this.buttonType = buttonType;
		this.buttonTypeType = buttonTypeType;
	}
	
	Activate(){
		this.timesActivated++;
		switch(this.buttonType){
			case "blank":
				break;
			case "upgrade": //upgrade
				upgradeTower(this, this.buttonTypeType); //buttonTypeType is upgradeType, selectedTower is towerType
				break;
			case "tower": //menu and shit
				if(money >= towerMenuCosts[this.buttonTypeType-1])
					buyNewTower(this, this.buttonTypeType);
				break;
		}
	}
}