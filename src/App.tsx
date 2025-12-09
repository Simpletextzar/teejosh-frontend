import Inventory from "./components/InventoryView";
import VentasView from "./components/VentasView";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  const authenticated = localStorage.getItem("auth") === "true";

  return (
    <div>
      {!authenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          <Navbar />
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
