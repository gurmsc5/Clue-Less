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

}
