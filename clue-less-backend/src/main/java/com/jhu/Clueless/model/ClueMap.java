package com.jhu.Clueless.model;

import java.util.HashMap;

public class ClueMap {

   // static Room/Hallway map for all games
   public static HashMap<String, String> mainMap = new HashMap<>() {{
      put("(1,1)", "Conservatory");
      put("(2,1)", "Hallway#21");
      put("(3,1)", "Ballroom");
      put("(4,1)", "Hallway#41");
      put("(5,1)", "Kitchen");
      put("(1,2)", "Hallway#12");
      put("(3,2)", "Hallway#32");
      put("(5,2)", "Hallway#52");
      put("(1,3)", "Library");
      put("(2,3)", "Hallway#23");
      put("(3,3)", "Billiard Room");
      put("(4,3)", "Hallway#43");
      put("(5,3)", "Dining Room");
      put("(1,4)", "Hallway#14");
      put("(3,4)", "Hallway#34");
      put("(5,4)", "Hallway#54");
      put("(1,5)", "Study");
      put("(2,5)", "Hallway#25");
      put("(3,5)", "Hall");
      put("(4,5)", "Hallway#45");
      put("(5,5)", "Lounge");
   }};

   public HashMap<String, Boolean> occupationMap;

   // constructor
   public ClueMap() {
      occupationMap = new HashMap<>();
      this.occupationMap.put("(1,1)", false);
      this.occupationMap.put("(2,1)", false);
      this.occupationMap.put("(3,1)", false);
      this.occupationMap.put("(4,1)", false);
      this.occupationMap.put("(5,1)", false);
      this.occupationMap.put("(1,2)", false);
      this.occupationMap.put("(3,2)", false);
      this.occupationMap.put("(5,2)", false);
      this.occupationMap.put("(1,3)", false);
      this.occupationMap.put("(2,3)", false);
      this.occupationMap.put("(3,3)", false);
      this.occupationMap.put("(4,3)", false);
      this.occupationMap.put("(5,3)", false);
      this.occupationMap.put("(1,4)", false);
      this.occupationMap.put("(3,4)", false);
      this.occupationMap.put("(5,4)", false);
      this.occupationMap.put("(1,5)", false);
      this.occupationMap.put("(2,5)", false);
      this.occupationMap.put("(3,5)", false);
      this.occupationMap.put("(4,5)", false);
      this.occupationMap.put("(5,5)", false);
   }


   // check whether the destination is a valid destination to move in
   public boolean isValidDest(int x, int y) {
      // construct the location to String
      String destination = "(" + Integer.toString(x) + "," + Integer.toString(y) + ")";

      // first it has to be a valid location in Clue static Map (either a Room or a Hallway)
      if (!occupationMap.containsKey(destination)) {
         System.out.println(destination + " is not a valid location");
         return false;
      }
      else if (occupationMap.get(destination)){
         System.out.println(destination + " is already occupied");
         return false;
      }
      else {
         System.out.println(destination + " is valid Destination");
         return true;
      }
   }


   // move someone into to a location
   // mark that location to be true
   public void moveInto(int x, int y) {
      // construct the location to String
      String destination = "(" + Integer.toString(x) + "," + Integer.toString(y) + ")";
      occupationMap.put(destination, true);
   }

   // move someone out of a location
   // mark that location to be false
   public void moveOutof(int x, int y) {
      // construct the location to String
      String destination = "(" + Integer.toString(x) + "," + Integer.toString(y) + ")";
      occupationMap.put(destination, false);
   }





}
