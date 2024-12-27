export enum ClassEnum {
  Mago = 'MAGO',
  Guerreiro = 'GUERREIRO',
  Arqueiro = 'ARQUEIRO',
  Clérigo = 'CLÉRIGO',
}

export type CreatePlayer = {
  name: string;
  class: ClassEnum;
  experience: number;
}

export type Player = {
  id: string;
  name: string;
  class: ClassEnum;
  experience: number;
  guildId: string | null;

  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type BalancedPlayers = {
  maxGuildPlayers: number;
  selectedPlayers: Player[];
}