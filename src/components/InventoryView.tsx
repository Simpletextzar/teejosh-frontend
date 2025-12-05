import { useEffect, useState } from "react";
import {
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  fetchProductos,
  fetchEdiciones,
  fetchLenguajes,
} from "../api";

interface Item {
  id: number;
  precio: number;
  cantidad: number;
  fecha_ingreso: string;
  producto: { id: number; nombre: string };
  edicion?: { id: number; nombre: string } | null;
  lenguaje: { id: number; nombre: string };
}

const InventoryView = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [productos, setProductos] = useState<any[]>([]);
  const [ediciones, setEdiciones] = useState<any[]>([]);
  const [lenguajes, setLenguajes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    id_producto: "",
    precio: "",
    cantidad: "",
    id_edicion: "",
    id_lenguaje: "",
  });

  // Load items + reference data
  const loadData = async () => {
    setLoading(true);
    const [itemsRes, productosRes, edicionesRes, lenguajesRes] =
      await Promise.all([
        fetchItems(),
        fetchProductos(),
        fetchEdiciones(),
        fetchLenguajes(),
      ]);

    setItems(itemsRes);
    setProductos(productosRes);
    setEdiciones(edicionesRes);
    setLenguajes(lenguajesRes);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      id_producto: "",
      precio: "",
      cantidad: "",
      id_edicion: "",
      id_lenguaje: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Item) => {
    setEditingId(item.id);
    setForm({
      id_producto: String(item.producto.id),
      precio: String(item.precio),
      cantidad: String(item.cantidad),
      id_edicion: item.edicion?.id ? String(item.edicion.id) : "",
      id_lenguaje: String(item.lenguaje.id),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      id_producto: Number(form.id_producto),
      precio: Number(form.precio),
      cantidad: Number(form.cantidad),
      id_edicion: form.id_edicion ? Number(form.id_edicion) : null,
      id_lenguaje: Number(form.id_lenguaje),
    };

    editingId
      ? await updateItem(editingId, payload)
      : await createItem(payload);

    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    loadData();
  };

  if (loading) return <p className="p-8 text-lg">Cargando...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inventario</h1>

      {/* Button */}
      <button
        onClick={openCreateModal}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6"
      >
        + Agregar ítem
      </button>

      {/* Table */}
      <table className="w-full bg-white shadow rounded-lg text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">ID</th>
            <th className="p-3">Producto</th>
            <th className="p-3">Precio</th>
            <th className="p-3">Cantidad</th>
            <th className="p-3">Edición</th>
            <th className="p-3">Lenguaje</th>
            <th className="p-3">Fecha ingreso</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.id}</td>
              <td className="p-3 text-left">{item.producto.nombre}</td>
              <td className="p-3">S/ {item.precio}</td>
              <td className="p-3">{item.cantidad}</td>
              <td className="p-3">{item.edicion?.nombre || "-"}</td>
              <td className="p-3">{item.lenguaje.nombre}</td>
              <td className="p-3">
                {new Date(item.fecha_ingreso).toLocaleDateString("es-PE")}
              </td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="bg-yellow-500 px-3 py-1 text-white rounded"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 px-3 py-1 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------- MODAL -------- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar ítem" : "Agregar ítem"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* PRODUCTO */}
              <select
                name="id_producto"
                className="w-full border p-2 rounded"
                value={form.id_producto}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>

              {/* PRECIO */}
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                className="w-full border p-2 rounded"
                value={form.precio}
                onChange={handleChange}
                required
              />

              {/* CANTIDAD */}
              <input
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                className="w-full border p-2 rounded"
                value={form.cantidad}
                onChange={handleChange}
                required
              />

              {/* EDICIÓN */}
              <select
                name="id_edicion"
                className="w-full border p-2 rounded"
                value={form.id_edicion}
                onChange={handleChange}
              >
                <option value="">Sin edición</option>
                {ediciones.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>

              {/* LENGUAJE */}
              <select
                name="id_lenguaje"
                className="w-full border p-2 rounded"
                value={form.id_lenguaje}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un lenguaje</option>
                {lenguajes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.nombre}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>

                <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                  {editingId ? "Guardar cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryView;
