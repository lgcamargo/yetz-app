import { Link } from "react-router-dom";
import { 
  HomeContainer,
  Button,
} from "./styles";

const Home = () => {
  return (
    <HomeContainer>
      <h1>Bem-vindo ao Gerenciador de Guildas</h1>
      <Link to="/create-player">
        <Button>Criar um Player</Button>
      </Link>
      <Link to="/create-guild">
        <Button>Criar uma Guilda</Button>
      </Link>
      <Link to="/balance-guilds">
        <Button>Gerar Guildas Balanceadas</Button>
      </Link>
    </HomeContainer>
  );
};

export default Home;
