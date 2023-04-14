export enum OrganizationType {
  ORPHANAGE,
  HOMELESS_SHELTER,
  COMMUNITY_KITCHEN,
  FAMILY_IN_NEED,
  ANIMAL_SHELTER,
}
export default interface Recipient {
  logo: string;
  name: string;
  type: OrganizationType;
  pictures: string[];
  amountOfPeople: number;
  bio: string;
  userId: number;
}
