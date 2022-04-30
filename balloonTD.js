/*
UPDATE LOG (2022)

Apr 18 v0.0.0: David's base
-base game, 1 path, hitscan towers

Apr 18 v0.0.1: Basic shit
-added placing towers
-added vector based direction
-added towers aim at closest enemy
-added projectile capability
-added new sprites
-added map checkpoints
-added more stats for towers/enemies/etc

Apr 19 v0.0.2: basic shit
-fix projectile pierce
-added tower footprints
-added UIButton 
-added +1 damage upgrade button
-fixed movement to actually let high speed enemies properly follow the map
-enemies now subtract lives and disappear instead of crashing the game when they reach the end
-enemies now add money when they die based on their maxHealth

Apr 22 v0.0.3: mostly back end improvements
-Towers now have a max range they can see enemies
-Selected tower now highlights which one you are upgrading
-Added more upgrade buttons and more functionality
-Added modular buttons/tower types/projectile info/upgrade stuff on the back end
-Draw() now draws images from references inside objects instead of checking for an object's existence and then drawing

Apr 23 v0.0.4 MENUS AND SHIT
-Tower menu in bottom left currently
-Clicking a tower from the menu shows up on cursor + highlighted
-Click again to place tower
-Clicking the map now closes all other menus except tower menu
-Clicking the map deselects towers
-Clicking a tower now shows its range

0.0.5 MORE MENUS AND SHIT
-When placing a tower, it will glow blue if placeable and glow red if not placeable
-bugtesting: when placing a tower, other towers will show the ground that you cannot place on
-Added upgrades to boomerang: double shot, infinite loop, bouncing, quad shot
-Added explosions
-Added triple shot, explosive, bouncing shot dart monkey
-Added a grid for buttons to be placed on (27 available, 3x9 on the right side of screen)
-Tower menu + upgrades now auto align on grid

Apr 25 v0.0.6 Fixes + cannon
-Fixed menu bugs
-Fixed explosions not hitting enemies correctly
-Added cannon
-Added cannon frag and cluster bomb upgrades
-Some temporary aesthetic color changes
-Added money and lives counter
-Added tower costs

Apr 26 v0.0.7
-Added enemy health bars
-Fixed bouncing boomerang for >1 hp enemies
-Cannon damage upgrade now works properly
-Enemies now move slower the lower hp they have

*/

let lives;
let money;

let mousePos;

let canvas, ctx;
let mapBackground, balloon, dartChimp;
let frame;
let enemies, towers;
let map;
let mapWidth;
let mapHeight;
let enemiesSpawned;
let damageDone;

let towerHovering;
let towerHoveringImage;
let placeableTower;
let invalidGround;
//let rangeCircle;

let buttonArrayCoords;
let buttonSize;

let selectedTower;
let upgradeButtons;
let upgradeMenuOpened;

let towerMenuButtons;
let towerMenuImages;
let numberOfTowerTypes;

let specialEffects;

let tempTower;

class UI{ //make this later
	constructor(){

		this.numberOfTowerTypes;
		this.towerMenuButtons = [];
		this.upgradeMenuButtons = [];
		this.upgradesVisible = false;
		this.buttonArrayCoords = [];
		this.buttonSize = 100;
	
	}

	Update(){

	}

}

function findDistance(pos1, pos2){

	return Math.sqrt(Math.pow((pos2[0]-pos1[0]),2) + Math.pow(pos2[1]-pos1[1],2));

}

function findDirection(start, target){
	
	let temp = [target[0] - start[0], target[1] - start[1]];
	let scale = findDistance(start, target);
	temp[0]/=scale;
	temp[1]/=scale;
	return temp;
}

function buyNewTower(parentButton, towerType){
	towerHovering = towerType;
	towerHoveringImage = towerMenuImages[towerType-1];
}

