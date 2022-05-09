import { Card } from "./card";

export interface PlayerLocation {
  x: number;
  y: number;
}

export interface Player {
  id: number;
  name: string;
  available: boolean;
  color?: string;
  cardInHand?: Card[];
  coordinate?: number[];
  availableMove?: Set<string>;
}
