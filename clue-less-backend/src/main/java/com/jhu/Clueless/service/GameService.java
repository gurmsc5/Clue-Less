/*
this class provides the functions that are required to play a game
 */

package com.jhu.Clueless.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class GameService {

   public static Integer createNewGame(String userId, int gameType, int userCount) {
      Random rand = new Random();
      int gameId = rand.nextInt(1000);
      return gameId;

   }



}
