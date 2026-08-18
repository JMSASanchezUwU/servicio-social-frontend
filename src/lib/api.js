const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ==========================================
// PROYECTOS
// ==========================================

export async function fetchProyectos(userId) {
  const res = await fetch(`${API_BASE}/proyectos`, {
    headers: { 'user-id': userId },
  });
  if (!res.ok) throw new Error('Error al cargar proyectos');
  return res.json();
}

export async function crearProyecto(usuarioId, nombre) {
  const res = await fetch(`${API_BASE}/proyectos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario_id: usuarioId, nombre }),
  });
  if (!res.ok) throw new Error('Error al crear proyecto');
  return res.json();
}

export async function actualizarProyecto(id, nombre) {
  const res = await fetch(`${API_BASE}/proyectos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre }),
  });
  if (!res.ok) throw new Error('Error al actualizar proyecto');
  return res.json();
}

export async function eliminarProyecto(id) {
  const res = await fetch(`${API_BASE}/proyectos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar proyecto');
  return true;
}

// ==========================================
// ACTIVIDADES
// ==========================================

export async function fetchActividades(usuarioId) {
  const url = usuarioId ? `${API_BASE}/actividades?usuario_id=${usuarioId}` : `${API_BASE}/actividades`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener actividades');
  return res.json();
}

export async function crearActividad(proyectoId, titulo, horas, fechaAsignacion) {
  const res = await fetch(`${API_BASE}/actividades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      proyecto_id: proyectoId,
      titulo,
      horas_invertidas: horas,
      fecha_asignacion: fechaAsignacion,
    }),
  });
  if (!res.ok) throw new Error('Error al crear actividad');
  return res.json();
}

export async function crearActividadesBulk(actividades) {
  const res = await fetch(`${API_BASE}/actividades/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actividades }),
  });
  if (!res.ok) throw new Error('Error al crear actividades masivas');
  return res.json();
}

export async function actualizarActividad(id, datos) {
  const res = await fetch(`${API_BASE}/actividades/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  if (!res.ok) throw new Error('Error al actualizar actividad');
  return res.json();
}

export async function eliminarActividad(id) {
  const res = await fetch(`${API_BASE}/actividades/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar actividad');
  return true;
}
