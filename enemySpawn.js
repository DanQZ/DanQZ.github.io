class enemySpawn {

    constructor(type, amount, perSecond, parent) {
        this.type = type;
        this.amount = amount;
        this.perSecond = perSecond;
        this.parent = parent;
        this.nextWaveTimer;
    }

    Spawn() {
        let interval = 60/this.perSecond;
        let frameDiff = frame % interval;
        for (let i = 0; i < this.amount; i++) {
            if (frame - frameDiff % interval == 0) {
                enemies.push(new Enemy(parent.enemyArray[this.type][0] + frame, parent.enemyArray[this.type][1], parent.enemyArray[this.type][2], parent.enemyArray[this.type][3]));
            }
        }
    }
/*
    Update() {
        for (let i = 0; i < this.enemyArray.length; i++) {
            if (frame % this.enemyArray[i][4] == 0) {
                enemiesSpawned++;
                console.log("hi I'm a new enemy");
                enemies.push(new Enemy(parent.enemyArray[i][0] + frame, parent.enemyArray[i][1], parent.enemyArray[i][2], parent.enemyArray[i][3]));
            }
        }
    }
*/


}