function upgradeTower(parentButton, upgradeType){

	switch(selectedTower.towerType){
		case 1:// dart
			switch(upgradeType){
				case 1: //+1 pierce
					selectedTower.pierce += 1;
					selectedTower.pierceLevel+=1;
					break;
				case 2: //+1 damage
					selectedTower.damage +=1;
					selectedTower.damageLevel +=1;
					break;
				case 3: //+10% attack speed
					selectedTower.attacksPerSecond *= 1.1;
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
				case 7: //activate explosive darts
					selectedTower.range *= 1.1;
					selectedTower.rangeLevel += 1;
					break;
			}
			break;
		case 2://boomerang
			switch(upgradeType){
				case 1: //+1 pierce
					selectedTower.pierce += 1;
					selectedTower.pierceLevel+=1;
					break;
				case 2: //+1 damage
					selectedTower.damage +=1;
					selectedTower.damageLevel +=1;
					break;
				case 3: //+10% attack speed
					selectedTower.attacksPerSecond *= 1.1;
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
			switch(upgradeType){
				case 1: //x1.1 range
					selectedTower.range *= 1.1;
					selectedTower.rangeLevel+=1;
					break;
				case 2: //+1 damage
					selectedTower.explosionDamage +=1;
					selectedTower.explosionDamageLevel += 1;
					break;
				case 3: //+10% attack speed
					selectedTower.attacksPerSecond *= 1.1;
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
	}
	
	updateUpgrades();
}

function updateUpgrades(){
	closeUpgrades();
	showUpgrades();
}

/*
function closeButton(UIButton){ //not sure if this is necessary
	switch(UIButton.buttonType){
		case "upgrade":
			for(let i = 0; i < upgradeButtons.length; i++){
				if(upgradeButtons[i].buttonTypeType == UIButton.buttonTypeType){
					upgradeButtons.splice(i,1);
					break;
				}
			}
			break;
		case "tower":
			
			break;
	}
}
*/
	
class MapCheckpoints {
    constructor(){
		this.checkPoints = [
		[0,100],
		[400,150],
		[500, 100],
		[600, 200],
		[650, 300],
		[700, 500],
		[1000, 700],
		[500, 600],
		[400, 400],
		[500, 200],
		[100, 400],
		];
	}
}

function killEnemy(enemyIndex){
	money += enemies[enemyIndex].killValue;
	enemies.splice(enemyIndex,1);
}

function damageEnemy(enemyIndex, damageAmount){
	enemies[enemyIndex].health -= damageAmount;
	if(enemies[enemyIndex].health <= 0){
		killEnemy(enemyIndex);
	}
}


function ClosestEnemyIndex(sourcePos){
	let minIndex = 0;
	let minDist = Infinity;
	for (let i = 0; i < enemies.length; i++){
		let distance = findDistance(sourcePos, enemies[i].pos);
		if(distance < minDist){
			minDist = distance;
			minIndex = i;
		}
	}
	return minIndex;
}
	
function ClosestEnemyDistance(sourcePos){
	if(enemies.length == 0){
		return Infinity;
	}
	return findDistance(sourcePos, enemies[ClosestEnemyIndex(sourcePos)].pos);
}

function ClosestEnemyDirection(sourcePos){
	if(enemies.length != 0)
		return findDirection(sourcePos, enemies[ClosestEnemyIndex(sourcePos)].pos);
	else
		return -1;
}	
	
function enemyInRange(tower){

	for (let i = 0; i < enemies.length; i++){
 		let distance = findDistance(tower.pos, enemies[i].pos);
  		if(distance <= (tower.range + enemies[i].radius/2) ){
			return true;
  		}
	}
	
	return false;
	
}

function enemyCollision(projectile){
	if(enemies.length == 0)
		return;
		//this part checks for the closest enemy to the projectile, that it has not already damaged
	let minIndex = 0;
	let minDist = Infinity;
	for (let i = 0; i < enemies.length; i++){ //this checks for the closest enemy to the projectile
		let distance = findDistance(projectile.pos, enemies[i].pos);
		if(distance < minDist){//a closer enemy has been found
			let alreadyHit = false;
			for(let et = 0; et < projectile.enemiesTouched.length; et++){ //check if it has already hit this enemy
				if(enemies[i].ID == projectile.enemiesTouched[et]){ //if enemy ID is not within enemiesTouched ID array
		  			alreadyHit = true;
					break;
				}
			}
			if(!alreadyHit){
			minDist = distance;
		  	minIndex = i;
			}
  		}
	}
	if(projectile.radius + enemies[minIndex].radius >= minDist){//if the hitboxes touch, do damage, add ID to enemiesTouched ID array
		projectile.enemiesTouched.push(enemies[minIndex].ID);
		damageEnemy(minIndex, projectile.damage);
		damageDone += projectile.damage;
		projectile.pierce--;
		if(projectile.pierce <= 0){ //if the projectile is out of pierce
			projectile.isDead = true;;
			return;
		}
	}
}

function Init(){
	//canvas shit
	canvas = document.getElementById("c");
	canvas.height = 900;
	canvas.width = 1600;
	ctx = canvas.getContext("2d");
	canvas.oncontextmenu = ()=>{return false};
	
	//always displayed game info
	lives = 100;
	money = 50000;
	
	//keeping track of shit
	damageDone = 0;
	enemiesSpawned = 0;
	frame = 0;
	
	//map shit
	map = new MapCheckpoints();
	mapBackground = new Image();
	mapBackground.src = "assets/map.png";
	
	//special effects
	specialEffects = [];
	explosionImage = new Image();
	explosionImage.src = "assets/explosionImageCircle.png";
	
	//enemies
	enemies = []; 
	balloon = new Image();
	balloon.src = "assets/fiveyearold.png";
	healthBar = new Image();
	healthBar.src = "assets/healthBar.png";
	healthBarBackground = new Image();
	healthBarBackground.src = "assets/healthBarBackground.png";
	
	//temporary shit
	tempBullet = new Image();
	tempBullet.src = "assets/bullet.png";
	
	
	//-----------------------------------------------TOWER + MENU SHIT BELOW--------------------------------------------------------------
	
	towers = [];
	numberOfTowerTypes = 3;
	UIPathClosed = new Image();
	UIPathClosed.src = "assets/pathClosed.png";
	
	//tower info and shit
	towerHovering = -1;
	rangeCircle = new Image();
	rangeCircle.src = "assets/rangeCircle.png";
	selectionGlow = new Image();
	selectionGlow.src = "assets/selectionCircle.png";
	invalidGlowImage = new Image();
	invalidGlowImage.src = "assets/invalidCircle.png";
	invalidGround = new Image();
	invalidGround.src = "assets/invalidGround.png";
	
	//dart chimp
	dartChimp = new Image();
	dartChimp.src = "assets/vinny50x50.png";
	
	UI1PierceImage = new Image();
	UI1PierceImage.src = "assets/UI+1Pierce.png";
	UI1DamageImage = new Image();
	UI1DamageImage.src = "assets/UI+1Damage.png";
	UI1AtkSpdImage = new Image();
	UI1AtkSpdImage.src = "assets/UI+1AtkSpd.png";
	UI10RangeImage = new Image();
	UI10RangeImage.src = "assets/10RangeButton.png";
	
	UITripleShotImage = new Image();
	UITripleShotImage.src = "assets/tripleShotButton.png";
	UIBorderBounceImage = new Image();
	UIBorderBounceImage.src = "assets/borderBounceButton.png";
	UIExplodingImage = new Image();
	UIExplodingImage.src = "assets/explodingDartButton.png";
	
	//boomerang
	boomerangChimp = new Image();
	boomerangChimp.src = "assets/jackson70x70.png";
	boomerang = new Image();
	boomerang.src = "assets/boomerang.png";
	
	UIDoubleRangImage = new Image();
	UIDoubleRangImage.src = "assets/doubleRangButton.png";
	UIInfiniteRangImage = new Image();
	UIInfiniteRangImage.src = "assets/infiniteRangButton.png";
	UIBouncingRangImage = new Image();
	UIBouncingRangImage.src = "assets/bouncingRangButton.png";
	UIQuadraRangImage = new Image();
	UIQuadraRangImage.src = "assets/quadraRangButton.png";

	//cannon
	cannonSprite = new Image();
	cannonSprite.src = "assets/declan70x70.png";
	bombSprite = new Image();
	bombSprite.src = "assets/bombSprite.png";
	UIFragBombsImage = new Image();
	UIFragBombsImage.src = "assets/fragBombButton.png";
	UIClusterBombsImage = new Image();
	UIClusterBombsImage.src = "assets/clusterBombButton.png";


	//---------------------------------------------END OF TOWER SHIT--------------------------------------------



	//menu shit
	
	buttonArrayCoords = [];
	buttonSize = 100;
	
	for(let y = 0; y < 9; y++){
		for(let x = 0; x < 3; x++){
			buttonArrayCoords[3*y + x] = [canvas.width - x * buttonSize - buttonSize/2, y * buttonSize + buttonSize/2];
		}
	}
	
	upgradeButtons = [];
	towerMenuButtons = [];
	towerMenuCosts = [];
	
	whiteSquare = new Image();
	whiteSquare.src = "assets/whiteSquare100x100.png";

	for(let i = 0; i < numberOfTowerTypes; i++){
		towerMenuButtons.push(new UIButton(whiteSquare, "tower " + (i+1) + " button", "tower", i+1)); //keep i+1 as tower type starts at i
		//I have no clue why this code does not work, but it does not for some reason.
		//	towerMenuButtons.push(new UIButton(whiteSquare, [whiteSquare.naturalWidth/2 + 100*i], "tower " + i + " button", "tower", 1));	
	}
	for(let i = 0; i < numberOfTowerTypes; i++){
		towerMenuButtons[i].pos = buttonArrayCoords[i];
	}
	
	towerMenuImages = [
		dartChimp,      //1
		boomerangChimp, //2
		cannonSprite    //3
	];

	towerMenuCosts = [
		100, //dart
		250, //boomerang
		500 //bomb
	];



	//event shit	
	mapWidth = canvas.width - buttonSize*3;
	mapHeight = canvas.height;
	canvas.onmousedown = Click;
	canvas.onmousemove = MouseMove;
	
	setInterval( () => { Update(); Draw();}, 16);
}

function closestMenuButtonTo(){
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

function mouseOverMenuButton(){
	
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

function closestUpgradeButtonTo(mousePos){
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

function mouseOverUpgradeButton(){
	
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

function closestTowerTo(pos){
	let minDist = Infinity;
	let minIndex = -1;
	for(let i = 0; i < towers.length; i++){
		let distance = findDistance(pos, towers[i].pos);
		if(distance < minDist){
			minIndex = i;
			minDist = distance;
		}
	}
	if(minIndex == -1){
		return -1;
	}
	return towers[minIndex];
}

function mouseOverTower(){
	let closestTower = closestTowerTo(mousePos);
	if(closestTower == -1){
		return false;
	}
	let distanceToMouse = findDistance(closestTower.pos, mousePos);
	if(distanceToMouse < closestTower.radius)
		return true;
	return false;
}

function canPlaceTower(){
	
	if(isOffMap(mousePos))
		return false;
	
	let minDist = Infinity;
	let minIndex = -1;
	for(let i = 0; i < towers.length; i++){
		let distance = findDistance(mousePos, towers[i].pos); 
		if(distance < minDist){
			minIndex = i;
			minDist = distance;
		}
	}
	if(minIndex == -1){
		return true;
	}
	if(towers[minIndex].radius + tempTower.radius < minDist){
		return true;
	}
	return false;
}

function showUpgrades(){//temporary showupgrade method, will make a more modular one later
	
	upgradeMenuOpened = true;
	switch(selectedTower.towerType){
		case 1://dart 
			upgradeButtons.push(new UIButton(UI1PierceImage, "+1 Pierce button", "upgrade", 1));
			upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
			upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));
			upgradeButtons.push(new UIButton(UI10RangeImage, "+10% range button", "upgrade", 7));
		
			if(!selectedTower.tripleShot)
				upgradeButtons.push(new UIButton(UITripleShotImage, "triple shot button", "upgrade", 4));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));

			if(!selectedTower.borderBounce)
				upgradeButtons.push(new UIButton(UIBorderBounceImage, "border bounce button", "upgrade", 5));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
			
			if(!selectedTower.explosive)
				upgradeButtons.push(new UIButton(UIExplodingImage, "explosive darts button", "upgrade", 6));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
			
			break;
			
		case 2: //boomerang
			upgradeButtons.push(new UIButton(UI1PierceImage, "+1 Pierce button", "upgrade", 1));
			upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
			upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));
			
			if(!selectedTower.doubleRang){
				upgradeButtons.push(new UIButton(UIDoubleRangImage, "double rang button", "upgrade", 4));
			}
			else{
				if(!selectedTower.quadraRang)
					upgradeButtons.push(new UIButton(UIQuadraRangImage, "quadra rang button", "upgrade", 7));
				else
					upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
			}
			
			if(!selectedTower.bouncing)
				upgradeButtons.push(new UIButton(UIBouncingRangImage, "bouncing rang button", "upgrade", 5));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
			
			if(!selectedTower.infiniteLoop)
				upgradeButtons.push(new UIButton(UIInfiniteRangImage, "infinite loop rang button", "upgrade", 6));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "UIPathClosed", "blank", -1));

			break;
		case 3: //cannon
			upgradeButtons.push(new UIButton(UI10RangeImage, "+1 Range button", "upgrade", 1));
			upgradeButtons.push(new UIButton(UI1DamageImage, "+1 Damage button", "upgrade", 2));
			upgradeButtons.push(new UIButton(UI1AtkSpdImage, "+1 AtkSpd button", "upgrade", 3));
			
			if(!selectedTower.fragBomb)
				upgradeButtons.push(new UIButton(UIFragBombsImage, "frag bomb button", "upgrade", 4)) ;
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
			
			if(!selectedTower.clusterBomb)
				upgradeButtons.push(new UIButton(UIClusterBombsImage, "cluster bomb button", "upgrade", 5));
			else
				upgradeButtons.push(new UIButton(UIPathClosed, "pathClosed", "blank", -1));
		
		}
	
	for(let i = 0; i < upgradeButtons.length; i++){
		upgradeButtons[i].pos = buttonArrayCoords[buttonArrayCoords.length - i - 1];
	}
}

