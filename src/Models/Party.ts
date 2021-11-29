import { Review } from "@Models/Review";

import { UserDbo } from "./User";

export type PartyPrice = {
  title: string;
  description?: string;
  price: number; // Price in cents
};

type RootParty = {
  partyId: string;
  address: string;
  date: number;
  name: string;
  createdAt: number;
  attendees: PartyAttendee[];
  info: string;
  bannerImage?: string;
  noHost?: boolean;
  private?: boolean;
  price: PartyPrice[];
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
  status?: PartyAttendeeStatus;
  amountPaid?: number;
  orderId?: string;
  paidAt?: number;
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

export type PartyAttendeeStatus = "attending" | "applied";

export const partyAttendeeStatusEnglish: Record<PartyAttendeeStatus, string> = {
  attending: "attending",
  applied: "on the waitlist for",
};
