import { Player } from "../player/types";

export type CreateGuild = {
  name: string;
}

export type Guild = {
  id: string;
  name: string;
  players: Player[]

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}