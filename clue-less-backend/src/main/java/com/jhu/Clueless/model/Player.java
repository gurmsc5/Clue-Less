package com.jhu.Clueless.model;

import java.util.ArrayList;

public class Player {
   // test class for Git push
   public String playerName;
   public Integer playerType;  // 1 stands for actual player; 2 stands for AI
   private ArrayList<Card> cardInHand = new ArrayList<Card>();
   Location location;



   // constructor
   public Player(String playerName, Integer playerType) {
      this.playerName = playerName;
      this.playerType = playerType;
   }

   // build the card in hand for the player
   // input should be a list of Card objects
   public void buildCardInHand(ArrayList<Card> cardList) {
      for (int i=0; i<cardList.size(); i++){
         this.cardInHand.add(cardList.get(i));
      }
   }




}
