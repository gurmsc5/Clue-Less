export interface BoardLocation {
  name: string;
  xCord: number;
  yCord: number;
  occupancy: number;
  playerOccupancy: string[];
  playerOccupancyImg?: string;
  image?: string;
}
