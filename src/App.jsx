// src/App.jsx

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/home";
import CadastroCidadao from "./pages/auth/cadastrocidadao/cadastrocidadao";


import RelatarProblema from "./pages/cidadao/relatar/RelatarProblema";

function App() {
  return (
    <Router>

      <Routes>
<<<<<<< HEAD

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* RELATAR PROBLEMA */}
        <Route
          path="/relatar-problema"
          element={<RelatarProblema />}
        />
=======
        <Route path="/" element={<Home />} />
        <Route path="/CadastroCidadao" element={<CadastroCidadao />} />
>>>>>>> 1cef8574c29861c7cf5675f8e8dffd2d1987abc5

      </Routes>

    </Router>
  );
}

export default App;