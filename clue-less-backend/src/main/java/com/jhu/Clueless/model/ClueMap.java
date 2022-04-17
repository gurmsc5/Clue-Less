package com.jhu.Clueless.model;

import java.util.HashMap;

public class ClueMap {

   // static Room/Hallway map for all games
   public static HashMap<String, String> mainMap = new HashMap<>() {{
      put("(0,0)", "Conservatory");
      put("(1,0)", "Hallway#10");
      put("(2,0)", "Ballroom");
      put("(3,0)", "Hallway#30");
      put("(4,0)", "Kitchen");
      put("(0,1)", "Hallway#01");
      put("(2,1)", "Hallway#21");
      put("(4,1)", "Hallway#41");
      put("(0,2)", "Library");
      put("(1,2)", "Hallway#12");
      put("(2,2)", "Billiard Room");
      put("(3,2)", "Hallway#32");
      put("(4,2)", "Dining Room");
      put("(0,3)", "Hallway#03");
      put("(2,3)", "Hallway#23");
      put("(4,3)", "Hallway#43");
      put("(0,4)", "Study");
      put("(1,4)", "Hallway#14");
      put("(2,4)", "Hall");
      put("(3,4)", "Hallway#34");
      put("(4,4)", "Lounge");
   }};

   public HashMap<String, Hallway> hallwayMap;
   public HashMap<String, Room> roomMap;

   // constructor
   public ClueMap() {
      this.hallwayMap = new HashMap<>();
      this.roomMap = new HashMap<>();
      hallwayMap.put("(1,0)", new Hallway("Hallway#10",1,0));
      hallwayMap.put("(3,0)", new Hallway("Hallway#30",3,0));
      hallwayMap.put("(0,1)", new Hallway("Hallway#01",0,1));
      hallwayMap.put("(2,1)", new Hallway("Hallway#21",2,1));
      hallwayMap.put("(4,1)", new Hallway("Hallway#41",4,1));
      hallwayMap.put("(1,2)", new Hallway("Hallway#12",1,2));
      hallwayMap.put("(3,2)", new Hallway("Hallway#32",3,2));
      hallwayMap.put("(0,3)", new Hallway("Hallway#03",0,3));
      hallwayMap.put("(2,3)", new Hallway("Hallway#23",2,3));
      hallwayMap.put("(4,3)", new Hallway("Hallway#43",4,3));
      hallwayMap.put("(1,4)", new Hallway("Hallway#14",1,4));
      hallwayMap.put("(3,4)", new Hallway("Hallway#34",3,4));

      roomMap.put("(0,0)", new Room("Conservatory",0,0));
      roomMap.put("(2,0)", new Room("Ballroom",2,0));
      roomMap.put("(4,0)", new Room("Kitchen",4,0));
      roomMap.put("(0,2)", new Room("Library",0,2));
      roomMap.put("(2,2)", new Room("Billiard Room",2,2));
      roomMap.put("(4,2)", new Room("Dining Room",4,2));
      roomMap.put("(0,4)", new Room("Study",0,4));
      roomMap.put("(2,4)", new Room("Hall",2,4));
      roomMap.put("(4,4)", new Room("Lounge",4,4));

   }

   // construct the coordination to String
   private static String constructKey(int x, int y) {
      return "(" + x + "," + y + ")";
   }


   // move someone into to a location
   public void moveInto(int x, int y) {
      // construct the location to String
      String destination = constructKey(x, y);
      if (hallwayMap.containsKey(destination)) {
         hallwayMap.get(destination).addOne();
      }
      if (roomMap.containsKey(destination)) {
         roomMap.get(destination).addOne();
      }

   }

   // move someone out of a location
   public void moveOutof(int x, int y) {
      // construct the location to String
      String destination = constructKey(x, y);
      if (hallwayMap.containsKey(destination)) {
         hallwayMap.get(destination).removeOne();
      }
      if (roomMap.containsKey(destination)) {
         roomMap.get(destination).removeOne();
      }
   }





}
