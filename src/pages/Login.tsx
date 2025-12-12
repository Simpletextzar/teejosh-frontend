import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  onLogin: () => void;
};

const Login = ({ onLogin }: LoginProps) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === "teejosh" && pass === "esis3412") {
      localStorage.setItem("auth", "true");
      onLogin(); // 🔥 notify App that login succeeded
      navigate("/"); // 🔥 go to home
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-200">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          className="w-full border p-2 rounded mb-4"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded mb-4"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
