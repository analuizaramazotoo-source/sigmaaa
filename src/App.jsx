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
import Solicitar from "./pages/cidadao/solicitar/solicitar";
import Perfil from "./pages/cidadao/perfil/perfil";
import Status from "./pages/cidadao/status/status";
import Alterar from "./pages/cidadao/alterar/alterar";
import Login from "./pages/auth/login/login";
import LoginCidadao from "./pages/auth/login/logincidadao/logincidadao";
import Cadastrog from "./pages/gestao/cadastrog/cadastrog";
import Homeg from "./pages/gestao/homeg/homeg";
import DenunciaUrgente from "./pages/cidadao/denuncia/denunciaurgente";
import Perfilg from "./pages/gestao/perfil/perfil";
import Configuracoes from "./pages/gestao/config/configuracoes";

//equipe
import HomeE from "./pages/equipe/homee/homee";
import AutosNotificacoes from "./pages/equipe/auto/autosnotificacoes"
import FilaVistorias from "./pages/equipe/fila/filavistorias"
import Leis from "./pages/equipe/leis/leis"
import RelatoriosTecnicos from "./pages/equipe/relatorio/relatoriostecnicos"


// IMPORTAÇÃO CORRIGIDA COM O CAMINHO REAL DA PASTA DE EQUIPE
import LoginEquipe from "./pages/equipe/login/loginEquipe";

function App() {
  return (
    <Router>
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* HOME CIDADÃO */}
        <Route path="/cidadao" element={<Homec />} />

        {/* RELATAR PROBLEMA */}
        <Route
          path="/relatar-problema"
          element={<RelatarProblema />}
        />

        {/* CADASTROS */}
        <Route
          path="/cadastro"
          element={<CadastroCidadao />}
        />
        <Route
          path="/cadastrog"
          element={<Cadastrog />}
        />

        {/* ROTA DA EQUIPE (Redireciona para loginEquipe) */}
        <Route
          path="/cadastroeq"
          element={<LoginEquipe />}
        />

        {/* SOLICITAR */}
        <Route
          path="/solicitar"
          element={<Solicitar />}
        />

        {/* PERFIL */}
        <Route
          path="/perfil"
          element={<Perfil />}
        />

        {/* STATUS */}
        <Route
          path="/status"
          element={<Status />}
        />

        {/* DENUNCIA URGENTE */}
        <Route
          path="/denuncia"
          element={<DenunciaUrgente />}
        />

        {/* ALTERAR */}
        <Route
          path="/alterar"
          element={<Alterar />}
        />

        {/* LOGINS */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/logincidadao"
          element={<LoginCidadao />}
        />

        {/* GESTÃO */}
        <Route
          path="/homeg"
          element={<Homeg />}
        />
        <Route
          path="/perfilg"
          element={<Perfilg />}
        />
        <Route
          path="/config"
          element={<Configuracoes />}
        />




        {/* HOME EQUIPE */}
        <Route
          path="/homee"
          element={<HomeE />}
        />

        {/* AUTO EQUIPE */}
        <Route
          path="/autoe"
          element={<AutosNotificacoes />}
        />

        {/* FILA EQUIPE */}
        <Route
          path="/filae"
          element={<FilaVistorias />}
        />

        {/* LEIS EQUIPE */}
        <Route
          path="/leise"
          element={<Leis />}
        />

        {/* RELATORIO EQUIPE */}
        <Route
          path="/relatorioe"
          element={<RelatoriosTecnicos />}
        />

      </Routes>
    </Router>
  );
}

export default App;