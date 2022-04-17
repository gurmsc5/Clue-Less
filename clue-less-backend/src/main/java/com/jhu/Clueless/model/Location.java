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

}
