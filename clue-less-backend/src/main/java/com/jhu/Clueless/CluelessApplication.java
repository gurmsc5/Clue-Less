package com.jhu.Clueless;

import com.jhu.Clueless.model.Game;
import com.jhu.Clueless.model.GameList;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CluelessApplication {

	public static void main(String[] args) {
		SpringApplication.run(CluelessApplication.class, args);

		// initialize a game session with gameId=999 for skeletal inc
		Game newGame = new Game(4, 999, 6);
		GameList.getInstance().addGame(newGame);
		System.out.println("Create a gameId:999");
	}

}
