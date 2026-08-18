import { useState, useCallback } from 'react';
import { fetchActividades, crearActividadesBulk, actualizarActividad, eliminarActividad } from '../lib/api';

const ACTIVIDAD_VACIA = { titulo: '', horas: 0, fecha_asignacion: '', fechas: [], estado: 'pendiente' };

/**
 * Hook que encapsula el CRUD y estado de actividades.
 */
export function useActividades() {
  const [actividades, setActividades] = useState([]);
  const [modalActividadAbierto, setModalActividadAbierto] = useState(false);
  const [modalEdicionActividadAbierto, setModalEdicionActividadAbierto] = useState(false);
  const [nuevasActividades, setNuevasActividades] = useState([{ ...ACTIVIDAD_VACIA, id: Date.now() }]);
  const [actividadAEditar, setActividadAEditar] = useState(null);

  const cargarActividades = useCallback(async (userId) => {
    try {
      const data = await fetchActividades(userId);
      setActividades(data);
    } catch (error) {
      console.error('Error al cargar actividades:', error);
    }
  }, []);

  const handleGuardarActividad = async (e, proyectoId, isGlobalView) => {
    e.preventDefault();
    try {
      // Filtrar actividades vacías (sin título) y mapear al formato correcto
      const actividadesAInsertar = [];
      
      nuevasActividades.forEach(act => {
        if (act.titulo.trim() === '') return;
        
        // Usar el arreglo de fechas, o la fecha individual como fallback
        const fechasAsignar = act.fechas && act.fechas.length > 0 ? act.fechas : (act.fecha_asignacion ? [act.fecha_asignacion] : []);
        
        fechasAsignar.forEach(fecha => {
          actividadesAInsertar.push({
            proyecto_id: isGlobalView ? act.proyecto_id : proyectoId,
            titulo: act.titulo,
            estado: act.estado || 'pendiente',
            horas_invertidas: act.horas || 0,
            fecha_asignacion: fecha
          });
        });
      });

      if (actividadesAInsertar.length === 0 || actividadesAInsertar.some(a => !a.proyecto_id)) {
        alert("Asegúrate de seleccionar un proyecto y llenar los campos obligatorios.");
        return;
      }

      const actividadesCreadas = await crearActividadesBulk(actividadesAInsertar);
      setActividades((prev) => [...prev, ...actividadesCreadas]);
      setModalActividadAbierto(false);
      setNuevasActividades([{ ...ACTIVIDAD_VACIA, id: Date.now() }]);
    } catch (error) {
      console.error('Error guardando las actividades:', error);
    }
  };

  const handleGuardarEdicionActividad = async (e) => {
    e.preventDefault();
    if (!actividadAEditar) return;
    
    try {
      const actividadActualizada = await actualizarActividad(actividadAEditar.id, {
        titulo: actividadAEditar.titulo,
        estado: actividadAEditar.estado,
        horas_invertidas: actividadAEditar.horas_invertidas,
        fecha_asignacion: actividadAEditar.fecha_asignacion,
        proyecto_id: actividadAEditar.proyecto_id
      });
      setActividades((prev) =>
        prev.map((act) => (act.id === actividadAEditar.id ? { ...act, ...actividadActualizada } : act))
      );
      setModalEdicionActividadAbierto(false);
      setActividadAEditar(null);
    } catch (error) {
      console.error('Error guardando edición de actividad:', error);
    }
  };

  const handleMoverActividad = async (id, nuevoEstado) => {
    try {
      await actualizarActividad(id, { estado: nuevoEstado });
      setActividades((prev) =>
        prev.map((act) => (act.id === id ? { ...act, estado: nuevoEstado } : act))
      );
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
    }
  };

  const handleEliminarActividad = async (id) => {
    try {
      await eliminarActividad(id);
      setActividades((prev) => prev.filter((act) => act.id !== id));
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
    }
  };

  const handleActualizarDetallesActividad = async (id, datos) => {
    try {
      const actividadActualizada = await actualizarActividad(id, datos);
      setActividades((prev) =>
        prev.map((act) => (act.id === id ? { ...act, ...actividadActualizada } : act))
      );
    } catch (error) {
      console.error('Error al actualizar detalles de la actividad:', error);
    }
  };

  const resetActividades = () => {
    setActividades([]);
  };

  return {
    actividades,
    modalActividadAbierto,
    setModalActividadAbierto,
    modalEdicionActividadAbierto,
    setModalEdicionActividadAbierto,
    nuevasActividades,
    setNuevasActividades,
    actividadAEditar,
    setActividadAEditar,
    ACTIVIDAD_VACIA,
    cargarActividades,
    handleGuardarActividad,
    handleGuardarEdicionActividad,
    handleMoverActividad,
    handleEliminarActividad,
    handleActualizarDetallesActividad,
    resetActividades,
  };
}
