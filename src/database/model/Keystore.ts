import User from "./User";
export default interface Keystore {
  id: number;
  client: User;
  clientId: number;
  primaryKey: string;
  secondaryKey: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
