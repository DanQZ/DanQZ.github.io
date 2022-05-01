class boomerangShot {

	constructor(parent, throwingArm){
	
		this.damageType = "sharp";

		this.parent = parent;
		this.birthFrame = frame;
		if(throwingArm == 0){
			this.ID = "boomerang" + this.birthFrame;
		}
		if(throwingArm == 1){
			this.ID = "reverse boomerang" + this.birthFrame;
		}
		this.image = boomerang;
		
		this.bouncing = parent.bouncing;
		this.hasHitEnemy;
		this.infiniteLoop = parent.infiniteLoop;
		
		this.isDead = false;
		this.turning = 0;
		this.enemiesTouched = [""];
		
		let tempPosX = parent.pos[0];
		let tempPosY = parent.pos[1];
		this.initPos = [tempPosX, tempPosY];
		this.pos = [tempPosX, tempPosY];
		this.distanceToParent;
		
		this.damage = parent.damage;
		this.maxPierce = parent.pierce;
		this.pierce = parent.pierce;
		this.initDirection = parent.direction;
		
		let tempDirection = [];
		tempDirection[0] = parent.direction[0];
		tempDirection[1] = parent.direction[1];
		this.direction = tempDirection;
		this.speed = parent.rangSpeed;
		this.radius = parent.rangRadius;
		
		this.throwingArm = throwingArm;
		this.tempFrame;
	}

	ClosestUntouchedEnemyIndex(){ //modified closestEnemyIndex
		let minIndex = 0;
		let minDist = Infinity;
		
		for (let i = 0; i < enemies.length; i++){//for each enemy
			let untouched = true;
			let distance = findDistance(this.pos, enemies[i].pos);
			if(distance < minDist){ //if it's closer than listed closest
				for(let et = 0; et < this.enemiesTouched.length; et++){ //for each enemy touched id
					if(enemies[i].ID == this.enemiesTouched[et]){ //if ID match, don't replace listed closest 
						untouched = false;
						break;
					}
				}
				if(untouched){
					minDist = distance;
					minIndex = i;
				}
			}
		}

		return minIndex;
	}

	ClosestUntouchedEnemyDirection(){ //modified closestEnemyDirection
		if(enemies.length != 0)
			return findDirection(this.pos, enemies[this.ClosestUntouchedEnemyIndex()].pos);
		else
			return -1;
	}

	ClosestUntouchedEnemyDistance(){
		if(enemies.length != 0)
			return findDistance(this.pos, enemies[this.ClosestUntouchedEnemyIndex()].pos);
		else
			return Infinity;
	}

	Move(){
	
		if(this.bouncing && this.maxPierce != this.pierce){
			let minIndex = this.ClosestUntouchedEnemyIndex();
			if(minIndex == -1){
				this.dead = true;
				return;
			}
			if(findDistance(this.pos, enemies[minIndex].pos) > this.parent.range){
				this.isDead = true;
				return;
			}
			this.direction = findDirection(this.pos, enemies[minIndex].pos);
			if(this.direction == -1){
				this.isDead = true;
				return;
			}
		}
		
		if(this.distanceToParent > this.parent.range*.75 && this.turning == 1){
			
			let turnStrength = 10;//lower = tighter turning
			
			let tempXasdf;
			let tempYasdf;
			
			if(this.throwingArm == 0){
				tempXasdf = this.direction[1];
				tempYasdf = -this.direction[0];
			}
			if(this.throwingArm == 1){
				tempXasdf = -this.direction[1];
				tempYasdf = this.direction[0];
			}
			
			tempXasdf /= turnStrength;
			tempYasdf /= turnStrength;
			
			let scale = findDistance([0,0], [this.direction[0] + tempXasdf, this.direction[1] + tempYasdf]);
			
			this.direction[0] += tempXasdf;
			this.direction[1] += tempYasdf;
			
			this.direction[0] /= scale;
			this.direction[1] /= scale;
			
		}
		
		this.pos[0] += this.direction[0]*this.speed;
		this.pos[1] += this.direction[1]*this.speed;
	}
	
	Update(){
		
		//somehow make the image rotate here
		
		this.distanceToParent = findDistance(this.pos, this.parent.pos);
		
		if(this.turning == 0 && this.distanceToParent > this.parent.range*.5 && (!this.bouncing || this.maxPierce == this.pierce)){//when the boomerang turns around, it can hit the same enemies again
			this.turning = 1;
			this.enemiesTouched = [""];
		}
		
		if(this.turning == 1 && this.distanceToParent < 35 && !this.infiniteLoop){
			this.isDead = true;
		}
		
		enemyCollision(this);
		
		this.Move();
		
	}
}