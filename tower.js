class Tower {
    constructor(towerType, pos){
		this.price;
		this.pos = pos;
		this.towerType = towerType;
		this.radius;
		this.projectiles = [];
		this.upgradePrice = [];
		
		switch(this.towerType){
			case 1: //dart
				this.ID = "Dartchimp " + frame;
				this.image = dartChimp;
				
				this.APS;
				this.damage;
				this.pierce;
				this.cooldown = 60;
				this.direction = [1,0];
				
				//base stats
				this.damage = 1;
				this.pierce = 1;
				this.APS = 1;
				this.radius = 25
				this.range = 150;
				
				//projectile base stats
				this.dartRadius = 5;
				this.dartLifespan = 60;
				this.dartSpeed = 10;
				
				//upgrades
				this.pierceLevel = 1;
				this.atkSpeedLevel = 1;
				this.damageLevel = 1;
				this.rangeLevel = 1;

				this.upgradePrice[1] = 50; //pierce
				this.upgradePrice[2] = 50; //atkSpeed
				this.upgradePrice[3] = 100; //damage
				this.upgradePrice[7] = 50; //range
				
				this.tripleShot = false; //triple shot
				this.borderBounce = false; //bounce off borders
				this.explosive = false; //explode at end
				

				this.upgradePrice[4]=500;//triple shot
				this.upgradePrice[5]=500;//border bounce
				this.upgradePrice[6]=500;//explosive
				
				break;
				
			case 2: //boomerang
			
				this.ID = "Boomerang " + frame;
				this.image = boomerangChimp;
				
				this.APS;
				this.damage;
				this.pierce;
				this.cooldown = 60;
				this.direction = [1,0];
				
				//base stats
				this.APS = .75;
				this.damage = 1;
				this.pierce = 5;
				this.radius = 30;
				this.range = 250;
				
				//projectile base stats
				this.rangRadius = 15;
				this.rangSpeed = 10;
				this.rangLifespan = 180;
				
				//upgrades
				this.pierceLevel = 1;
				this.atkSpeedLevel = 1;
				this.damageLevel = 1;
				
				this.doubleRang = false; //double shot
				this.bouncing = false; //bouncing boomerang
				this.infiniteLoop = false; //infinite looping
				this.quadraRang = false; //quadra shot

				this.upgradePrice[1]=50;//pierce
				this.upgradePrice[2]=100;//dmg
				this.upgradePrice[3]=50;//atk spd

				this.upgradePrice[4]=300;//double rang
				this.upgradePrice[5]=1500;//bouncing
				this.upgradePrice[6]=3000;//infinite
				this.upgradePrice[7]=3000;//quadraRang
				
				break;
			case 3: //cannon
				this.ID = "Cannon " + frame;
				this.image = cannonSprite;
				this.cooldown = 60;
				this.direction = [1,0];

				//base stats
				this.APS = .5;
				this.damage = 0;
				this.explosionDamage = 1;
				this.pierce = 1;
				this.radius = 35;
				this.range = 250;

				//proj stats
				this.bombRadius = 0;
				this.explosionRadius = 50;
				this.bombSpeed = 10;
				this.bombLifespan = 60;

				//upgrades
				this.pierceLevel = 1;
				this.atkSpeedLevel = 1;
				this.damageLevel = 1;
				this.explosionDamageLevel = 1;
				
				//this.piercePrice = 50;
				//this.atkSpeedPrice = 50;
				//this.damagePrice = 100;

				this.upgradePrice[1]=50;//range
				this.upgradePrice[2]=50;//damage
				this.upgradePrice[3]=100;//atk speed

				this.fragBomb = false;
				this.clusterBomb = false;

				this.fragCount = 8;

				this.guidedMissile = false;

				//this.fragBombPrice = 50;
				//this.clusterBombPrice = 50;
				//this.guidedMissilePrice = 100;
				this.upgradePrice[4]=50;//frag
				this.upgradePrice[5]=50;//cluster

				break;

			case 4: //tack shooter
				this.ID = "tackShooter " + frame;
				this.image = tackShooterSprite;
				this.cooldown = 60;
				this.direction = [1,0];

				this.APS = 1;
				this.damage = 1;
				this.pierce = 1;
				this.range = 100;
				this.radius = 25;

				this.numOfTacks = 8;
				this.tackLifespan = 15;
				this.tackSpeed = 10;
				this.tackRadius = 5;

				this.pierceLevel = 1;
				this.atkSpeedLevel = 1;
				this.damageLevel = 1;
				this.numOfTacksLevel = 1;
				
				this.upgradePrice[1]=50;//pierce
				this.upgradePrice[2]=50;//damage
				this.upgradePrice[3]=100;//atk speed
				this.upgradePrice[6]=100;//+1 tacks per spray

				this.ringOfFire = false;
				this.radiation = false;
				
				this.upgradePrice[4]=1000;//ring of fire
				this.upgradePrice[5]=1000;//radiation


				break;
		}
    }
	
	Attack(){

		switch(this.towerType){
		
			case 1: //dart
				this.direction = this.TargetFirstDir();
				this.cooldown = 60/(this.APS * Math.pow(1.1, this.atkSpeedLevel));
				
				this.projectiles.push(new basicShot(this));
				
				if(this.tripleShot){
					
					let tightness = 5;
					let origDir = [this.direction[0], this.direction[1]];
					let tempXasdf;
					let tempYasdf;
					
					tempXasdf = this.direction[1]/tightness;
					tempYasdf = -this.direction[0]/tightness;
					let scale = findDistance([0,0], [this.direction[0] + tempXasdf, this.direction[1] + tempYasdf]);
					
					this.direction[0] += tempXasdf;
					this.direction[1] += tempYasdf;
					this.direction[0] /= scale;
					this.direction[1] /= scale;
					
					this.projectiles.push(new basicShot(this));
					this.direction = origDir;
					
					tempXasdf = -tempXasdf;
					tempYasdf = -tempYasdf;
					this.direction[0] += tempXasdf;
					this.direction[1] += tempYasdf;
					this.direction[0] /= scale;
					this.direction[1] /= scale;
					
					this.projectiles.push(new basicShot(this));
					this.direction = origDir;
					
				}
				break;
				
			case 2: //boomerang
				this.direction = this.TargetFirstDir();
				this.cooldown = 60/(this.APS * Math.pow(1.1, this.atkSpeedLevel));
				
				this.projectiles.push(new boomerangShot(this, 0));
				
				if(this.doubleRang){
					this.projectiles.push(new boomerangShot(this, 1));
				}
				if(this.quadraRang){
					let tempDir = [];
					tempDir[0] = this.direction[0];
					tempDir[1] = this.direction[1];
					this.direction[0] = -this.direction[0];
					this.direction[1] = -this.direction[1];
					this.projectiles.push(new boomerangShot(this, 0));
					this.projectiles.push(new boomerangShot(this, 1));
					this.direction = tempDir;
				}
					
				break;
			
			case 3: //cannon					
				this.direction = this.TargetFirstDir();
				this.cooldown = 60/(this.APS * Math.pow(1.1, this.atkSpeedLevel));
				
				this.projectiles.push(new cannonShot(this));
				break;

			case 4: //tack shooter

				if(this.radiation){
					
					let radShots = 1;
					this.cooldown = 60/(this.APS * Math.pow(1.1, this.atkSpeedLevel) * this.numOfTacks)  *2; //last number slows down shooting

					radShots = radShots/this.cooldown;
					
					if(radShots < 1)
						radShots = 1;
					
					for(let i = 0; i < radShots; i++){
						let random = Math.random() * 2*Math.PI;
						let directionInRads = (2*Math.PI / this.numOfTacks * i) + random;
						
						this.direction[0] = Math.cos(directionInRads);
						this.direction[1] = Math.sin(directionInRads);
						
						this.projectiles.push(new tackShot(this));
						
						this.direction = [0,1];
					}
					return;
				}

				this.cooldown = 60/(this.APS * Math.pow(1.1, this.atkSpeedLevel));

				if(this.ringOfFire){
					for(let i = 0; i < 8; i++){
						let directionInRads = (2*Math.PI / this.numOfTacks * i);
						this.direction[0] = Math.cos(directionInRads);
						this.direction[1] = Math.sin(directionInRads);
						let pos = [this.pos[0] + (this.direction[0] * this.range*.75), this.pos[1] + (this.direction[1] * this.range*.75)];
						specialEffects.push(new explosion(pos, 25, this.damage)); //pos range damage
					}
					return;
				}

				for(let i = 0; i < this.numOfTacks; i++){
						
					let directionInRads = (2*Math.PI / this.numOfTacks * i);
	
					this.direction[0] = Math.cos(directionInRads);
					this.direction[1] = Math.sin(directionInRads);
					
					this.projectiles.push(new tackShot(this));
				}
				this.direction = [0,1];

				break;
		}
		    		
	}


	TargetFirstDir(){ //CURRENTLY BROKEN FIX WHEN POSSIBLE
		let targets = [];
		let targetEnemy = null;
		let furthestCheckpointInRange = 0;

		for(let i = enemies.length-1; i >= 0; i--){ //add enemies in range + at furthest checkpoint

			//if enemy is at an earlier checkpoint than a previously checked enemy continue
			if(enemies.targetCheckpoint < furthestCheckpointInRange){continue;}

			//if enemy is out of range continue
			let distance = findDistance(this.pos, enemies[i].pos) - enemies[i].radius;
			if(distance > this.range){continue;}

			if(enemies[i].targetCheckpoint == furthestCheckpointInRange){ //enemy is in range + same target checkpoint
				targets.push(enemies[i]);
				continue;
			}

			if(enemies[i].targetCheckpoint > furthestCheckpointInRange){ //if enemy in range is at a further checkpoint than any prev enemy
				targets = []; //clear prev targets, replace with new targetcheckpoints
				targets.push(enemies[i]);
				furthestCheckpointInRange = enemies[i].targetCheckpoint;
			}
			
		}

		//targets[] = all enemies in range + farthest checkpoint.
		//targets[] is guaranteed to have enemies in the array, as Attack() requires EnemiesInRange() to trigger

		let minDistance = Infinity;
		for(let i = targets.length - 1; i >= 0; i--){ //closest enemy to the next checkpoint
			let distance = findDistance(targets[i].pos, [targets[i].targetX, targets[i].targetY]);
			if(distance < minDistance){
				targetEnemy = targets[i];
				minDistance = distance;
			}
		}

		return findDirection(this.pos, targetEnemy.pos);

	}
	/*
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
*/

	EnemyInRange(){
		
	for (let i = 0; i < enemies.length; i++){
		let distance = findDistance(this.pos, enemies[i].pos);
			if(distance <= (this.range + enemies[i].radius/2) ){
			return true;
			}
	}

	/* //this is a much better algo but is bugged, fix later!
	for(let x = 0; x < 2; x++){
		for (let i = 0; i < enemies.length/2; i++){
			let distance = findDistance(this.pos, enemies[x + i*2].pos);
			 if(distance <= (this.range + enemies[i].radius/2) ){
			   return true;
			 }
	   }
	}*/
	
	return false;
	
	}
	Update(){
		switch(this.towerType){
			case 1: //dart
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(this.EnemyInRange()){
						this.Attack();
					}
				}
				this.UpdateProjectiles();
				break;		
			case 2: //boomerang
			
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(this.EnemyInRange()){
						this.Attack();	
					}
				}

				this.UpdateProjectiles();
				break;
			case 3: //cannon
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(this.EnemyInRange()){
						this.Attack();	
					}
				}
				this.UpdateProjectiles();
				break;
			case 4:// tack shooter
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(this.EnemyInRange()){
						this.Attack();
					}
				}
				this.UpdateProjectiles();
				break;
        }
    }

	UpdateProjectiles(){
		for(let p = 0; p < this.projectiles.length; p++){

			this.projectiles[p].Update();
			
			if(this.projectiles[p].isDead){
				this.projectiles.splice(p,1);
				p--;
			}
		}
	}


}