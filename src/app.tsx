import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreatePlayer from "./pages/player";
import CreateGuild from "./pages/guild";
import BalanceGuilds from "./pages/balanceGuilds";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-player" element={<CreatePlayer />} />
      <Route path="/create-guild" element={<CreateGuild />} />
      <Route path="/balance-guilds" element={<BalanceGuilds />} />
    </Routes>
  );
};

export default App;
