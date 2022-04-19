package com.jhu.Clueless.model;

import java.util.*;

public class Game {
   public int gameId;
   private int size;         // number of Players in this Game session (# of characters, not the active users)
   private int userAllowed;    // maximum number of human users accepted in the game session
   private ArrayList<String> userList;
   private Map<String, Player> playerList;
   private Map<String, String> userToPlayerMap;
   private CardEnvelope cardFile;
   private Map<String, ArrayList<Card>> cardDistribution;    // card in each Player's hand
   private ClueMap Map;
   private Map<String, Coordinates> playerLocation;    // map each Player name to Location key
   private Map<String, Boolean> hasMadeSuggestion;      // track each Player status in order to define the available action
   private Map<String, Boolean> hasMoved;      // track each Player move status
   public Turn turn;


   private static final ArrayList<String> fullPlayerList = new ArrayList<>(Arrays.asList("Miss Scarlet", "Professor Plum", "Mr. Green", "Mrs. White", "Mrs. Peacock", "Colonel Mustard"));
   private static final HashMap<String, String> colorMap = new HashMap<>() {{
      put("Miss Scarlet", "red");
      put("Professor Plum", "purple");
      put("Mr. Green", "green");
      put("Mrs. White", "white");
      put("Mrs. Peacock", "blue");
      put("Colonel Mustard", "yellow");
   }};
   private static final HashMap<String, Integer[]> iniLocation = new HashMap<>() {{
      put("Miss Scarlet", new Integer[] {3,4});
      put("Professor Plum", new Integer[] {0,3});
      put("Mr. Green", new Integer[] {1,0});
      put("Mrs. White", new Integer[] {3,0});
      put("Mrs. Peacock", new Integer[] {0,1});
      put("Colonel Mustard", new Integer[] {4,3});
   }};

