import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/home";
import CadastroCidadao from "./pages/auth/cadastrocidadao/cadastrocidadao";
import RelatarProblema from "./pages/cidadao/relatar/RelatarProblema";
import Homec from "./pages/cidadao/homec/homec";
import HB from "./pages/cidadao/HB/HB";
import Solicitar from "./pages/cidadao/solicitar/solicitar";

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
        <Route path="/hb" element={<HB />}  />

         {/* Solicitar */}
        <Route path="/solicitar" element={<Solicitar />}  />

      </Routes>
    </Router>
  );
}

export default App;