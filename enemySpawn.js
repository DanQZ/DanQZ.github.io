class enemySpawn
{
    constructor()
    {
        this.enemyArray=[];
        let defaultRed=["Default Red ",5,2,20,4];
        let tankyBlue=["Tanky Blue ",10,1,30,10];
        let fastYellow=["Fast Yellow ",5,5,10,20];
        this.enemyArray.push(defaultRed,tankyBlue,fastYellow);
    }
    Update()
    {
        for(let i=0;i<this.enemyArray.length;i++)
        {
            if(frame%this.enemyArray[i][4]==0)
            {
                enemiesSpawned++;
                console.log("hi");
                enemies.push(new Enemy(this.enemyArray[i][0]+frame,this.enemyArray[i][1],this.enemyArray[i][2],this.enemyArray[i][3]))
            }
        }
    }

}