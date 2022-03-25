/*
this class defines the controller that is handling any request regarding a game
#create a game: /game POST
#pull a game status: /game GET
#join an existing game: /game PUT
 */

package com.jhu.Clueless.controller;

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
    */
   @RequestMapping(value="/game", produces="application/json")
   @PostMapping
   public String createGame(@RequestParam(value="userId") String userId, @RequestParam(value="gameType") Integer gameType, @RequestParam(value="userCount") Integer userCount) {
      JsonObject gameObject = new JsonObject();
      gameObject.addProperty("gameId",99);
      gameObject.addProperty("gameType",0);
      gameObject.addProperty("userCount",1);
      gameObject.addProperty("Message","success");

      return gameObject.toString();

   }

}
