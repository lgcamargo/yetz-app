import React, { useState } from "react";
import {
  Button,
  CreateGuildContainer,
  Input,
  ButtonContainer,
  FormsContainer
} from "./styles";
import { useNavigate } from "react-router-dom";
import { CreateGuild as CreateType } from "../../services/api/guild/types";
import { createGuildRoute } from "../../services/api/guild";

const CreateGuild = () => {
  const [guildName, setGuildName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGuild: CreateType = {
      name: guildName,
    };
    createGuildRoute(newGuild).then(() => {
      alert("Guild created successfully!");
      navigate("/");
    });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <CreateGuildContainer>
      <h1>Criar Guilda</h1>
      <form onSubmit={handleSubmit}>
        <FormsContainer> 
          <Input
            type="text"
            placeholder="Nome da Guilda"
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type="submit">Criar Guilda</Button>
            <Button onClick={handleGoBack}>Voltar</Button>
          </ButtonContainer>
        </FormsContainer>
      </form>
    </CreateGuildContainer>
  );
};

export default CreateGuild;
