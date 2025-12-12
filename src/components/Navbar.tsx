import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  onLogout: () => void;
};

const Navbar = ({ onLogout }: NavbarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    onLogout(); // 🔥 tell App to update state
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <ul className="flex gap-6 text-lg">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/inventario">Inventario</Link>
          </li>
          <li>
            <Link to="/ventas">Ventas</Link>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
