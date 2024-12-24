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
import { balancedPlayersRoute, getPlayersRoute, resetPlayersGuildRoute } from "../../services/api/player";
import { useNavigate } from "react-router-dom";
import { Player } from "../../services/api/player/types";

const BalanceGuilds = () => {
  const [guilds, setGuilds] = React.useState<Guild[]>([]);
  const [outPlayers, setOutPlayers] = React.useState<Player[]>([]);
  const [maxPlayers, setMaxPlayers] = React.useState<number>(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchGuilds = async () => {
      try {
        const response = await getGuildsRoute();
        setGuilds(response);
      } catch (error) {
        console.error("Failed to fetch guilds", error);
      }
    };

    const fetchPlayers = async () => {
      try {
        const response = await getPlayersRoute();
        setOutPlayers(response);
      } catch (error) {
        console.error("Failed to fetch players", error);
      }
    };

    fetchPlayers();
    fetchGuilds();
  }, []);

  const generateBalancedGuilds = () => {
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

  const handleGoBack = () => {
    navigate("/");
  };
  
  return (
    <BalanceGuildsContainer>
      <h1>Guildas Balanceadas</h1>
      <StyledInfo>
        <ButtonContainer>
          <Button onClick={generateBalancedGuilds}>Gerar Guildas Balanceadas</Button>
          <Button onClick={resetGuilds}>Resetar guildas</Button>
          <Button onClick={handleGoBack}>voltar</Button>
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
      <Table>
        <thead>
          <tr>
            <TableHeader>Jogadores</TableHeader>
          </tr>
        </thead>
        <tbody>
        <TableCell>{outPlayers.map((player) => (
            <div key={player.name}>
            {player.name} ({player.class} - {player.experience} XP)
          </div>
          ))}</TableCell>
        </tbody>
      </Table>
    </BalanceGuildsContainer>
  );
};

export default BalanceGuilds;