function closeUpgrades(){
	upgradeButtons = [];
	upgradeMenuOpened = false;
}

function clickMenu(){
	closeUpgrades();
	selectedTower = null;
	let closestMenuButton = closestMenuButtonTo(mousePos);
	closestMenuButton.Activate();
	tempTower = new Tower(towerHovering);
}

function placeTower(){
	closeUpgrades();
	money -= towerMenuCosts[tempTower.towerType-1];
	tempTower = null;
	selectedTower = null;
	towers.push(new Tower(towerHovering, mousePos));
	towerHovering = -1;
}

function clickTower(){
	closeUpgrades();
	tempTower = null;
	selectedTower = closestTowerTo(mousePos);
	showUpgrades();
}

function Click(e){
	let mousePos = [e.offsetX, e.offsetY];
	switch(e.button){
		case 0: //left click
			
			if(mouseOverMenuButton()){//mouse is over tower menu button
				clickMenu();
				return;
			}

			if(towerHovering != -1){//if a tower is currently selected from the buy menu
				if(canPlaceTower(mousePos)){//if clicked empty spot, close upgrade menus and place tower
					placeTower();
					return;
				}
			}
			
			if(upgradeMenuOpened){//if upgrade menu is open
				let closestUpgradeButton = closestUpgradeButtonTo(mousePos);
				if(closestUpgradeButton == -1){//if there are no buttons, close upgrade menu regardless
					tempTower = null;
					closeUpgrades();
				}
				if(mouseOverUpgradeButton(mousePos, closestUpgradeButton)){//if mouse is over a button, activate button
					tempTower = null;
					closestUpgradeButton.Activate();
					return;
				}
			}
			
			if(mouseOverTower()){
				clickTower();
				return;
			}
			
			//if mouse clicked nowhere important
			
			tempTower = null;
			towerHovering = -1;
			if(mousePos > canvas.width - buttonSize*3){//if mouse is over the menu side of the screen
				return;
			}
			selectedTower = null;
			closeUpgrades();
			
			break;

		case 1: //right click
			
			break;
	}
}

