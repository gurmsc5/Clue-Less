package com.jhu.Clueless;

import com.jhu.Clueless.model.Game;
import com.jhu.Clueless.service.GameService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CluelessApplication {

	public static void main(String[] args) {
		SpringApplication.run(CluelessApplication.class, args);

		// initialize a game session with gameId=999 for skeletal inc
		GameService.createNewGame(4, 6, 999);
		System.out.println("Create a gameId:999");
	}

}
