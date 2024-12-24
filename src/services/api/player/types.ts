export enum ClassEnum {
  Mago = 'Mago',
  Guerreiro = 'Guerreiro',
  Arqueiro = 'Arqueiro',
  Clérico = 'Clérico',
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