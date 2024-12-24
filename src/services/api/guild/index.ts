import ApiClient from "../../requester";
import { CreateGuild } from "./types";
import { Guild } from "./types";

const apiClient = new ApiClient(import.meta.env.VITE_APP_API_URL || "");

export const getGuildsRoute = (): Promise<Guild[]> => 
  apiClient.get('/guild').then(response => response.data as Guild[]);

export const getGuildRoute = (id: string): Promise<Guild> => 
  apiClient.get(`/guild/${id}`).then(response => response.data as Guild);

export const createGuildRoute = (data: CreateGuild): Promise<Guild> => 
  apiClient.post('/guild', data).then(response => response.data as Guild);

export const updateGuildRoute = (id: string, data: CreateGuild): Promise<Guild> => 
  apiClient.put(`/guild/${id}`, data).then(response => response.data as Guild);

export const deleteGuildRoute = (id: string): Promise<void> => 
  apiClient.delete(`/guild/${id}`).then(response => response.data as void);
