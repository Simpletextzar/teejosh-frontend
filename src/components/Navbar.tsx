import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.href = "/login"; // redirect
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* LEFT SIDE LINKS */}
        <ul className="flex gap-6 text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/inventario"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Inventario
            </Link>
          </li>

          <li>
            <Link
              to="/ventas"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Ventas
            </Link>
          </li>
        </ul>

        {/* RIGHT SIDE LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
