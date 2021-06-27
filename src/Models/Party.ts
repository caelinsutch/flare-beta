export type Party = {
  partyId: string;
  address: string;
  date: number;
  name: string;
  createdAt: number;
  admin: string[];
  attendees: PartyAttendee[];
  info: string;
};

export type PartyAttendee = {
  userId: string;
  status?: "attending" | "applied";
  name: string;
  respondedAt: number;
};
