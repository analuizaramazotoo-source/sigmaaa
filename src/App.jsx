import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Telas Gerais e Cidadão
import Home from "./pages/home/home";
import Homec from "./pages/cidadao/homec/homec";
import RelatarProblema from "./pages/cidadao/relatar/RelatarProblema";
import Solicitar from "./pages/cidadao/solicitar/solicitar";
import Perfil from "./pages/cidadao/perfil/perfil";
import Status from "./pages/cidadao/status/status";
import Alterar from "./pages/cidadao/alterar/alterar";
import DenunciaUrgente from "./pages/cidadao/denuncia/denunciaurgente";

// Autenticação
import Login from "./pages/auth/login/login";
import LoginCidadao from "./pages/auth/login/logincidadao/logincidadao";
import CadastroCidadao from "./pages/auth/cadastroc/cadastrocidadao";
import Cadastrog from "./pages/gestao/cadastrog/cadastrog";
import CadastroEquipe from "./pages/equipe/login/CadastroEquipe"; // Nome atualizado

// MÓDULO GESTÃO
import Homeg from "./pages/gestao/homeg/homeg";
import Perfilg from "./pages/gestao/perfil/perfil";
import Configuracoes from "./pages/gestao/config/configuracoes";

import Geoprocessamento from "./pages/gestao/geoprocessamento/geoprocessamento"; 
import FilaFiscalizacao from "./pages/gestao/fiscalizacao/filaFiscalizacao";
import AutosNotificacoesGestao from "./pages/gestao/autos/autosNotificacoes";
import RelatoriosTecnicosGestao from "./pages/gestao/relatorio/relatoriosTecnicos";
import Legislacao from "./pages/gestao/legislacao/legislacao";

// MÓDULO EQUIPE
import HomeE from "./pages/equipe/homee/homee";
import AutosNotificacoes from "./pages/equipe/auto/autosnotificacoes";
import FilaVistorias from "./pages/equipe/fila/filavistorias";
import Leis from "./pages/equipe/leis/leis";
import RelatoriosTecnicos from "./pages/equipe/relatorio/relatoriostecnicos";

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME INSTITUCIONAL */}
        <Route path="/" element={<Home />} />
        
        {/* LOGINS E CADASTROS DE AUTENTICAÇÃO */}
        <Route path="/login" element={<Login />} />
        <Route path="/logincidadao" element={<LoginCidadao />} />
        <Route path="/cadastroeq" element={<CadastroEquipe />} /> {/* Elemento atualizado */}

        {/* ROTAS CIDADÃO */}
        <Route path="/cidadao" element={<Homec />} />
        <Route path="/relatar-problema" element={<RelatarProblema />} />
        <Route path="/solicitar" element={<Solicitar />} />
        <Route path="/status" element={<Status />} />
        <Route path="/denuncia" element={<DenunciaUrgente />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/alterar" element={<Alterar />} />
        <Route path="/cadastro" element={<CadastroCidadao />} />

        {/* ROTAS GESTÃO */}
        <Route path="/homeg" element={<Homeg />} />
        <Route path="/geoprocessamento" element={<Geoprocessamento />} />
        <Route path="/fila-fiscalizacao" element={<FilaFiscalizacao />} />
        <Route path="/autos-notificacoes-gestao" element={<AutosNotificacoesGestao />} />
        <Route path="/relatorios-tecnicos-gestao" element={<RelatoriosTecnicosGestao />} />
        <Route path="/legislacao" element={<Legislacao />} />
        <Route path="/perfilg" element={<Perfilg />} />
        <Route path="/cadastrog" element={<Cadastrog />} />
        <Route path="/config" element={<Configuracoes />} />

        {/* ROTAS EQUIPE */}
        <Route path="/homee" element={<HomeE />} />
        <Route path="/autoe" element={<AutosNotificacoes />} />
        <Route path="/filae" element={<FilaVistorias />} />
        <Route path="/leise" element={<Leis />} />
        <Route path="/relatorioe" element={<RelatoriosTecnicos />} />
      </Routes>
    </Router>
  );
}

export default App;