export type SongRequest = {
  createdAt: number;
  requester: string;
  status?: "approved" | "rejected";
  text: string;
};
