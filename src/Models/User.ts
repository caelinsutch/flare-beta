import { Party } from "./Party";

type RootUser = {
  userId: string;
  name: string;
  phone: string;
  instagram: string;
  isAdmin?: boolean;
  createdAt: number;
  address?: string;
  bio?: string;
  host?: boolean;
  url?: string;
};

export type UserDbo = {
  hosting: string[];
  attending: string[];
  reviews: string[];
} & RootUser;

export type User = {
  hosting: Party[];
  attending: Party[];
  reviews: UserReview[];
} & RootUser;

export type UserReview = {
  name?: string;
  body: string;
  images?: string[];
  createdAt: number;
  userId: string;
};

export type NewUserReview = Omit<UserReview, "createdAt" | "userId">;

export type NewUser = Omit<User, "createdAt" | "userId" | "points">;
