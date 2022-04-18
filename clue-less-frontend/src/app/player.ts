import { Card } from "./card";

export interface Player {
  id: number;
  name: string;
  available: boolean;
  color?: string;
  cardInHand?: Card[];
  coordinate?: number[];
  availableMove?: string[]
}
