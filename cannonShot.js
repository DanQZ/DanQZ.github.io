class cannonShot {

    //	constructor(ID, pos, damage, pierce, direction, speed, radius, lifeSpan){
        constructor(parent){
            
            this.damageType = "force";

            this.parent = parent;
            this.birthFrame = frame;
            this.ID = parent.ID + " bomb " + this.birthFrame;
            
            this.isDead = false;
            this.enemiesTouched = [""];
    
            this.image = bombSprite;
            this.pos = [parent.pos[0], parent.pos[1]];
            
            this.damage = 0;
            this.explosionDamage = parent.explosionDamage;
            this.explosionRadius = parent.explosionRadius;

            this.maxPierce = parent.pierce;
            this.pierce = parent.pierce;
            this.direction = [parent.direction[0], parent.direction[1]];
            this.speed = parent.bombSpeed;
            this.radius = parent.bombRadius;
            this.lifespan = this.birthFrame + parent.bombLifespan;
            
            this.fragBomb = parent.fragBomb;
            this.fragCount = parent.fragCount;
            this.clusterBomb = parent.clusterBomb;
            this.babyBomb = false;
            this.guidedMissile = parent.guidedMissile;
        }
        
        Move(){
            this.pos[0] += this.direction[0]*this.speed;
            this.pos[1] += this.direction[1]*this.speed;
        }

        Frag(){
            let random = Math.random()* 3;
            for(let i = 0; i < this.fragCount; i++){
                    
                let directionInRads = (2*Math.PI / this.fragCount * i) + random;

                this.direction[0] = Math.cos(directionInRads);
                this.direction[1] = Math.sin(directionInRads);
                
                this.parent.projectiles.push(new cannonFragShot(this));
            }
        }

        DeployCluster(){
            let random = Math.random()* 3;
            for(let i = 0; i < 6; i++){
                        
                let directionInRads = (2*Math.PI / 6 * i) + random;
                this.direction[0] = Math.cos(directionInRads);
                this.direction[1] = Math.sin(directionInRads);
                
                let baby = new cannonShot(this.parent);
                baby.babyBomb = true;
                baby.clusterBomb = false;
                baby.pos = [this.pos[0], this.pos[1]];
                baby.direction = [this.direction[0], this.direction[1]];
                baby.damage = this.explosionDamage;
                baby.lifespan = frame + 13;
                baby.explosionRadius = this.explosionRadius*0.75;
                baby.speed *= 0.75;
                this.parent.projectiles.push(baby);
            }
        }

        Explode(){
            specialEffects.push(new explosion([this.pos[0],this.pos[1]], this.explosionRadius, this.explosionDamage)); //100 radius 1 dmg explosion

            if(!this.babyBomb && this.clusterBomb){
                this.DeployCluster();
            }

            if(this.fragBomb && !this.clusterBomb){ //frags do explosionDamage damage, with 1 pierce each, lifespan = bombLifespan
                this.Frag();
            }
        }
        
        Update(){
            
            if(this.babyBomb){//if the bomb is a baby of a cluster bomb
                if(this.lifespan > frame){
                    this.Move();
                    return;
                }
                this.isDead = true;
                this.Explode();
                return;
            }

            //checks if it's gone far past the canvas borders

            if(this.pos[0] <= 10 || this.pos[0] >= mapWidth - 10 || this.pos[1] <= 10 || this.pos[1] >= mapHeight - 10 ){ //custom leniency bc need to keep frags
                this.isDead = true;
            }
            
            if(frame >= this.lifespan){ //projectile has run out of lifetime
                this.isDead = true;
            }
            
            enemyCollision(this);

            if(this.isDead){
                this.Explode();
                return;
            }
            this.Move();
        }
    }