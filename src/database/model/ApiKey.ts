export enum Permission {
  GENERAL = "GENERAL",
}

export default interface ApiKey {
  id: string;
  key: string;
  version: number;
  permissions: Permission[];
  comments: string[];
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
