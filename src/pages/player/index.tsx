import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CreatePlayerContainer,
  Input,
  Select,
  FormsContainer,
  ButtonContainer,
} from "./styles";

const CreatePlayer = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("CLÉRICO");
  const [experience, setExperience] = useState(1);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlayer = {
      name,
      class: className,
      experience,
    };
    console.log("Novo Player Criado:", newPlayer);
    // call api create player
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <CreatePlayerContainer>
      <h1>Criar Player</h1>
      <form onSubmit={handleSubmit}>
        <FormsContainer>
          {"Nome:"}
          <Input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {"Classe:"}
          <Select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="CLÉRICO">Clérico</option>
            <option value="GUERREIRO">Guerreiro</option>
            <option value="ARQUEIRO">Arqueiro</option>
            <option value="MAGO">Mago</option>
          </Select>
          {"Experiência:"}
          <Input
            type="text"
            placeholder="Experiência (1-100)"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            min="1"
            max="100"
            required
          />
          <ButtonContainer>
            <Button type="submit">Criar Player</Button>
            <Button onClick={handleGoBack}>
              Voltar
            </Button>
          </ButtonContainer>
        </FormsContainer>
      </form>
    </CreatePlayerContainer>
  );
};

export default CreatePlayer;
