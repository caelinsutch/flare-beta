import { UserDbo } from "./User";

type RootParty = {
  partyId: string;
  address: string;
  date: number;
  name: string;
  createdAt: number;
  attendees: PartyAttendee[];
  info: string;
};

export type PartyDbo = {
  admin: string[];
} & RootParty;

export type Party = {
  admin: UserDbo[];
} & RootParty;

export type PartyAttendee = {
  userId: string;
  status?: "attending" | "applied";
  name: string;
  createdAt: number;
};
