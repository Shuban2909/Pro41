class Game {
  constructor() {
      
  }
  getState() {
   var gameStateRef  = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }
  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    player1 = createSprite(200, 500);
    player1.addImage("player1", player_img);

    player2 = createSprite(800, 500);
    player2.addImage("player2", player_img);
    players = [player1, player2];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
   // player.fruitNumber();
    
    image(back_img, 0, 0, 1000, 800);
    var x = 100;
    var y = 200;
    var index = 0;
    drawSprites();
    for (var plr in allPlayers) {
      index = index + 1;
      x = 500 - allPlayers[plr].distance;
      y = 500;

      players[index - 1].x = x;
      players[index - 1].y = y;

      if (index === player.index) {
        //add code to display the player's name on the respective basket.
        stroke("black");
        fill("red");
        text(allPlayers[plr].name, x - 25, y + 25);
        text(allPlayers.player1.name+":"+sc,100,20);
        text(allPlayers.player2.name+":"+sco,100,60);
        // text(allPlayers[plr].name +":"+allPlayers[plr].SCORE, 70, 30);
      }
      //in 61 and 62 write text for both players on the screen 
      //console.log("player1"+allPlayers.player1.SCORE);
    }

    if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
      player.distance -= 10;
      player.update();
    }
    if (keyIsDown(LEFT_ARROW) && player.index !== null) {
      player.distance += 10;
      player.update();
    }

    if (frameCount % 20 === 0) {
      fruits = createSprite(random(100, 1000), 0, 100, 100);
      fruits.velocityY = 6;
      var rand = Math.round(random(1, 5));
      switch (rand) {
        case 1:
          fruits.addImage("fruit1", fruit1_img);
          break;
        case 2:
          fruits.addImage("fruit1", fruit2_img);
          break;
        case 3:
          fruits.addImage("fruit1", fruit3_img);
          break;
        case 4:
          fruits.addImage("fruit1", fruit4_img);
          break;
        case 5:
          fruits.addImage("fruit1", fruit5_img);
          break;
      }
      fruitGroup.add(fruits);
    }

    if (player.index !== null) {
      for (var i = 0; i < fruitGroup.length; i++) {
        //players= 0 player1 and 1 player2 
        if (fruitGroup.get(i).isTouching(players)) {
          console.log(players);
          if(fruitGroup.get(i).isTouching(players[0])){
            console.log("player11");
            sc=sc+1;
            console.log(player.name);
            player.Player1Sc(sc);
            //text(allPlayers.player1.name+":"+sc,100,20);
          }
          else{
            console.log("player22");
            sco=sco+1;
            player.Player2Sc(sco);           
            //text(allPlayers.player2.name+":"+sco,100,60);
          }

          fruitGroup.get(i).destroy();
          // player.SCORE=player.SCORE+1;
          // console.log(player.SCORE);
          // player.update();
        }
      }
    
    }
    if(player.sc==20 || player.sco==20){
      end();
   }
  }

  end() {
    text("Game Ended",100,200);
    console.log("Game Ended");
    //fruitGroup.destroy();
  }
}