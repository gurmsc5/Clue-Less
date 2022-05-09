import { Player } from "./player";

export const PLAYERS: Player[] = [
  { id: 1, name: 'Mrs. White', available: true, cardInHand: [
      {
        type: "SUSPECT",
        name: "Colonel Mustard"
      },
      {
        type: "ROOM",
        name: "Billiard Room"
      },
      {
        type: "WEAPON",
        name: "Rope"
      }
    ],
    availableMove: [
      "accusation",
      "down"
    ]},
  { id: 2, name: 'Professor Plum', available: true},
  { id: 3, name: 'Mrs. Peacock', available: true},
  { id: 4, name: 'Colonel Mustard', available: true},
  { id: 5, name: 'Mr. Green', available: true}
];
