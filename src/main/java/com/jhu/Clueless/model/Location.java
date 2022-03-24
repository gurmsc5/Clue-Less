/*
this is the superclass that defines a location in the map
this class will be extended by Room and Hallway
this class contains the basic coordinate for each Location and provides basic methods
 */

package com.jhu.Clueless.model;

public class Location {
   Integer[] coordinate;
   Boolean isOccupied;
   Player player;

   // constructor
   public Location(Integer[] coordinate) {
      this.coordinate = coordinate;
      this.isOccupied = false;
      this.player = null;
   }

   // move a player into this location
   // return true if move in successfully otherwise false
   public static boolean moveIn(Location location, Player player) {
      if (location.isOccupied) {
         return false;
      }
      else {
         location.isOccupied = true;
         location.player = player;
         return true;
      }
   }

   // reveal the player that is in this location
   public Player whoIsIn() {
      return this.player;
   }



}
