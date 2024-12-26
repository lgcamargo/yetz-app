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
import {
  balancedPlayersRoute,
  getPlayersRoute,
  resetPlayersGuildRoute,
} from "../../services/api/player";
import { useNavigate } from "react-router-dom";
import { Player } from "../../services/api/player/types";

const BalanceGuilds = () => {
  const [guilds, setGuilds] = React.useState<Guild[]>([]);
  const [outPlayers, setOutPlayers] = React.useState<Player[]>([]);
  const [maxPlayers, setMaxPlayers] = React.useState<number>(0);
  const [selectedPlayers, setSelectedPlayers] = React.useState<Set<string>>(new Set());
  const [errorMessage, setErrorMessage] = React.useState<string>("");

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

  const togglePlayerSelection = (playerId: string) => {
    setSelectedPlayers((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (updatedSelection.has(playerId)) {
        updatedSelection.delete(playerId);
      } else {
        updatedSelection.add(playerId);
      }
      return updatedSelection;
    });
  };

  const generateBalancedGuilds = async () => {
    try {
      const selectedPlayersArray = Array.from(selectedPlayers).map((id) =>
        outPlayers.find((player) => player.id === id)
      ) as Player[];

      const response = await balancedPlayersRoute({
        maxGuildPlayer: maxPlayers,
        selectedPlayers: selectedPlayersArray,
      });
      setSelectedPlayers(new Set());
      setGuilds(response);
      setErrorMessage("");
    } catch (error: any) {
      const errorMessage = JSON.parse(error.request.response);
      setErrorMessage(`Failed to generate balanced guilds motive: ${errorMessage.message}`);
    }
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
      {errorMessage && <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>}
      <StyledInfo>
        <ButtonContainer>
          <Button onClick={generateBalancedGuilds}>Gerar Guildas Balanceadas</Button>
          <Button onClick={resetGuilds}>Resetar Guildas</Button>
          <Button onClick={handleGoBack}>Voltar</Button>
        </ButtonContainer>
        <InputContainer>
          {"Selecione o número máximo de players por guilda (mínimo 3):"}
          <input
            type="number"
            id="maxPlayers"
            name="maxPlayers"
            min={3}
            onChange={(e) => setMaxPlayers(Number(e.target.value))}
          />
        </InputContainer>
      </StyledInfo>
      <h2>Lista de Guildas</h2>
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
                  <div key={player.id}>
                    {player.name} ({player.class} - {player.experience} XP)
                  </div>
                ))}
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Jogadores Fora das Guildas</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>Jogadores</TableHeader>
          </tr>
        </thead>
        <tbody>
          {outPlayers.map((player) => (
            <tr key={player.id}>
              <TableCell>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPlayers.has(player.id)}
                    onChange={() => togglePlayerSelection(player.id)}
                  />
                  {player.name} ({player.class} - {player.experience} XP)
                </label>
              </TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </BalanceGuildsContainer>
  );
};

export default BalanceGuilds;
