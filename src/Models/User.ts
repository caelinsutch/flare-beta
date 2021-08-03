import { Party } from "./Party";
import { Review } from "./Review";

type RootUser = {
  userId: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
  createdAt: number;
  address?: string;
  bio?: string;
  host?: boolean;
  url?: string;
  socials: {
    tiktok?: string;
    instagram?: string;
  };
  deleted?: boolean;
  deletedAt?: number;
};

export type UserDbo = {
  hosting: string[];
  attending: string[];
} & RootUser;

export type User = {
  hosting: Party[];
  attending: Party[];
  reviews: Review[];
} & RootUser;

export type NewUser = Pick<User, "name" | "phone" | "socials">;
export type NewUserDbo = Omit<User, "userId">;
