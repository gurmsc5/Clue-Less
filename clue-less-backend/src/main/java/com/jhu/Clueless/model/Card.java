package com.jhu.Clueless.model;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class Card {
   private CardType type;
   private String name;

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

   // method to initialize the SUSPECT Card list
   public static ArrayList<Card> initialSuspect() {
      ArrayList<Card> suspectCardList = new ArrayList<>();
      suspectCardList.add(new Card(CardType.SUSPECT, "Miss Scarlet"));
      suspectCardList.add(new Card(CardType.SUSPECT, "Professor Plum"));
      suspectCardList.add(new Card(CardType.SUSPECT, "Mr. Green"));
      suspectCardList.add(new Card(CardType.SUSPECT, "Mrs. White"));
      suspectCardList.add(new Card(CardType.SUSPECT, "Mrs. Peacock"));
      suspectCardList.add(new Card(CardType.SUSPECT, "Colonel Mustard"));

      return suspectCardList;
   }

   // method to initialize the WEAPON Card list
   public static ArrayList<Card> initialWeapon() {
      ArrayList<Card> weaponCardList = new ArrayList<>();
      weaponCardList.add(new Card(CardType.WEAPON, "Rope"));
      weaponCardList.add(new Card(CardType.WEAPON, "Lead Pipe"));
      weaponCardList.add(new Card(CardType.WEAPON, "Knife"));
      weaponCardList.add(new Card(CardType.WEAPON, "Wrench"));
      weaponCardList.add(new Card(CardType.WEAPON, "Candlestick"));
      weaponCardList.add(new Card(CardType.WEAPON, "Revolver"));

      return weaponCardList;
   }

   // method to initialize the ROOM Card list
   public static ArrayList<Card> initialRoom() {
      ArrayList<Card> roomCardList = new ArrayList<>();
      roomCardList.add(new Card(CardType.ROOM, "Study"));
      roomCardList.add(new Card(CardType.ROOM, "Hall"));
      roomCardList.add(new Card(CardType.ROOM, "Lounge"));
      roomCardList.add(new Card(CardType.ROOM, "Library"));
      roomCardList.add(new Card(CardType.ROOM, "Billiard Room"));
      roomCardList.add(new Card(CardType.ROOM, "Dining Room"));
      roomCardList.add(new Card(CardType.ROOM, "Conservatory"));
      roomCardList.add(new Card(CardType.ROOM, "Ballroom"));
      roomCardList.add(new Card(CardType.ROOM, "Kitchen"));

      return roomCardList;
   }


}
