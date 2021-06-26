export type User = {
  userId: string;
  name: string;
  phone: string;
  instagram: string;
  isAdmin?: boolean;
  createdAt: number;
};

export type NewUser = Omit<User, "createdAt" | "userId" | "points">;
