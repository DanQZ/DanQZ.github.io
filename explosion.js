class explosion {
	
	constructor(pos, range, damage){
		
		this.image = explosionImage;
		this.birthFrame = frame;
		this.lifespan = this.birthFrame + 10;
		
		this.pos = pos;
		this.range = range;
		this.damage = damage;
		this.isDead = false;

		this.listOfEnemiesInRange = [];
		
		for(let i = 0; i < enemies.length; i++){
			if(findDistance(this.pos, enemies[i].pos) <= this.range + enemies[i].radius){
				this.listOfEnemiesInRange.push(i);
			}
		}

		for(let i = this.listOfEnemiesInRange.length-1; i >= 0; i--){
			damageEnemy(this.listOfEnemiesInRange[i], this.damage);
		}
	}
	
	Update(){
		if(frame > this.lifespan){
			this.isDead = true;
		}
	}
	
}