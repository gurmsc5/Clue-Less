package com.jhu.Clueless.model;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class Hallway extends Location{

   // constructor
   public Hallway(String name, int xCord, int yCord) {
      super(name, xCord, yCord);
   }

   // return true only if the hallway has no one inside
   public boolean isAvailable() {
      return super.getOccupancy()<1;
   }

   // return upNeighbour key string or null if there is no up neighbour
   public String upNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,1)":
            return "(0,2)";
         case "(2,1)":
            return "(2,2)";
         case "(4,1)":
            return "(4,2)";
         case "(0,3)":
            return "(0,4)";
         case "(2,3)":
            return "(2,4)";
         case "(4,3)":
            return "(4,4)";
         default:
            return null;
      }
   }

   // return downNeighbour key string or null if there is no down neighbour
   public String downNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(0,1)":
            return "(0,0)";
         case "(2,1)":
            return "(2,0)";
         case "(4,1)":
            return "(4,0)";
         case "(0,3)":
            return "(0,2)";
         case "(2,3)":
            return "(2,2)";
         case "(4,3)":
            return "(4,2)";
         default:
            return null;
      }
   }

   // return leftNeighbour key string or null if there is no left neighbour
   public String leftNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(1,0)":
            return "(0,0)";
         case "(3,0)":
            return "(2,0)";
         case "(1,2)":
            return "(0,2)";
         case "(3,2)":
            return "(2,2)";
         case "(1,4)":
            return "(0,4)";
         case "(3,4)":
            return "(2,4)";
         default:
            return null;
      }
   }

   // return rightNeighbour key string or null if there is no right neighbour
   public String rightNeighbour() {
      String key = "("+getXCord()+","+getYCord()+")";
      switch(key) {
         case "(1,0)":
            return "(2,0)";
         case "(3,0)":
            return "(4,0)";
         case "(1,2)":
            return "(2,2)";
         case "(3,2)":
            return "(4,2)";
         case "(1,4)":
            return "(2,4)";
         case "(3,4)":
            return "(4,4)";
         default:
            return null;
      }
   }

   public String diagNeighbour() {
      return null;
   }




}