   // constructor
   public Game(int userAllowed, int gameId, int size) {
      this.gameId = gameId;
      this.size = size;
      this.userList = new ArrayList<>();
      this.userAllowed = userAllowed;

      // initialize the Player/character
      this.playerList = new HashMap<>();
      for (int i=0; i<size; i++) {
         Player tempPlayer = new Player((long)i, fullPlayerList.get(i), colorMap.get(fullPlayerList.get(i)));
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
      this.cardDistribution = new HashMap<>();
      for(String player : playerList.keySet()) {
         cardDistribution.put(player, playerList.get(player).showCardInHand());
      }

      // initialize the Map and distribute each Player to pre-defined location
      this.Map = new ClueMap();
      this.playerLocation = new HashMap<>();
      this.hasMadeSuggestion = new HashMap<>();
      this.hasMoved = new HashMap<>();
      for (String playerName : fullPlayerList) {
         if (playerList.containsKey(playerName)) {
            int x = iniLocation.get(playerName)[0];
            int y = iniLocation.get(playerName)[1];
            // addOne to the room
            Map.moveInto(x,y);
            String key = "(" + x + "," + y + ")";
            playerLocation.put(playerName, new Coordinates(x,y));   // map the Player to his location key
            hasMadeSuggestion.put(playerName, false);  // track Player status
            hasMoved.put(playerName, false);
            // build availableMove list for each player
            Player player = playerList.get(playerName);
            player.addAvailableMove("accusation");
            for (String move : Map.potentialMove(key)) {
               player.addAvailableMove(move);
            }
         }
      }

      // turn the Turn back to Miss Scarlet
      while(!turn.isMyTurn("Miss Scarlet")) {
         turn.nextTurn();
      }
   }

   /*
   this method return the available character name(playerName) as a List of String
    */
   public Map<String, Player> availablePlayers() {
      Map<String, Player> result = new HashMap<>();

      for (Map.Entry<String, Player> entry : playerList.entrySet()) {
         // if the playerName has not been bound to any userId
         if (!userToPlayerMap.containsValue(entry.getKey())) {
            result.put(entry.getKey(), entry.getValue());
         }
      }
      return result;
   }

   /*
   this method is called when a user is joining this game
    */
   public boolean userJoin(String userId) {
      if ((userList.size() < userAllowed) && !userList.contains(userId)) {
         userList.add(userId);
         System.out.println("User: " + userId + " joined Game: " + gameId + "!");
         return true;
      } else if(userList.contains(userId)) {
         System.out.println("User already in the game.");
         return false;
      }
      else {
         System.out.println("Already reach the maximum allowed Users count...");
         return false;
      }
   }

   /*
   this method binds a userId to a specific character(Player)
    */
   public void userSelectPlayer(String userId, String playerName) {
      if (availablePlayers().containsKey(playerName)) {
         userToPlayerMap.put(userId, playerName);
         System.out.println("User: " + userId + " selected suspect: " + playerName);
      }
   }

   /*
   retrieve the active users count in current game session
    */
   public int activeUserCount() {
      return this.userList.size();
   }

   public int getSize() {
      return this.size;
   }

   /*
   get Player object by userId
    */
   public Player getUserPlayer(String userId) {
      if (userToPlayerMap.containsKey(userId)) {
         return playerList.get(userToPlayerMap.get(userId));
      }
      return null;
   }

   /*
   get Player object by playerName
    */
   public Player getPlayer(String playerName) {
      return playerList.get(playerName);
   }

   /*
   this method is called when a user is exiting this game
    */
   public boolean userExit(String userId) {
      if(userList.contains(userId)) {
         userList.remove(userId);
         System.out.println("User removed from the game.");
         return true;
      }if ((userList.size() < userAllowed) && !userList.contains(userId)) {
         System.out.println("User not found in this  game session");
         return false;
      }
      else {
         System.out.println("Already reach the maximum allowed Users count...");
      }
      return false;
   }
   /*
   this method is used to perform a Player move
    */
   public boolean move(String userId, String action) {
      if (!getUserPlayer(userId).isAvailableMove(action)){
         return false;
      }
      else {
         String playerName = userToPlayerMap.get(userId);
         if (hasMoved.get(playerName)) {
            System.out.println("user "+playerName+" has already moved in this turn.");
            return false;
         }
         String keyOfCurrLoc = playerLocation.get(playerName).CoordinatesToString();
         Location current = Map.mainMap.get(keyOfCurrLoc);
         String neighbourKey = "";
         if (action.equals("up")) {
            neighbourKey = Map.mainMap.get(keyOfCurrLoc).upNeighbour();
         }
         else if (action.equals("down")) {
            neighbourKey = Map.mainMap.get(keyOfCurrLoc).downNeighbour();
         }
         else if (action.equals("left")) {
            neighbourKey = Map.mainMap.get(keyOfCurrLoc).leftNeighbour();
         }
         else if (action.equals("right")) {
            neighbourKey = Map.mainMap.get(keyOfCurrLoc).rightNeighbour();
         }
         else {
            neighbourKey = Map.mainMap.get(keyOfCurrLoc).diagNeighbour();
         }
         Location destination = Map.mainMap.get(neighbourKey);
         // update the occupancy
         current.removeOne();
         destination.addOne();
         // update playerLocation Map
         playerLocation.put(playerName, new Coordinates(neighbourKey));
         // clear Player availableMove list of all move option
         Player player = getUserPlayer(userId);
         player.refreshAvailableMove();
         player.addAvailableMove("accusation");

         // check if a suggestion has been made in his turn
         if(!hasMadeSuggestion.get(playerName) && Map.isRoom(neighbourKey)) {
            player.addAvailableMove("suggestion");
         }
         // update move status
         hasMoved.put(playerName, true);
         return true;
      }

   }
   /*
   this method make a suggestion
    */
   public String makeSuggestion(String userId, String suspect,String weapon){
      String playerName = userToPlayerMap.get(userId);
      if(hasMadeSuggestion.get(playerName)){ //if player has already made suggestion return error
         return "Player "+playerName+" has already made the suggestion in this round!";
      }
      if(!hasMoved.get(playerName)){
         return "Player "+playerName+" has not moved this round nor been moved previously";
      }
      System.out.println("User:: "+userId+" suggests -> { suspect: "+suspect+", weapon: "+weapon);
      // get caller location
      String callerKey = playerLocation.get(playerName).CoordinatesToString();
      Location callerLoc = Map.mainMap.get(callerKey);
      // get suspect location
      String suspectKey = playerLocation.get(suspect).CoordinatesToString();
      Location suspectLoc = Map.mainMap.get(suspectKey);
      // take care of occupancy
      callerLoc.addOne();
      suspectLoc.removeOne();
      // update playerLocation map in Game
      playerLocation.put(suspect, playerLocation.get(playerName));
      Player caller = playerList.get(playerName);
      Player callee = playerList.get(suspect);
      // update caller available move list (removing suggestion)
      caller.refreshAvailableMove();
      caller.addAvailableMove("accusation");
      // update callee available move list (rebuild and add suggestion so he can make suggestion directly next time)
      callee.refreshAvailableMove();
      for (String move : Map.potentialMove(callerKey)) {
         callee.addAvailableMove(move);
      }
      callee.addAvailableMove("suggestion");
      callee.addAvailableMove("accusation");
      hasMoved.put(suspect, true);  // mark the callee as hasMoved so he can make suggestion directly next round
      hasMadeSuggestion.put(playerName,true);   // mark it hasMade suggestion this turn
      return "suggestion";
   }
   public String makeAccusation(String userId, String suspect, String room ,String weapon){

      String playerName = userToPlayerMap.get(userId);
      if(suspect == this.cardFile.reveal().get(0).getName() &&
              weapon== this.cardFile.reveal().get(1).getName() &&
              room == this.cardFile.reveal().get(2).getName())
      {
         return playerName+ "has correctly guess and won";
      }
      // TODO need to end the game when the user's accusation is incorrect
      userExit(userId);
      return playerName+" accused that"+ suspect + " is murderer with weapon "+ weapon +"which is false. You lose";
   }

   /*
   this method is used to end a player turn
    */
   public String endTurn(String userId) {
      String playerName = userToPlayerMap.get(userId);
      Player player = playerList.get(playerName);
      if (player.getAvailableMove().contains("suggestion") || !hasMadeSuggestion.get(playerName)) {
         return "Please make suggestion before ending your turn!";
      }
      else {
         // rebuild his available move list
         player.refreshAvailableMove();
         player.addAvailableMove("accusation");
         String key = playerLocation.get(playerName).CoordinatesToString();
         for (String move : Map.potentialMove(key)) {
            player.addAvailableMove(move);
         }

         // re-mark player status tracker
         hasMadeSuggestion.put(playerName, false);
         hasMoved.put(playerName, false);

         turn.nextTurn();;
         return "ended";
      }
   }


}
