class enemySpawn {

    constructor() {
        this.enemyArray = [];

        //enemy: (ID, HP, SPEED, RADIUS)
        let defaultRed = ["Default Red " + frame, 5, 2, 20, 4];
        let tankyBlue = ["Tanky Blue " + frame, 10, 1, 30, 10];
        let fastYellow = ["Fast Yellow " + frame, 5, 5, 10, 20];
        this.enemyArray.push(defaultRed, tankyBlue, fastYellow);
    }

    SpawnPattern(type, interval) {
        let frameDiff = frame%interval;
        for (let i = 0; i < this.enemyArray.length; i++) {
            if (frame-frameDiff % interval == 0) {
                enemies.push(this.enemyArray[type]);
            }
        }
    }

    Update() {
        for (let i = 0; i < this.enemyArray.length; i++) {
            if (frame % this.enemyArray[i][4] == 0) {
                enemiesSpawned++;
                console.log("hi I'm a new enemy");
                enemies.push(new Enemy(this.enemyArray[i][0] + frame, this.enemyArray[i][1], this.enemyArray[i][2], this.enemyArray[i][3]));
            }
        }
    }



}