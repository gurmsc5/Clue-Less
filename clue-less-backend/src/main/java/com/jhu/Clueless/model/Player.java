package com.jhu.Clueless.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
public class Player extends Object {
   private Long id;

   // test class for Git push
   private String name;
   private String color;
   private boolean available;
   private ArrayList<Card> cardInHand = new ArrayList<Card>();
   private ArrayList<String> availableMove = new ArrayList<>();


   // constructor
   public Player(Long id, String name, String color) {
      this.id = id;
      this.name = name;
      this.color = color;
      this.available = true;
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

   // check if the intended move is available
   public boolean isAvailableMove(String move) {
      return availableMove.contains(move);
   }

   // add move option into availableMove list
   public void addAvailableMove(String move) {
      availableMove.add(move);
   }

   // re-initial the availableMove list
   public void refreshAvailableMove(){
      availableMove.clear();
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      Player player = (Player) o;
      return id.equals(player.id) && name.equals(player.name);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id, name);
   }
}
