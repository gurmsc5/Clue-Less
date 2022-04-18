package com.jhu.Clueless.model;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Location {
   private Long locationId;
   private String name;
   private int xCord;
   private int yCord;
   private int occupancy;

   // constructor
   public Location (String name, int xCord, int yCord) {
      this.name = name;
      this.xCord = xCord;
      this.yCord = yCord;
      this.occupancy = 0;
   }

   // move one player into this location
   public void addOne() {
      occupancy += 1;
   }

   // move one player out of this location
   public void removeOne() {
      occupancy -= 1;
   }

   public boolean isAvailable(){return true;}

   public String upNeighbour(){return null;}

   public String downNeighbour(){return null;}

   public String leftNeighbour(){return null;}

   public String rightNeighbour(){return null;}

   public String diagNeighbour(){return null;}

   public boolean atHallway() {
      return name.split("#").length == 2;
   }

}
