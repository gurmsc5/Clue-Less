import { Card } from "./card";

export interface PlayerLocation {
  name: string;
  xCoord: number;
  yCoord: number;
}

export interface Player {
  id: number;
  name: string;
  available: boolean;
  color?: string;
  cardInHand?: Card[];
  coordinate?: number[];
  availableMove?: string[]
}
