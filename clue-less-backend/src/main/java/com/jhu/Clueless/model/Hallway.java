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



}
