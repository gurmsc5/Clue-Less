package com.jhu.Clueless.model;

import java.util.ArrayList;
import java.util.HashMap;

public class Game {
   int gameId;
   int size;
   ArrayList<User> userList;
   ArrayList<Player> playerList;
   HashMap<String, String> userToPlayerMap;
   CardEnvelope cardFile;
   HashMap<String, ArrayList<Card>> cardDistribution;
   ArrayList<Room> Rooms;
   ArrayList<Hallway> Hallways;
   ArrayList<Player> turn;



}
