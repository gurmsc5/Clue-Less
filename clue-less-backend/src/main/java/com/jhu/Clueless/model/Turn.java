/*
this class holds a queue of <String>playerName
in turn playerName is always on the top of the queue
 */

package com.jhu.Clueless.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Turn {
   private Queue<String> playerQ = new LinkedList<>();
   static private ArrayList<String> fullPlayerList = new ArrayList<>(Arrays.asList("Miss Scarlet", "Professor Plum", "Mr. Green", "Mrs. White", "Mrs. Peacock", "Colonel Mustard"));

   // constructor
   public Turn(int size) {
      // always initial the Queue with fixed order as Miss Scarlet always plays first
      for (int i=0; i<size; i++) {
         this.playerQ.add(fullPlayerList.get(i));
      }
   }

   // handover turn to next Player
   public void nextTurn() {
      String curr = playerQ.remove();
      playerQ.add(curr);
   }

   // check if this is my turn
   public boolean isMyTurn(String playerName) {
      return (playerName.equals(playerQ.peek()));
   }

   public String getTurn() {
      return playerQ.peek();
   }


}
