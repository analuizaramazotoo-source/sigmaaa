import { Guard, ConnectionFeedback } from './components/OriginalGuard';
import Chat from './pages/cidadao/chat/chat';
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
import CadastroEquipe from "./pages/equipe/login/CadastroEquipe";
// IMPORT CORRIGIDO BASEADO NA SUA ESTRUTURA DE PASTAS
import EsqueciSenha from "./pages/auth/login/esquecisenha"; 

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
import PerfilEquipe from "./pages/equipe/perfile/perfilequipe";

function App() {
  return (
    <Router>
      <Routes>
        {/* HOME INSTITUCIONAL */}
        <Route path="/" element={<Home />} />
        
        {/* LOGINS E CADASTROS DE AUTENTICAÇÃO */}
        <Route path="/login" element={<Login />} />
        <Route path="/logincidadao" element={<LoginCidadao />} />
        <Route path="/cadastroeq" element={<Guard roles={['gestao']}><CadastroEquipe /></Guard>} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} /> {/* Rota adicionada */}

        {/* ROTAS CIDADÃO */}
        <Route path="/cidadao" element={<Guard><Homec /></Guard>} />
        <Route path="/relatar-problema" element={<Guard><RelatarProblema /></Guard>} />
        <Route path="/solicitar" element={<Guard><Solicitar /></Guard>} />
        <Route path="/status" element={<Guard><Status /></Guard>} />
        <Route path="/denuncia" element={<Guard><DenunciaUrgente /></Guard>} />
        <Route path="/perfil" element={<Guard><Perfil /></Guard>} />
        <Route path="/alterar" element={<Guard><Alterar /></Guard>} />
        <Route path="/cadastro" element={<CadastroCidadao />} />

        {/* ROTAS GESTÃO */}
        <Route path="/homeg" element={<Guard roles={['gestao']}><Homeg /></Guard>} />
        <Route path="/geoprocessamento" element={<Guard roles={['gestao']}><Geoprocessamento /></Guard>} />
        <Route path="/fila-fiscalizacao" element={<Guard roles={['gestao']}><FilaFiscalizacao /></Guard>} />
        <Route path="/autos-notificacoes-gestao" element={<Guard roles={['gestao']}><AutosNotificacoesGestao /></Guard>} />
        <Route path="/relatorios-tecnicos-gestao" element={<Guard roles={['gestao']}><RelatoriosTecnicosGestao /></Guard>} />
        <Route path="/legislacao" element={<Guard roles={['gestao']}><Legislacao /></Guard>} />
        <Route path="/perfilg" element={<Guard roles={['gestao']}><Perfilg /></Guard>} />
        <Route path="/cadastrog" element={<Guard roles={['gestao']}><Cadastrog /></Guard>} />
        <Route path="/config" element={<Guard roles={['gestao']}><Configuracoes /></Guard>} />

        {/* ROTAS EQUIPE */}
        <Route path="/homee" element={<Guard roles={['gestao', 'equipe']}><HomeE /></Guard>} />
        <Route path="/autoe" element={<Guard roles={['gestao', 'equipe']}><AutosNotificacoes /></Guard>} />
        <Route path="/filae" element={<Guard roles={['gestao', 'equipe']}><FilaVistorias /></Guard>} />
        <Route path="/leise" element={<Guard roles={['gestao', 'equipe']}><Leis /></Guard>} />
        <Route path="/relatorioe" element={<Guard roles={['gestao', 'equipe']}><RelatoriosTecnicos /></Guard>} />
        <Route path="/perfile" element={<Guard roles={['gestao', 'equipe']}><PerfilEquipe /></Guard>} />
        <Route path="/chat" element={<Guard><Chat /></Guard>} />
      </Routes>
      <ConnectionFeedback />
    </Router>
  );
}

export default App;