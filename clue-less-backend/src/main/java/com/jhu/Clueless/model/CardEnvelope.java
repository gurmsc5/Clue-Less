/*
this class contains the three cards in the envelope
this class provides several necessary method for the game to be played
 */

package com.jhu.Clueless.model;

import java.util.ArrayList;

public class CardEnvelope {
   private Card theSuspect;
   private Card theWeapon;
   private Card theRoom;

   // constructor
   public CardEnvelope(Card theSuspect, Card theWeapon, Card theRoom) {
      this.theSuspect = theSuspect;
      this.theWeapon = theWeapon;
      this.theRoom = theRoom;
   }

   // reveal the cards in the envelope
   public ArrayList<Card> reveal() {
      ArrayList<Card> result = new ArrayList<Card>();
      result.add(this.theSuspect);
      result.add(this.theWeapon);
      result.add(this.theRoom);
      return result;
   }




}
