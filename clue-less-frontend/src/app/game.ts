import {Player, PlayerLocation} from "./player";
import {ClueMap} from "./clue-map";
import {CardEnvelope} from "./card-envelope";
import {Turn} from "./turn";
import {Card} from "./card";


export interface Game {
  gameId: number;
  size: number;
  userAllowed: number;
  userList: string[];
  playerList: Player[];
  userToPlayerMap: {};
  cardFile: CardEnvelope;
  Map: ClueMap;
  playerLocation: Record<string, PlayerLocation>
  hasMadeSuggestion: Record<string, boolean>;
  hasMoved: Record<string, boolean>;
  turn: Turn;
  inProgress: boolean;
  stage: string;
  cardDistribution?: Map<string, Card[]>;
  sugBuffer?: string[];
}
