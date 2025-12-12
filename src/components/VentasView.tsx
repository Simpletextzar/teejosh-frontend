import { useEffect, useState } from "react";
import { fetchVentas, fetchProductos, createVenta, deleteVenta } from "../api";

const VentasView = () => {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const [productosVenta, setProductosVenta] = useState<any[]>([]);
  const [m_pago, setMPago] = useState("Efectivo");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [v, p] = await Promise.all([fetchVentas(), fetchProductos()]);
      setVentas(v);
      setProductos(p);
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
    setLoading(false);
  };

  const addProducto = () => {
    setProductosVenta([
      ...productosVenta,
      { id_producto: "", cantidad: 1, monto: 0 },
    ]);
  };

  const updateProducto = (idx: number, field: string, value: any) => {
    const updated = [...productosVenta];
    updated[idx][field] = value;
    setProductosVenta(updated);
  };

  const saveVenta = async () => {
    const payload = {
      m_pago,
      productos: productosVenta, // IMPORTANT FIX ✔
    };

    console.log("📤 Enviando venta:", payload);

    try {
      await createVenta(payload);
      setModal(false);
      setProductosVenta([]);
      loadData();
    } catch (err) {
      console.error("Error creando venta:", err);
      alert("Error creando la venta.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Ventas</h1>

      <button
        onClick={() => setModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
      >
        + Nueva venta
      </button>

      {/* Tabla */}
      <table className="w-full bg-white shadow">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Método pago</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Detalle</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {ventas.map((v: any) => (
            <tr key={v.id_reg_venta}>
              <td className="py-3">{v.id_reg_venta}</td>
              <td className="py-3">S/ {v.monto_total}</td>
              <td className="py-3">{v.m_pago}</td>
              <td className="py-3">{v.fecha?.split("T")[0]}</td>

              <td className="py-3">
                {v.producto_venta.map((p: any) => {
                  const prod = productos.find(
                    (x: any) => x.id === p.id_producto
                  );
                  const nombre = prod
                    ? prod.nombre
                    : `Producto ${p.id_producto}`;

                  return (
                    <div key={p.id}>
                      {nombre} — Cant: {p.cantidad} — S/ {p.monto}
                    </div>
                  );
                })}
              </td>

              <td>
                <button
                  onClick={() => deleteVenta(v.id_reg_venta).then(loadData)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Nueva Venta</h2>

            <label>Método de pago:</label>
            <select
              value={m_pago}
              onChange={(e) => setMPago(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            >
              <option>Efectivo</option>
              <option>Tarjeta</option>
              <option>Yape</option>
              <option>Plin</option>
            </select>

            <h3 className="font-semibold mb-2">Productos</h3>

            {productosVenta.map((pv, i) => (
              <div key={i} className="border p-2 rounded mb-2">
                <select
                  className="w-full border p-1 mb-1"
                  value={pv.id_producto}
                  onChange={(e) =>
                    updateProducto(i, "id_producto", Number(e.target.value))
                  }
                >
                  <option value="">Seleccione producto</option>
                  {productos.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>

                <label className="text-sm font-medium">Cantidad</label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  className="w-full border p-1 mb-1"
                  value={pv.cantidad}
                  onChange={(e) =>
                    updateProducto(i, "cantidad", Number(e.target.value))
                  }
                />

                <label className="text-sm font-medium">Precio / Monto</label>
                <input
                  type="number"
                  placeholder="Monto"
                  className="w-full border p-1"
                  value={pv.monto}
                  onChange={(e) =>
                    updateProducto(i, "monto", Number(e.target.value))
                  }
                />
              </div>
            ))}

            <button
              className="bg-green-600 text-white px-4 py-2 rounded w-full mb-3"
              onClick={addProducto}
            >
              + Agregar producto
            </button>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={saveVenta}
            >
              Guardar venta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasView;
