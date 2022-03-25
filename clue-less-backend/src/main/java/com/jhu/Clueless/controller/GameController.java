/*
this class defines the controller that is handling any request regarding a game
#create a game: /game POST
#pull a game status: /game GET
#join an existing game: /game PUT
 */

package com.jhu.Clueless.controller;

import com.jhu.Clueless.service.GameService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.*;

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

}
