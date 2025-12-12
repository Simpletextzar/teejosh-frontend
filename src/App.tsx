import { useState, useEffect } from "react";
import Inventory from "./components/InventoryView";
import VentasView from "./components/VentasView";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // Sync state with localStorage
  useEffect(() => {
    const stored = localStorage.getItem("auth") === "true";
    if (stored !== authenticated) {
      setAuthenticated(stored);
    }
  }, []);

  return (
    <div>
      {!authenticated ? (
        <Routes>
          <Route
            path="/login"
            element={<Login onLogin={() => setAuthenticated(true)} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar onLogout={() => setAuthenticated(false)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventario" element={<Inventory />} />
            <Route path="/ventas" element={<VentasView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
