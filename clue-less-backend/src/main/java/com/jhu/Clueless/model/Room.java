package com.jhu.Clueless.model;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Room extends Location{

   //constructor
   public Room(String name, int xCord, int yCord) {
      super(name, xCord, yCord);
   }

   public boolean isAvailable() {
      return true;
   }

   // return upNeighbour key string or null if there is no up neighbour
   public String upNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,0)":
            return "(0,1)";
         case "(2,0)":
            return "(2,1)";
         case "(4,0)":
            return "(4,1)";
         case "(0,2)":
            return "(0,3)";
         case "(2,2)":
            return "(2,3)";
         case "(4,2)":
            return "(4,3)";
         default:
            return null;
      }
   }

   // return downNeighbour key string or null if there is no down neighbour
   public String downNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,2)":
            return "(0,1)";
         case "(2,2)":
            return "(2,1)";
         case "(4,2)":
            return "(4,1)";
         case "(0,4)":
            return "(0,3)";
         case "(2,4)":
            return "(2,3)";
         case "(4,4)":
            return "(4,3)";
         default:
            return null;
      }
   }

   // return leftNeighbour key string or null if there is no left neighbour
   public String leftNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(2,0)":
            return "(1,0)";
         case "(4,0)":
            return "(3,0)";
         case "(2,2)":
            return "(1,2)";
         case "(4,2)":
            return "(3,2)";
         case "(2,4)":
            return "(1,4)";
         case "(4,4)":
            return "(3,4)";
         default:
            return null;
      }
   }

   // return rightNeighbour key string or null if there is no right neighbour
   public String rightNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,0)":
            return "(1,0)";
         case "(2,0)":
            return "(3,0)";
         case "(0,2)":
            return "(1,2)";
         case "(2,2)":
            return "(3,2)";
         case "(0,4)":
            return "(1,4)";
         case "(2,4)":
            return "(3,4)";
         default:
            return null;
      }
   }

   public String diagNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,0)":
            return "(4,4)";
         case "(4,4)":
            return "(0,0)";
         case "(4,0)":
            return "(0,4)";
         case "(0,4)":
            return "(4,0)";
         default:
            return null;
      }
   }

}
