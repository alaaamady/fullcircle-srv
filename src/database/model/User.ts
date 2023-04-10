import { Role } from "./Role";
export default interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: string | null;
  gender?: string | null;
  age?: number | null;
  is_verified: boolean;
  profile_picture_url: string;
  roles: Role[];
}
