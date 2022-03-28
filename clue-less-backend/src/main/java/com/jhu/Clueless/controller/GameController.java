/*
this class defines the controller that is handling any request regarding a game
#create a game: /game POST
#pull a game status: /game GET
#join an existing game: /game PUT
 */

package com.jhu.Clueless.controller;

import com.jhu.Clueless.model.Game;
import com.jhu.Clueless.model.GameList;
import com.jhu.Clueless.service.GameService;
import org.springframework.web.bind.annotation.*;
import com.google.gson.*;

import java.util.ArrayList;
import java.util.Set;

@RestController
public class GameController {

   /*
   this method handle the create game POST request
   @param userId: identify the user that initiates the new game creation
   @param gameType: identify the game to be a (single player game: 0) or (multiple player game: 1)
   @param userCount: identify the number of active players in this game. single player game requires this filed to be 1
   @param size: identify the total number of players in the game. range[3,6]
    */
   @RequestMapping(value="/game", produces="application/json")
   @PostMapping
   public String createGame(@RequestParam(value="userId") String userId, @RequestParam(value="gameType") Integer gameType, @RequestParam(value="userCount") Integer userCount, @RequestParam(value="size") Integer size) {
      JsonObject gameObject = new JsonObject();
      int gameId = GameService.createNewGame(userId, gameType, userCount, size);
      gameObject.addProperty("gameId",gameId);
      gameObject.addProperty("gameType",gameType);
      gameObject.addProperty("userCount",userCount);
      gameObject.addProperty("size",size);
      gameObject.addProperty("Message","success");

      return gameObject.toString();

   }

   /*
   this method handle the join game PUT request
   @param userId: identify the user that tries to join the game
   @param gameId: identify the target gameId the user tries to join
   @param character: identify the target suspect/character the user tries to control
    */
   @RequestMapping(value="/joingame/{gameId}", produces="application/json")
   @PutMapping
   public String joinGame(@PathVariable(value="gameId") int gameId, @RequestParam(value="userId") String userId, @RequestParam(value="character") String playerName) {
      JsonObject joinObject = new JsonObject();
      if (!GameList.getInstance().isGameExist(gameId)){
         joinObject.addProperty("Error","The target game session does not exist!");
         joinObject.addProperty("Message","fail");
         joinObject.addProperty("Status",500);
         return joinObject.toString();
      }

      Game targetGame = GameList.getInstance().getGame(gameId);
      if (!targetGame.availablePlayer().contains(playerName)) {
         joinObject.addProperty("Error","The target suspect is selected by other user!");
         joinObject.addProperty("Message","fail");
         joinObject.addProperty("Status",500);
         return joinObject.toString();
      }
      if (targetGame.userJoin(userId)) {
         targetGame.userSelectPlayer(userId, playerName);
         joinObject.addProperty("gameId",gameId);
         joinObject.addProperty("activeUserCount",targetGame.activeUserCount());
         joinObject.addProperty("size",targetGame.getSize());
         joinObject.addProperty("Message","success");
         joinObject.addProperty("Status",200);
      }
      else {
         joinObject.addProperty("Error","userId already in the game or already reach the maximum allowed users count");
         joinObject.addProperty("Message","fail");
         joinObject.addProperty("Status",500);
      }

      return joinObject.toString();
   }

   /*
   this method handle the GET request to display a game lobby
   @param gameId: identify the target gameId the user tries to view game lobby
   this method will return::
   # activeUserList: all active Users in this game:: (comma separate value)
   # activeUserCount: active Users count in this game
   # availableSusPool: available Character/Suspect pool in this game
   # size: size of the game
   # maxUserAllowed: maximum allowed Users in this game
    */

   @RequestMapping(value="/lobby/{gameId}", produces="application/json")
   @GetMapping
   public String viewGameLobby(@PathVariable(value="gameId") int gameId) {
      JsonObject joinObject = new JsonObject();
      JsonArray playerArray = new JsonArray();

      if (!GameList.getInstance().isGameExist(gameId)){
         joinObject.addProperty("Error","The target game session does not exist!");
         joinObject.addProperty("Message","fail");
         joinObject.addProperty("Status",500);
         return joinObject.toString();
      }

      Game targetGame = GameList.getInstance().getGame(gameId);
      String availableSusPool = String.join(",",targetGame.availablePlayer());
      String activeUserList = String.join(",",targetGame.getUserList());
      ArrayList<String> playerList = targetGame.getPlayerList();
      int id = 1;
      for (String player : playerList) {
         JsonObject playerObject = new JsonObject();
         playerObject.addProperty("id",id);
         playerObject.addProperty("name",player);
         if (availableSusPool.contains(player)) {
            playerObject.addProperty("isAvailable",true);
         }
         else {
            playerObject.addProperty("isAvailable",false);
         }
         playerArray.add(playerObject);
         id ++;
      }


      joinObject.addProperty("activeUserList",activeUserList);
      joinObject.addProperty("activeUserCount",targetGame.activeUserCount());
      joinObject.addProperty("availableSusPool",availableSusPool);
      joinObject.add("Players", playerArray);
      joinObject.addProperty("size",targetGame.getSize());
      joinObject.addProperty("maxUserAllowed",targetGame.getUserAllowed());
      joinObject.addProperty("Message","success");
      joinObject.addProperty("Status",200);

      return joinObject.toString();
   }




}
