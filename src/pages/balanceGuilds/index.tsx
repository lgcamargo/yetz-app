import { useState } from "react";
import { BalanceGuildsContainer, Button, Table, TableCell, TableHeader } from "./styles";

const BalanceGuilds = () => {
  const [guilds] = useState([
    {
      id: "1",
      name: "Guilda dos Heróis",
      players: [
        { name: "João", class: "GUERREIRO", experience: 50 },
        { name: "Ana", class: "CLÉRICO", experience: 30 },
      ],
    },
    {
      id: "2",
      name: "Guilda dos Magos",
      players: [
        { name: "Carlos", class: "MAGO", experience: 70 },
        { name: "Maria", class: "ARQUEIRO", experience: 40 },
      ],
    },
  ]);

  const generateBalancedGuilds = () => {
    console.log("Gerando guildas balanceadas...");
  };

  return (
    <BalanceGuildsContainer>
      <h1>Guildas Balanceadas</h1>
      <Button onClick={generateBalancedGuilds}>Gerar Guildas Balanceadas</Button>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nome da Guilda</TableHeader>
            <TableHeader>Jogadores</TableHeader>
          </tr>
        </thead>
        <tbody>
          {guilds.map((guild) => (
            <tr key={guild.id}>
              <TableCell>{guild.name}</TableCell>
              <TableCell>
                {guild.players.map((player) => (
                  <div key={player.name}>
                    {player.name} ({player.class} - {player.experience} XP)
                  </div>
                ))}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </BalanceGuildsContainer>
  );
};

export default BalanceGuilds;