function isOffScreen(pos){
	let leniency = 3;
	if(pos[0] <= leniency || pos[0] >= canvas.width - leniency || pos[1] <= leniency || pos[1] >= canvas.height -leniency ){
		return true;
	}	
	return false;
}

function isOffMap(pos){
	let leniency = 3;
	if(pos[0] <= leniency || pos[0] >= mapWidth - leniency || pos[1] <= leniency || pos[1] >= mapHeight -leniency ){
		return true;
	}	
	return false;
}

function MouseMove(e){
	mousePos = [e.offsetX, e.offsetY];
	if(isOffScreen(mousePos)){
		towerHovering = -1;
		tempTower = null;
	}
}

function Update(){
    
	frame++;

    if (frame % 10 == 0 && enemiesSpawned < Infinity){
        enemies.push(new Enemy("Balloon " + frame, 3, 2, 20));
		enemiesSpawned++;
    }
	
    for(let i = 0; i < enemies.length; i++){
        enemies[i].Update();
        if(enemies[i].isDead){
			killEnemy(i);
        }
    }
	
    for(let i = 0; i < towers.length; i++){
		towers[i].Update();
    }
	
	for(let i = 0; i < specialEffects.length; i++){
		specialEffects[i].Update();
		if(specialEffects[i].isDead){
			specialEffects.splice(i,1);
			i--;
		}
	}
}

