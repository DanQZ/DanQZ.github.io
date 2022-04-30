class cannonFragShot {

    //	constructor(ID, pos, damage, pierce, direction, speed, radius, lifeSpan){
        constructor(parent){
            
            this.parent = parent;
            this.birthFrame = frame;
            //this.ID = parent.ID + " frag " + this.birthFrame;
            
            this.isDead = false;
            this.enemiesTouched = [""];
    
            this.image = tempBullet;
            let posX = parent.pos[0];
            let posY = parent.pos[1];
            this.initPos = [posX, posY];
            this.pos = [posX, posY];
            
            this.damage = parent.explosionDamage/2;
            this.maxPierce = 1;
            this.pierce = 1;
            let dirX = parent.direction[0];
            let dirY = parent.direction[1];
            this.initDir = [dirX, dirY];
            this.direction = [dirX, dirY];
            this.speed = 15;
            this.radius = 5;
            this.lifespan = this.birthFrame + 30;
        
        }
        
        Move(){
            
            this.pos[0] += this.direction[0]*this.speed;
            this.pos[1] += this.direction[1]*this.speed;
            
        }
        
        Update(){
            
            //checks if it's gone far past the canvas borders
            if(isOffMap(this.pos)){
                this.isDead = true;
                return;
            }
            
            if(frame >= this.lifespan){ //projectile has run out of lifetime
                this.isDead = true;
            }
            
            enemyCollision(this);
         
            this.Move();
        }
    }