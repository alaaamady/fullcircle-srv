export interface Role {
  id: number;
  code: RoleCode;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum RoleCode {
  RECIPIENT = "RECIPIENT",
  DRIVER = "DRIVER",
  DONOR = "DONOR",
  ADMIN = "ADMIN",
}
