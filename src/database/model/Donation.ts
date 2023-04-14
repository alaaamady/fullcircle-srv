export enum FoodCategory {
  GREENS = "greens",
  COOKED = "cooked",
  GRAINS = "grains",
  DAIRY = "dairy",
  FROZEN = "frozen",
  GROCERIES = "groceries",
}
type Coordinates = { latitude: number; longitude: number };

export default interface Donation {
  title: string;
  category: FoodCategory;
  pictures: string[];
  coordinates: Coordinates;
  pickUpTimestamp: Date;
  expiryDate: Date;
  description: string;
  userId: bigint;
}