function drawUIButton(UIButton){
	let image = UIButton.buttonImage;
	ctx.drawImage(image, UIButton.pos[0]-image.naturalWidth/2, UIButton.pos[1]-image.naturalHeight/2);
}

function Draw(){
	
    ctx.drawImage(mapBackground, 0, 0);

/*  // to tint the image, draw it first
    x.drawImage(fg,0,0);

    //then set the global alpha to the amound that you want to tint it, and draw the buffer directly on top of it.
    x.globalAlpha = 0.5;
    x.drawImage(buffer,0,0);
*/
	
	for(let i = enemies.length-1; i >= 0; i--){ //draw enemies
		ctx.drawImage(balloon, enemies[i].pos[0]- balloon.naturalWidth/2, enemies[i].pos[1]-balloon.naturalHeight/2);
	}
	for(let i = enemies.length-1; i >= 0; i--){ //draw enemy health bars
		ctx.drawImage(healthBarBackground, enemies[i].pos[0]- balloon.naturalWidth/2, enemies[i].pos[1]-balloon.naturalHeight/2, enemies[i].image.naturalWidth, 2);
		ctx.drawImage(healthBar, enemies[i].pos[0]- balloon.naturalWidth/2, enemies[i].pos[1]-balloon.naturalHeight/2, 
		(enemies[i].health/enemies[i].maxHealth)*enemies[i].image.naturalWidth, 2);
	}	

	if(selectedTower != null){ //draw selection outline + range circle
		let range = selectedTower.range;
		let diameter = range*2;
		ctx.drawImage(rangeCircle, selectedTower.pos[0] - range, selectedTower.pos[1] - range, diameter, diameter);
		ctx.drawImage(selectionGlow, selectedTower.pos[0]-selectionGlow.naturalWidth/2, selectedTower.pos[1]-selectionGlow.naturalHeight/2);
	}
	
	for(let i = 0; i < towers.length; i++){ //draw projectiles of towers
	    	for(let p = 0; p < towers[i].projectiles.length; p++){
	    		let projectile = towers[i].projectiles[p];
	    		let image = towers[i].projectiles[p].image;
	    		ctx.drawImage(image, projectile.pos[0]-image.naturalWidth/2, projectile.pos[1]-image.naturalHeight/2);
	    	}
	}
	
	for(let i = 0; i < towers.length; i++){ //draw towers
		let image = towers[i].image;
		ctx.drawImage(image, towers[i].pos[0] - image.naturalWidth/2, towers[i].pos[1] - image.naturalHeight/2);
	}
	
	for(let i = 0; i < specialEffects.length; i++){ //draw effects
		let radius = specialEffects[i].range;
		let diameter = radius*2;
		let image = specialEffects[i].image;
		ctx.drawImage(image, specialEffects[i].pos[0] - radius, specialEffects[i].pos[1] - radius, diameter, diameter);
	}
	
	if(towerHovering != -1){//draw tower hovering below mouse, show relevant info
		let range = tempTower.range;
		let diameter = range*2;
		
		//bugtesting code
		/*for(let i = 0; i < towers.length; i++){
			let invalidGroundDiameter = towers[i].radius*2 + tempTower.radius*2;
			ctx.drawImage(invalidGround, towers[i].pos[0] - towers[i].radius*2, towers[i].pos[1] - towers[i].radius*2, invalidGroundDiameter, invalidGroundDiameter);
		}*/
		
		if(canPlaceTower()){
			ctx.drawImage(selectionGlow, mousePos[0]-selectionGlow.naturalWidth/2, mousePos[1]-selectionGlow.naturalHeight/2);
		}
		else{
			ctx.drawImage(invalidGlowImage, mousePos[0]-invalidGlowImage.naturalWidth/2, mousePos[1]-invalidGlowImage.naturalHeight/2);
		}
		ctx.drawImage(towerHoveringImage, mousePos[0] - towerHoveringImage.naturalWidth/2, mousePos[1] - towerHoveringImage.naturalHeight/2);
		ctx.drawImage(rangeCircle, mousePos[0] - range, mousePos[1] - range, diameter, diameter);
	}

	ctx.fillRect(canvas.width - buttonSize*3, 0, buttonSize*3, canvas.height);
		
	if(upgradeMenuOpened){ //draw upgrade menu buttons
		for(let i = 0; i < upgradeButtons.length; i++){
			drawUIButton(upgradeButtons[i]);
		}
	}
	//draw tower menu
	for(let i = 0; i < numberOfTowerTypes; i++){
		let background = towerMenuButtons[i];
		let towerImage = towerMenuImages[i];
		drawUIButton(towerMenuButtons[i]);
		ctx.drawImage(towerImage, (background.pos[0] - towerImage.naturalWidth/2), (background.pos[1]-towerImage.naturalHeight/2), towerImage.naturalWidth, towerImage.naturalHeight);
	}

	ctx.font = '30px sans-serif';

	ctx.fillStyle = 'white';
	ctx.strokeStyle = 'blue';
	
	for(let i = 0; i < numberOfTowerTypes; i++){
		ctx.fillText("$" + towerMenuCosts[i], buttonArrayCoords[i][0] - buttonSize/2, buttonArrayCoords[i][1] + buttonSize/2);
		ctx.strokeText("$" + towerMenuCosts[i], buttonArrayCoords[i][0] - buttonSize/2, buttonArrayCoords[i][1] + buttonSize/2);
	}

	ctx.fillStyle = 'orange';
	ctx.fillText("lives: " + lives, 10, 25);
	ctx.fillText("money: " + money, 10, 50);
	
}

document.body.onload = Init;