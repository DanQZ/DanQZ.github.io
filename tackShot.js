class tackShot {

    //	constructor(ID, pos, damage, pierce, direction, speed, radius, lifeSpan){
        constructor(parent){
            
            this.damageType = "sharp";

            this.parent = parent;
            this.birthFrame = frame;
            this.ID = parent.ID + " tack" + this.birthFrame;
            
            this.isDead = false;
            this.enemiesTouched = [""];
    
            this.image = tempBullet;
            this.pos = [parent.pos[0], parent.pos[1]];
            
            this.damage = parent.damage;
            this.maxPierce = parent.pierce;
            this.pierce = parent.pierce;
            this.direction = [parent.direction[0], parent.direction[1]];
            this.speed = parent.tackSpeed;
            this.radius = parent.tackRadius;
            this.lifespan = this.birthFrame + parent.tackLifespan;
        
        }
        
        Move(){
            
            this.pos[0] += this.direction[0]*this.speed;
            this.pos[1] += this.direction[1]*this.speed;
            
        }
        
        Update(){

            if(isOffMap(this.pos)){
                this.isDead = true;
            }
            
            if(frame >= this.lifespan){ //projectile has run out of lifetime
                this.isDead = true;
            }
            
            enemyCollision(this);

            this.Move();
        }
    }