package com.jhu.Clueless.model;

import java.util.ArrayList;
import java.util.HashMap;

public class Player {
   // test class for Git push
   public String playerName;
   public Integer playerType;  // 1 stands for actual player; 2 stands for AI
   public String color;
   public Integer[] coordinate;
   private ArrayList<Card> cardInHand = new ArrayList<Card>();



   // constructor
   public Player(String playerName, Integer playerType, String color) {
      this.playerName = playerName;
      this.playerType = playerType;
      this.color = color;
   }

   // build the card in hand for the player
   // input should be a list of Card objects
   public void buildCardInHand(Card card) {
      this.cardInHand.add(card);
   }

   // show cards in hand
   public ArrayList<Card> showCardInHand() {
      return cardInHand;
   }




}
