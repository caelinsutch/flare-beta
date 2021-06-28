import { Party } from "./Party";

type RootUser = {
  userId: string;
  name: string;
  phone: string;
  instagram: string;
  isAdmin?: boolean;
  createdAt: number;
  reviews: UserReview[];
  address?: string;
  bio?: string;
  host?: boolean;
};

export type UserDbo = {
  hosting: string[];
  attending: string[];
} & RootUser;

export type User = {
  hosting: Party[];
  attending: Party[];
} & RootUser;

export type UserReview = {
  name?: string;
  body: string;
  images?: string[];
  createdAt: number;
};

export type NewUserReview = Omit<UserReview, "createdAt">;

export type NewUser = Omit<User, "createdAt" | "userId" | "points">;
