class Enemy {
    constructor(ID, hp, speed, radius){
        this.ID = ID;
		this.image = balloon;
		this.maxHealth = hp;
		this.health = hp;
        this.speed = speed;
      	this.radius = radius;
		
		this.killValue = this.maxHealth;
		
		this.pos = [map.checkPoints[0][0], map.checkPoints[0][1]];
		this.targetCheckpoint = 1;
		this.direction = findDirection(this.pos, map.checkPoints[this.targetCheckpoint]);

		this.passedXDest = false;
		this.passedYDest = false;

		this.white = false; //immune to slows
		this.black = false; //immune to force
		this.lead = false; //immune to sharp
		this.purple = false; //immune to heat
		this.armored = false; //half damage from !force attacks

		this.frozen = false;
		this.stunned = false;
		this.slowed = false;
		this.onFire = false;

		this.isDead = false;
		
		this.targetX = map.checkPoints[this.targetCheckpoint][0];
		this.targetY = map.checkPoints[this.targetCheckpoint][1];
		
	}

    Move(){
	
		let percentage = (1 - .5*(1 - this.health/this.maxHealth)); //up to -50% speed
		this.pos[1] += this.direction[1]*this.speed * percentage;
		this.pos[0] += this.direction[0]*this.speed * percentage;
		
    }
	
	Update(){
		this.Move();
		
		if(this.direction[0] > 0){
			if(this.pos[0] > this.targetX){
				this.passedXDest = true;
			}
		}
		else{
			if(this.pos[0] < this.targetX){
				this.passedXDest = true;
			}
		}
		
		if(this.direction[1] > 0){
			if(this.pos[1] > this.targetY){
				this.passedYDest = true;
			}
		}
		else{
			if(this.pos[1] < this.targetY){
				this.passedYDest = true;
			}
		}
		
		if(this.passedXDest && this.passedYDest){
			let tempPos = [];
			tempPos[0] = map.checkPoints[this.targetCheckpoint][0];
			tempPos[1] = map.checkPoints[this.targetCheckpoint][1];
			this.pos = tempPos;
			this.targetCheckpoint++;
			
			if(this.targetCheckpoint >= map.checkPoints.length){
				if(!this.isDead){
					money -= this.killValue;
					lives -= this.maxHealth;
				}
				this.isDead = true;
				return;
			}
			
			this.targetX = map.checkPoints[this.targetCheckpoint][0];
			this.targetY = map.checkPoints[this.targetCheckpoint][1];
			this.passedXDest = false;
			this.passedYDest = false;
			this.direction = findDirection(this.pos, map.checkPoints[this.targetCheckpoint]);
		}
		
		if(this.health <= 0){
        	this.isDead = true;
			money += this.maxHealth;
			return;
		}
	}
}
