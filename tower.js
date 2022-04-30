class Tower {
    constructor(towerType, pos){
		this.price;
		this.pos = pos;
		this.towerType = towerType;
		this.radius;
		this.projectiles = [];
		this.upgradePrices = [];
		
		switch(this.towerType){
			case 1: //dart
				this.ID = "Dartchimp " + frame;
				this.image = dartChimp;
				
				this.attacksPerSecond;
				this.damage;
				this.pierce;
				this.cooldown = 60;
				this.direction = 0;
				
				//base stats
				this.damage = 1;
				this.pierce = 1;
				this.attacksPerSecond = 1;
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
				
				this.pierceInitPrice = 50;
				this.atkSpeedInitPrice = 50;
				this.damageInitPrice = 100;
				
				this.tripleShot = false; //triple shot
				this.borderBounce = false; //bounce off borders
				this.explosive = false; //explode at end
				
				this.tripleShotInitPrice = 500;
				this.borderBounceInitPrice = 500;
				this.explosiveInitPrice = 500;
				/*
				this.upgradePrices = [
					this.piercePrice,
					this.atkSpeedPrice,
					this.damagePrice,
				];
				*/
				break;
				
			case 2: //boomerang
			
				this.ID = "Boomerang " + frame;
				this.image = boomerangChimp;
				
				this.attacksPerSecond;
				this.damage;
				this.pierce;
				this.cooldown = 60;
				this.direction = 0;
				
				//base stats
				this.attacksPerSecond = .75;
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

				this.piercePrice = 50*this.pierceLevel;
				this.atkSpeedPrice = 50*this.atkSpeedLevel;
				this.damagePrice = 100*this.damageLevel;
/*
				this.upgradePrices = [
					this.piercePrice * this.pierceLevel,
					this.atkSpeedPrice,
					this.damagePrice,
				];
*/
				this.doubleRangPrice = 300*(this.pierceLevel*this.damageLevel*this.atkSpeedLevel*.9);
				this.bouncingPrice = 1500;
				this.infiniteLoopPrice = 3000;
				this.quadraRangPrice = 3000;
				
				break;
			case 3: //cannon
				this.ID = "Cannon " + frame;
				this.image = cannonSprite;
				this.cooldown = 60;

				//base stats
				this.attacksPerSecond = .5;
				this.damage = 0;
				this.explosionDamage = 1;
				this.pierce = 1;
				this.radius = 35;
				this.range = 250;

				//proj stats
				this.bombRadius = 0;
				this.explosionRadius = 50;
				this.bombSpeed = 10;
				this.bombLifespan = 90;

				//upgrades
				this.pierceLevel = 1;
				this.atkSpeedLevel = 1;
				this.damageLevel = 1;
				this.explosionDamageLevel = 1;
				
				this.piercePrice = 50;
				this.atkSpeedPrice = 50;
				this.damagePrice = 100;

				this.fragBomb = false;
				this.clusterBomb = false;

				this.fragCount = 8;

				this.guidedMissile = false;

				this.fragBombPrice = 50;
				this.clusterBombPrice = 50;
				this.guidedMissilePrice = 100;

				break;

			case 4:

				break;
		}
    }
	
	Attack(){

		switch(this.towerType){
		
			case 1: //dart
				this.direction = ClosestEnemyDirection(this.pos);
				this.cooldown = 60/(this.attacksPerSecond * Math.pow(1.1, this.atkSpeedLevel));
				
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
				this.direction = ClosestEnemyDirection(this.pos);
				this.cooldown = 60/(this.attacksPerSecond * Math.pow(1.1, this.atkSpeedLevel));
				
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
				this.direction = ClosestEnemyDirection(this.pos);
				this.cooldown = 60/(this.attacksPerSecond * Math.pow(1.1, this.atkSpeedLevel));
				
				this.projectiles.push(new cannonShot(this));
				break;

			case 4:
				break;
		}
		    		
	}
	
	Update(){
		switch(this.towerType){
			case 1: //dart
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(enemyInRange(this)){
						this.Attack();	
					}
				}
				this.UpdateProjectiles();
				break;		
			case 2: //boomerang
			
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(enemyInRange(this)){
						this.Attack();	
					}
				}

				this.UpdateProjectiles();
				break;
			case 3: //cannon
				this.cooldown--;
				if(this.cooldown <= 0 && enemies.length != 0){
					if(enemyInRange(this)){
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