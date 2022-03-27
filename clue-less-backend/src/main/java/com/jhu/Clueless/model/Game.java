package com.jhu.Clueless.model;

import java.util.*;

public class Game {
   int gameId;
   int size;         // number of Players in this Game session (# of characters, not the active users)
   ArrayList<Integer> userList;
   HashMap<String, Player> playerList;
   HashMap<Integer, String> userToPlayerMap;
   CardEnvelope cardFile;
   HashMap<String, ArrayList<Card>> cardDistribution;    // card in each Player's hand
   ArrayList<Room> Rooms;
   ArrayList<Hallway> Hallways;
   Turn turn;
   private static final ArrayList<String> fullPlayerList = new ArrayList<>(Arrays.asList("Miss Scarlet", "Professor Plum", "Mr. Green", "Mrs. White", "Mrs. Peacock", "Colonel Mustard"));
   private static final HashMap<String, String> colorMap = new HashMap<>() {{
      put("Miss Scarlet", "red");
      put("Professor Plum", "purple");
      put("Mr. Green", "green");
      put("Mrs. White", "white");
      put("Mrs. Peacock", "blue");
      put("Colonel Mustard", "yellow");
   }};

   // constructor
   public Game(int gameId, int size) {
      this.gameId = gameId;
      this.size = size;
      this.userList = new ArrayList<Integer>();

      // initialize the Player/character
      this.playerList = new HashMap<>();
      for (int i=0; i<size; i++) {
         Player tempPlayer = new Player(fullPlayerList.get(i), 2, colorMap.get(fullPlayerList.get(i)));
         playerList.put(fullPlayerList.get(i), tempPlayer);
      }

      // initialize userToPlayerMap
      this.userToPlayerMap = new HashMap<>();

      // build the turn
      this.turn = new Turn(size);

      // initialize all Card objects
      ArrayList<Card> suspectCardList = Card.initialSuspect();
      ArrayList<Card> weaponCardList = Card.initialWeapon();
      ArrayList<Card> roomCardList = Card.initialRoom();
      Collections.shuffle(suspectCardList);
      Collections.shuffle(weaponCardList);
      Collections.shuffle(roomCardList);

      // build the confidential card envelope
      this.cardFile = new CardEnvelope(suspectCardList.get(0), weaponCardList.get(0), roomCardList.get(0));
      suspectCardList.remove(0);
      weaponCardList.remove(0);
      roomCardList.remove(0);

      // distribute the remaining cards
      ArrayList<Card> fullCardList = new ArrayList<>();
      fullCardList.addAll(suspectCardList);
      fullCardList.addAll(weaponCardList);
      fullCardList.addAll(roomCardList);
      Collections.shuffle(fullCardList);

      while(fullCardList.size() != 0) {
         String player = turn.getTurn();
         Card item = fullCardList.get(0);
         playerList.get(player).buildCardInHand(item);
         fullCardList.remove(0);
         turn.nextTurn();
      }

      // build card in hand distribution
      for(String player : playerList.keySet()) {
         cardDistribution.put(player, playerList.get(player).showCardInHand());
      }

      // initialize Rooms

      // initialize Hallways

      // Assign each Player to its initial Room

      // turn the Turn back to Miss Scarlet
      while(!turn.isMyTurn("Miss Scarlet")) {
         turn.nextTurn();
      }
   }

   /*
   this method return the available character name(playerName) as a List of String
    */
   public ArrayList<String> availablePlayer() {
      ArrayList<String> result = new ArrayList<>();

      for (String player : playerList.keySet()) {
         // if the playerName has not been bound to any userId
         if (!userToPlayerMap.containsValue(player)) {
            result.add(player);
         }
      }
      return result;
   }

   /*
   this method is called when a user is joining this game
    */
   public int userJoin(int userId) {
      userList.add(userId);
      System.out.println("User: " + userId + "joined Game: " + gameId + "!");
      return gameId;
   }

   /*
   this method binds a userId to a specific character(Player)
    */
   public void userSelectPlayer(int userId, String playerName) {
      if (availablePlayer().contains(playerName)) {
         userToPlayerMap.put(userId, playerName);
      }
   }



}
