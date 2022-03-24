package com.jhu.Clueless.model;

public class Room extends Location{

   String roomName;

   public Room(String roomName, Integer[] coordinate) {
      super(coordinate);
      this.roomName = roomName;
   }


}
