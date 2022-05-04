class basicShot {

    //	constructor(ID, pos, damage, pierce, direction, speed, radius, lifeSpan){
        constructor(parent){
            
            this.damageType = "sharp";

            this.parent = parent;
            this.birthFrame = frame;
            this.ID = parent.ID + " dart" + this.birthFrame;
            
            this.isDead = false;
            this.enemiesTouched = [""];
    
            this.image = tempBullet;
            let tempPosX = parent.pos[0];
            let tempPosY = parent.pos[1];
            this.pos = [tempPosX, tempPosY];
            
            this.damage = parent.damage;
            this.maxPierce = parent.pierce;
            this.pierce = parent.pierce;
            this.direction = [parent.direction[0], parent.direction[1]];
            this.speed = parent.dartSpeed;
            this.radius = parent.dartRadius;
            this.lifeSpan = this.birthFrame + parent.dartLifespan;
            
            this.borderBounce = parent.borderBounce;
            this.maxBounces = 3;
            this.bounces = 0;
            this.explosive = parent.explosive;
        
        }
        
        Move(){
            
            this.pos[0] += this.direction[0]*this.speed;
            this.pos[1] += this.direction[1]*this.speed;
            
        }
        
        Update(){
            
            //checks if it's gone far past the canvas borders
            if(this.pos[0] < 0 || this.pos[0] > mapWidth|| this.pos[1] < 0|| this.pos[1] > mapHeight){
                
                if(!this.borderBounce){//if no border bounce, die
                    this.isDead = true;
                    return;
                }
                else{ //border bounce on, bounce
                    if (this.bounces < this.maxBounces){
                        if(this.pos[0] > mapWidth || this.pos[0] < 0){ // right/left of canvas
                            this.direction[0] = -this.direction[0];
                        }
                        if(this.pos[1] > mapHeight || this.pos[1] < 0){ // above/below canvas
                            this.direction[1] = -this.direction[1];
                        }
                        this.pos[0] += this.direction[0]*this.speed;
                        this.pos[1] += this.direction[1]*this.speed;
                        this.bounces++;
                    }
                    else{
                        this.isDead = true;
                        return;
                    }
                }	
            }
            
            if(frame >= this.lifeSpan && !this.borderBounce){ //projectile has run out of lifetime
                this.isDead = true;
            }
            
            enemyCollision(this);

            if(this.explosive && (this.pierce <= 0 || this.isDead)){
                specialEffects.push(new explosion([this.pos[0],this.pos[1]], 25, 1)); //30 radius 1 dmg explosion
                return;
            }

            this.Move();
        }
    }