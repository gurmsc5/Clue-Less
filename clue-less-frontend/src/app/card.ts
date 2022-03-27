enum CardType {
  SUSPECT,
  WEAPON,
  ROOM
}

export interface Card {
  cardType: CardType;
  name: string;
}
