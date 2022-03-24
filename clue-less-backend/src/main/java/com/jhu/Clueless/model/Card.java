package com.jhu.Clueless.model;

public class Card {
   CardType type;
   String name;

   // constructor
   public Card(CardType type, String name) {
      this.type = type;
      this.name = name;
   }

   public String getName() {
      return name;
   }

   public CardType getType() {
      return type;
   }


}
