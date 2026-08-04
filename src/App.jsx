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
import Perfilg from "./pages/gestao/perfil/perfil"
import Configuracoes from "./pages/gestao/config/configuracoes";
import Cadastroeq from "./pages/equipe/cadastroequipe/cadastroeq";


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

        {/* CADASTRO */}
        <Route
          path="/cadastro"
          element={<CadastroCidadao />}
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

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* LOGIN CIDADÃO */}
        <Route
          path="/logincidadao"
          element={<LoginCidadao />}
        />
        {/* LOGIN GESTOR */}
       <Route
          path="/cadastrog"
          element={<Cadastrog />}
       />
        {/* HOME GESTOR */}
      <Route
     path="/homeg"
     element={<Homeg />}
        />
 
         {/* PERFIL GESTOR */}
      <Route
         path="/perfilg"
        element={<Perfilg />}
        />

        {/* CONFIG */}
        <Route
          path="/config"
          element={<Configuracoes />}
        />

                {/* Cadastroeq */}
        <Route
          path="/cadastroeq"
          element={<Cadastroeq />}
        />



      </Routes>
    </Router>
  );
}

export default App;