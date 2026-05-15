// src/App.jsx

import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/home/home";

import RelatarProblema from "./pages/cidadao/relatar/RelatarProblema";

function App() {
  return (
    <Router>

      <Routes>

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

      </Routes>

    </Router>
  );
}

export default App;