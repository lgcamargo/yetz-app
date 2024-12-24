import ApiClient from "../../requester";
import { Guild } from "../guild/types";
import { CreatePlayer, Player } from "./types";

const apiClient = new ApiClient(import.meta.env.VITE_APP_API_URL || "");

export const getPlayersRoute = (): Promise<Player[]> => 
  apiClient.get('/player').then(response => response.data as Player[]);

export const getPlayerRoute = (id: string): Promise<Player> => 
  apiClient.get(`/player/${id}`).then(response => response.data as Player);

export const createPlayerRoute = (data: CreatePlayer): Promise<Player> => 
  apiClient.post('/player', data).then(response => response.data as Player);

export const updatePlayerRoute = (id: string, data: CreatePlayer): Promise<Player> => 
  apiClient.put(`/player/${id}`, data).then(response => response.data as Player);

export const balancedPlayersRoute = (maxPlayers: number): Promise<Guild[]> => 
  apiClient.post(`/player/balanced`, {maxGuildPlayers: maxPlayers}).then(response => response.data as Guild[]);

export const resetPlayersGuildRoute = (): Promise<Player[]> => 
  apiClient.post(`/player/reset-players-guild`, null).then(response => response.data as Player[]);

export const deletePlayerRoute = (id: string): Promise<void> => 
  apiClient.delete(`/player/${id}`).then(response => response.data as void);
