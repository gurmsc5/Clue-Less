package com.jhu.Clueless.model;

import java.util.ArrayList;
import java.util.HashMap;

public class ClueMap {

   public HashMap<String, Location> mainMap;

   // constructor
   public ClueMap() {
      this.mainMap = new HashMap<>();

      mainMap.put("(1,0)", new Hallway("Hallway#10",1,0));
      mainMap.put("(3,0)", new Hallway("Hallway#30",3,0));
      mainMap.put("(0,1)", new Hallway("Hallway#01",0,1));
      mainMap.put("(2,1)", new Hallway("Hallway#21",2,1));
      mainMap.put("(4,1)", new Hallway("Hallway#41",4,1));
      mainMap.put("(1,2)", new Hallway("Hallway#12",1,2));
      mainMap.put("(3,2)", new Hallway("Hallway#32",3,2));
      mainMap.put("(0,3)", new Hallway("Hallway#03",0,3));
      mainMap.put("(2,3)", new Hallway("Hallway#23",2,3));
      mainMap.put("(4,3)", new Hallway("Hallway#43",4,3));
      mainMap.put("(1,4)", new Hallway("Hallway#14",1,4));
      mainMap.put("(3,4)", new Hallway("Hallway#34",3,4));

      mainMap.put("(0,0)", new Room("Conservatory",0,0));
      mainMap.put("(2,0)", new Room("Ballroom",2,0));
      mainMap.put("(4,0)", new Room("Kitchen",4,0));
      mainMap.put("(0,2)", new Room("Library",0,2));
      mainMap.put("(2,2)", new Room("Billiard Room",2,2));
      mainMap.put("(4,2)", new Room("Dining Room",4,2));
      mainMap.put("(0,4)", new Room("Study",0,4));
      mainMap.put("(2,4)", new Room("Hall",2,4));
      mainMap.put("(4,4)", new Room("Lounge",4,4));

   }

   // construct the coordination to String
   private static String constructKey(int x, int y) {
      return "(" + x + "," + y + ")";
   }

   // move someone into to a location
   public void moveInto(int x, int y) {
      // construct the location to String
      String destination = constructKey(x, y);
      mainMap.get(destination).addOne();
   }

   // this method return the list of available moves based on the input Location key
   public ArrayList<String> potentialMove(String key) {
      ArrayList<String> result = new ArrayList<>();
      String upNeighbour = mainMap.get(key).upNeighbour();
      String downNeighbour = mainMap.get(key).downNeighbour();
      String leftNeighbour = mainMap.get(key).leftNeighbour();
      String rightNeighbour = mainMap.get(key).rightNeighbour();
      String diagNeighbour = mainMap.get(key).diagNeighbour();

      if (downNeighbour != null) {
         if (mainMap.get(downNeighbour).isAvailable()) {
            result.add("down");
         }
      }
      if (leftNeighbour != null) {
         if (mainMap.get(leftNeighbour).isAvailable()) {
            result.add("left");
         }
      }
      if (rightNeighbour != null) {
         if (mainMap.get(rightNeighbour).isAvailable()) {
            result.add("right");
         }
      }
      if (diagNeighbour != null) {
         if (mainMap.get(diagNeighbour).isAvailable()) {
            result.add("diag");
         }
      }
      return result;
   }

   // get whether a Location key is for room
   public boolean isRoom (String key) {
      return !mainMap.get(key).atHallway();
   }





}
