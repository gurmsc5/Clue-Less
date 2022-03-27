/*
use a Hashmap to keep mapping between gameId and the corresponding Game object
 */

package com.jhu.Clueless.model;

import java.util.HashMap;

public class GameList {
   private static GameList gameListInstance;
   private HashMap<Integer, Game> gameMap;

   // constructor
   private GameList() {
      initialize();
   }

   public static synchronized GameList getInstance() {
      if (gameListInstance == null) {
         gameListInstance = new GameList();
      }
      return gameListInstance;
   }

   private void initialize() {
      gameMap = new HashMap<Integer, Game>();
   }

   // add a Game session into the GameList
   public int addGame(Game game) {
      gameMap.put(game.gameId, game);
      return game.gameId;
   }

   // remove a Game session from the GameList
   public int removeGame(int gameId) {
      gameMap.remove(gameId);
      return gameId;
   }

   // get the target Game object with gameId
   public Game getGame(int gameId) {
      return gameMap.get(gameId);
   }





}
