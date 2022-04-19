import {Game} from "./game";

export const MOCKGAME: Game = {
  gameId: 999,
  size: 6,
  userAllowed: 4,
  userList: [
    "myself"
  ],
  playerList: [
    {
      id: 1,
      name: "Professor Plum",
      color: "purple",
      available: true,
      cardInHand: [
        {
          type: "ROOM",
          name: "Lounge"
        },
        {
          type: "WEAPON",
          name: "Lead Pipe"
        },
        {
          type: "ROOM",
          name: "Kitchen"
        }
      ],
      availableMove: [
        "accusation",
        "down"
      ]
    },
    {
      id: 3,
      name: "Mrs. White",
      color: "white",
      available: true,
      cardInHand: [
        {
          type: "SUSPECT",
          name: "Professor Plum"
        },
        {
          type: "WEAPON",
          name: "Knife"
        },
        {
          type: "SUSPECT",
          name: "Mrs. Peacock"
        }
      ],
      availableMove: [
        "accusation",
        "left",
        "right"
      ]
    },
    {
      id: 4,
      name: "Mrs. Peacock",
      color: "blue",
      available: true,
      cardInHand: [
        {
          type: "ROOM",
          name: "Conservatory"
        },
        {
          type: "ROOM",
          name: "Study"
        },
        {
          type: "WEAPON",
          name: "Wrench"
        }
      ],
      availableMove: [
        "accusation",
        "down"
      ]
    },
    {
      id: 0,
      name: "Miss Scarlet",
      color: "red",
      available: true,
      cardInHand: [
        {
          type: "ROOM",
          name: "Dining Room"
        },
        {
          type: "SUSPECT",
          name: "Mrs. White"
        },
        {
          type: "ROOM",
          name: "Ballroom"
        }
      ],
      availableMove: [
        "accusation",
        "suggestion"
      ]
    },
    {
      id: 5,
      name: "Colonel Mustard",
      color: "yellow",
      available: true,
      cardInHand: [
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
      ]
    },
    {
      id: 2,
      name: "Mr. Green",
      color: "green",
      available: true,
      cardInHand: [
        {
          type: "SUSPECT",
          name: "Miss Scarlet"
        },
        {
          type: "WEAPON",
          name: "Candlestick"
        },
        {
          type: "ROOM",
          name: "Library"
        }
      ],
      availableMove: [
        "accusation",
        "left",
        "right"
      ]
    }
  ],
  userToPlayerMap: {
    "myself": "Miss Scarlet"
  },
  cardFile: {
    theSuspect: {
      type: "SUSPECT",
      name: "Mr. Green"
    },
    theWeapon: {
      type: "WEAPON",
      name: "Revolver"
    },
    theRoom: {
      type: "ROOM",
      name: "Hall"
    }
  },
  Map: {
    mainMap: {
      "(1,2)": {
        name: "Hallway#12",
        xCord: 1,
        yCord: 2,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(0,3)": {
        name: "Hallway#03",
        xCord: 0,
        yCord: 3,
        occupancy: 1,
        playerOccupancy: "Professor Plum"
      },
      "(2,0)": {
        name: "Ballroom",
        xCord: 2,
        yCord: 0,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(3,0)": {
        name: "Hallway#30",
        xCord: 3,
        yCord: 0,
        occupancy: 1,
        playerOccupancy: "Mrs. White"
      },
      "(2,1)": {
        name: "Hallway#21",
        xCord: 2,
        yCord: 1,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(0,2)": {
        name: "Library",
        xCord: 0,
        yCord: 2,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(1,4)": {
        name: "Hallway#14",
        xCord: 1,
        yCord: 4,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(4,0)": {
        name: "Kitchen",
        xCord: 4,
        yCord: 0,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(2,2)": {
        name: "Billiard Room",
        xCord: 2,
        yCord: 2,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(4,1)": {
        name: "Hallway#41",
        xCord: 4,
        yCord: 1,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(3,2)": {
        name: "Hallway#32",
        xCord: 3,
        yCord: 2,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(2,3)": {
        name: "Hallway#23",
        xCord: 2,
        yCord: 3,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(0,4)": {
        name: "Study",
        xCord: 0,
        yCord: 4,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(1,0)": {
        name: "Hallway#10",
        xCord: 1,
        yCord: 0,
        occupancy: 1,
        playerOccupancy: "Mr. Green"
      },
      "(0,1)": {
        name: "Hallway#01",
        xCord: 0,
        yCord: 1,
        occupancy: 1,
        playerOccupancy: "Mrs. Peacock"
      },
      "(0,0)": {
        name: "Conservatory",
        xCord: 0,
        yCord: 0,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(4,2)": {
        name: "Dining Room",
        xCord: 4,
        yCord: 2,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(2,4)": {
        name: "Hall",
        xCord: 2,
        yCord: 4,
        occupancy: 1,
        playerOccupancy: "Miss Scarlet"
      },
      "(4,3)": {
        name: "Hallway#43",
        xCord: 4,
        yCord: 3,
        occupancy: 1,
        playerOccupancy: "Colonel Mustard"
      },
      "(3,4)": {
        name: "Hallway#34",
        xCord: 3,
        yCord: 4,
        occupancy: 0,
        playerOccupancy: ""
      },
      "(4,4)": {
        name: "Lounge",
        xCord: 4,
        yCord: 4,
        occupancy: 0,
        playerOccupancy: ""
      }
    }
  },
  playerLocation: {
    "Professor Plum": { x: 0, y: 3 },
    "Mrs. White": { x: 3, y: 0 },
    "Mrs. Peacock": { x: 0, y: 1 },
    "Miss Scarlet": { x: 2, y: 4 },
    "Colonel Mustard": { x: 4, y: 3 },
    "Mr. Green": { x: 1, y: 0 },
  },
  hasMadeSuggestion: {
    "Professor Plum": false,
    "Mrs. White": false,
    "Mrs. Peacock": false,
    "Miss Scarlet": false,
    "Colonel Mustard": false,
    "Mr. Green": false
  },
  hasMoved: {
    "Professor Plum": false,
    "Mrs. White": false,
    "Mrs. Peacock": false,
    "Miss Scarlet": true,
    "Colonel Mustard": false,
    "Mr. Green": false
  },
  turn: {
    playerQ: [
      "Miss Scarlet",
      "Professor Plum",
      "Mr. Green",
      "Mrs. White",
      "Mrs. Peacock",
      "Colonel Mustard"
    ]
  },
  inProgress: false
};
