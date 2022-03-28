import { Card } from "./card";

export interface Player {
  id: number;
  name: string;
  isAvailable: boolean;
  cards?: Card[]
}
