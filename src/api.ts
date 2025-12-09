// src/api.ts
const BASE_URL = "https://teejosh-backend.onrender.com";

export async function fetchItems() {
  const res = await fetch(`${BASE_URL}/items`);
  if (!res.ok) throw new Error("Error al obtener los items");
  return res.json();
}

export async function createItem(data: any) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear ítem");
  return res.json();
}

export async function updateItem(id: number, data: any) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar ítem");
  return res.json();
}

export async function deleteItem(id: number) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar ítem");
  return res.json();
}

export async function fetchProductos() {
  const res = await fetch(`${BASE_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function fetchEdiciones() {
  const res = await fetch(`${BASE_URL}/ediciones`);
  if (!res.ok) throw new Error("Error al obtener ediciones");
  return res.json();
}

export async function fetchLenguajes() {
  const res = await fetch(`${BASE_URL}/lenguajes`);
  if (!res.ok) throw new Error("Error al obtener lenguajes");
  return res.json();
}

export async function fetchVentas() {
  const res = await fetch(`${BASE_URL}/ventas`);
  if (!res.ok) throw new Error("Error obteniendo ventas");
  return res.json();
}

export async function createVenta(data: any) {
  const res = await fetch(`${BASE_URL}/ventas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear la venta");
  return res.json();
}

export async function deleteVenta(id: number) {
  const res = await fetch(`${BASE_URL}/ventas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error eliminando venta");
  return res.json();
}
