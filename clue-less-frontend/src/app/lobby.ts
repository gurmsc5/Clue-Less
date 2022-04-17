import { Player } from "./player";

export interface Lobby {
  id: number;
  gameName: string
  players: Player[];
}
