import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Titulo */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
        Bienvenido a <span className="text-blue-600">Teejosh</span>
      </h1>

      {/* Subtitulo */}
      <p className="mt-4 text-lg text-gray-600 max-w-xl">
        Sistema de gestión para inventario y ventas. Organiza tus productos,
        registra movimientos y mantén el control de tu tienda de forma sencilla.
      </p>

      {/* Carta de opciones rapidas (inv y vent) */}
      <div className="mt-10 bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          ¿Qué deseas hacer?
        </h2>

        <div className="flex flex-col gap-4">
          <Link
            to="/inventario"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Ver Inventario
          </Link>

          <button
            disabled
            className="bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Ventas (Próximamente)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
