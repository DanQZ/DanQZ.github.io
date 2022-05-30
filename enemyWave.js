class enemyWave{

    constructor(){

        this.enemyArray = [];

        //enemy: (ID, HP, SPEED, RADIUS)
        let defaultRed = ["Default Red " + frame, 5, 2, 20, 4];
        let tankyBlue = ["Tanky Blue " + frame, 10, 1, 30, 10];
        let fastYellow = ["Fast Yellow " + frame, 3, 5, 10, 20];
        this.enemyArray.push(defaultRed, tankyBlue, fastYellow);

        this.level1 = new enemySpawn(0, 30, 5, this);
        level1.Spawn();

    }

    startWave(wave){
        //do stuff using enemy spawns and intervals between spawns
    }

}