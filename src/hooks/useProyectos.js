import { useState, useCallback } from 'react';
import { fetchProyectos, crearProyecto, actualizarProyecto, eliminarProyecto } from '../lib/api';

/**
 * Hook que encapsula el CRUD y estado de proyectos.
 */
export function useProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoActivo, setProyectoActivo] = useState(null);
  const [modalProyectoAbierto, setModalProyectoAbierto] = useState(false);
  const [nuevoProyectoNombre, setNuevoProyectoNombre] = useState('');
  const [proyectoAEditar, setProyectoAEditar] = useState(null);

  const cargarProyectos = useCallback(async (userId) => {
    try {
      const data = await fetchProyectos(userId);
      setProyectos(data);
      if (data.length > 0) setProyectoActivo(data[0].id);
    } catch (error) {
      console.error('Error al cargar proyectos:', error);
    }
  }, []);

  const handleGuardarProyecto = async (e, userId) => {
    e.preventDefault();
    if (!nuevoProyectoNombre.trim()) return;

    try {
      if (proyectoAEditar) {
        const proyectoActualizado = await actualizarProyecto(proyectoAEditar.id, nuevoProyectoNombre);
        setProyectos(prev => prev.map(p => p.id === proyectoAEditar.id ? proyectoActualizado : p));
      } else {
        const proyectoCreado = await crearProyecto(userId, nuevoProyectoNombre);
        setProyectos((prev) => [proyectoCreado, ...prev]);
        setProyectoActivo(proyectoCreado.id);
      }
      setModalProyectoAbierto(false);
      setNuevoProyectoNombre('');
      setProyectoAEditar(null);
    } catch (error) {
      console.error('Error guardando proyecto:', error);
    }
  };

  const handleEliminarProyecto = async (id) => {
    try {
      await eliminarProyecto(id);
      setProyectos(prev => prev.filter(p => p.id !== id));
      if (proyectoActivo === id) {
        setProyectoActivo('todas'); // Or fallback to another project
      }
    } catch (error) {
      console.error('Error eliminando proyecto:', error);
    }
  };

  const resetProyectos = () => {
    setProyectos([]);
    setProyectoActivo(null);
  };

  return {
    proyectos,
    proyectoActivo,
    setProyectoActivo,
    modalProyectoAbierto,
    setModalProyectoAbierto,
    nuevoProyectoNombre,
    setNuevoProyectoNombre,
    proyectoAEditar,
    setProyectoAEditar,
    cargarProyectos,
    handleGuardarProyecto,
    handleEliminarProyecto,
    resetProyectos,
  };
}
