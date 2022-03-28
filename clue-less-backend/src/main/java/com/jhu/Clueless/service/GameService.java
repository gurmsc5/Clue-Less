/*
this class provides the functions that are required to play a game
it preserves all active Game objects in memory
(we should consider to move these Game information to database, so that we don't need to keep all of them in memory and we have persistent storage)
 */

package com.jhu.Clueless.service;

import com.jhu.Clueless.model.Game;
import com.jhu.Clueless.model.GameList;
import org.springframework.stereotype.Service;


@Service
public class GameService {


   /*
   create a game session with predefined gameId
   no userId is associated with this game session initially
   this method is used in the skeletal version where main service will always initialize a game session with gameId:999
    */
   public Integer createNewGame(int userCount, int size, int gameId) {
      Game newGame = new Game(userCount, gameId, size);
      GameList.getInstance().addGame(newGame);
      return gameId;
   }

}
