/*
this class provides the functions that are required to play a game
it preserves all active Game objects in memory
(we should consider to move these Game information to database, so that we don't need to keep all of them in memory and we have persistent storage)
 */

package com.jhu.Clueless.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class GameService {


   public static Integer createNewGame(String userId, int gameType, int userCount, int size) {
      Random rand = new Random();
      int gameId = rand.nextInt(1000);
      return gameId;

   }



}
