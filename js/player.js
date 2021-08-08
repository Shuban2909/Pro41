class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        //this.SCORE = 0;

    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            
        });
    }

    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    Player1Sc(score1){
        var player1SCORERef = database.ref("Score1");
        player1SCORERef.set({
            Score1:score1,
        })
         
    }

    Player2Sc(score2){
       var player2SCORERef = database.ref("Score2");
       player2SCORERef.set({
        Score2:score2,
    })



    
}
}
