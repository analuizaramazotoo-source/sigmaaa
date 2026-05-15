import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/home";
import CadastroCidadao from "./pages/auth/cadastrocidadao/cadastrocidadao";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CadastroCidadao" element={<CadastroCidadao />} />

      </Routes>
    </Router>
  );
}

export default App;