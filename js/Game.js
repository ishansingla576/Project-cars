class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var PlayerCountRef = await database.ref('playerCount').once("value");
      if(PlayerCountRef.exists())
      {
        playerCount = PlayerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play()
  {
    form.hide();
    textSize(30);
    text("Game Start",120,100);
    Player.getPlayerInfo();
    if(allPlayers!==undefined)
    {
      var display_P = 130;
      for(var plr in allPlayers)
      {
         if(plr === "Player" + player.index)
         {
           fill("red");
         }
         else
         {
           fill("black");
         }

         display_P += 20;
         textSize(15);
         text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_P);
      }
      
    }
    if(keyDown("Up") && player.index !== null)
    {
      player.distance += 50;
      player.update();
    }
  }
}
