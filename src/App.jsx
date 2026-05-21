import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/home";
import CadastroCidadao from "./pages/auth/cadastroc/cadastrocidadao";
import RelatarProblema from "./pages/cidadao/relatar/RelatarProblema";
import Homec from "./pages/cidadao/homec/homec";
import HB from "./pages/cidadao/HB/HB";
import Solicitar from "./pages/cidadao/solicitar/solicitar";
import Chat from "./pages/cidadao/chat/chat";
import Perfil from "./pages/cidadao/perfil/perfil";
import Status from "./pages/cidadao/status/status";
import Alterar from "./pages/cidadao/alterar/alterar";



function App() {
  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* HOME CIDADÃO */}
        <Route path="/cidadao" element={<Homec />} />

        {/* RELATAR PROBLEMA */}
        <Route path="/relatar-problema" element={<RelatarProblema />} />

        {/* CADASTRO */}
        <Route path="/cadastro" element={<CadastroCidadao />} />

        {/* HB */}
        <Route path="/hb" element={<HB />} />

        {/* SOLICITAR */}
        <Route path="/solicitar" element={<Solicitar />} />

        {/* CHAT */}
        <Route path="/chat" element={<Chat />} />

        {/* PERFIL */}
        <Route path="/perfil" element={<Perfil />} />

        {/* STATUS */}
        <Route path="/status" element={<Status />} /> 

        {/* ALTERAR */}
        <Route path="/alterar" element={<Alterar />} />
        
      

      </Routes>
    </Router>
  );
}

export default App;
