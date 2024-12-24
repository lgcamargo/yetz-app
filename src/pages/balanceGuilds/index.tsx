import React from "react";
import { getGuildsRoute } from "../../services/api/guild";
import { Guild } from "../../services/api/guild/types";
import {
  BalanceGuildsContainer,
  Button,
  Table,
  TableCell,
  TableHeader,
  ButtonContainer,
  StyledInfo,
  InputContainer,
} from "./styles";
import { balancedPlayersRoute, resetPlayersGuildRoute } from "../../services/api/player";

const BalanceGuilds = () => {
  const [guilds, setGuilds] = React.useState<Guild[]>([]);
  const [maxPlayers, setMaxPlayers] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await getGuildsRoute();
        setGuilds(response);
      } catch (error) {
        console.error("Failed to fetch guilds", error);
      }
    };

    fetchGuilds();
  }, []);

  const generateBalancedGuilds = () => {
    console.log('maxPLayers', maxPlayers)
    balancedPlayersRoute(maxPlayers).then((response) => {
      setGuilds(response);
    }).catch((error) => {
      console.error("Failed to generate balanced guilds", error);
    });
  };

  const resetGuilds = async () => {
    try {
      await resetPlayersGuildRoute();
      const response = await getGuildsRoute();
      setGuilds(response);
    } catch (error) {
      console.error("Failed to reset guilds", error);
    }
  };
  
  return (
    <BalanceGuildsContainer>
      <h1>Guildas Balanceadas</h1>
      <StyledInfo>
        <ButtonContainer>
          <Button onClick={generateBalancedGuilds}>Gerar Guildas Balanceadas</Button>
          <Button onClick={resetGuilds}>Resetar guildas</Button>
        </ButtonContainer>
        <InputContainer>
          {'Selecione o número máximo de players (mínimo 3):'}
          <input
            type="number"
            id="maxPlayers"
            name="maxPlayers"
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
          />
        </InputContainer>
      </StyledInfo>
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
