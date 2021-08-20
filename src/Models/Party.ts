import { Review } from "@Models/Review";

import { UserDbo } from "./User";

type RootParty = {
  partyId: string;
  address: string;
  date: number;
  name: string;
  createdAt: number;
  attendees: PartyAttendee[];
  info: string;
  bannerImage?: string;
};

export type PartyDbo = {
  admins: string[];
} & RootParty;

export type Party = {
  admins: UserDbo[];
  reviews: Review[];
} & RootParty;

export type PartyAttendee = {
  userId: string;
  status?: "attending" | "applied";
  name: string;
  createdAt: number;
};

export type NewParty = {
  name: string;
  date: number;
  address: string;
  info: string;
  admins: string[];
};
