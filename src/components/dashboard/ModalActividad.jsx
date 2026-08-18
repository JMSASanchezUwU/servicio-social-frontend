import Modal from '../ui/Modal';

/**
 * Modal para crear una o múltiples actividades — tokens semánticos.
 */
export default function ModalActividad({ isOpen, onClose, actividades, setActividades, onSubmit, ACTIVIDAD_VACIA, isGlobalView, proyectos }) {
  const agregarFila = () => {
    setActividades([...actividades, { ...ACTIVIDAD_VACIA, id: Date.now() }]);
  };

  const eliminarFila = (id) => {
    if (actividades.length === 1) return;
    setActividades(actividades.filter(act => act.id !== id));
  };

  const actualizarFila = (id, campo, valor) => {
    setActividades(actividades.map(act => act.id === id ? { ...act, [campo]: valor } : act));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-heading flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-neon-500/15 flex items-center justify-center text-sm">⚡</span>
          Nueva Actividad
        </h3>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-dark-700/50 text-faint hover:text-heading hover:bg-dark-600 transition-all duration-200 flex items-center justify-center text-sm">
          ✕
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {actividades.map((actividad, index) => (
          <div key={actividad.id} className="relative p-4 rounded-xl border border-glass-border bg-dark-800/30">
            {actividades.length > 1 && (
              <button 
                type="button" 
                onClick={() => eliminarFila(actividad.id)}
                className="absolute top-2 right-2 text-faint hover:text-red-400 p-1"
                title="Eliminar actividad"
              >
                ✕
              </button>
            )}
            <h4 className="text-xs font-bold text-accent-400 mb-3 uppercase tracking-wider">
              Actividad {index + 1}
            </h4>
            <div className="space-y-4">
              {isGlobalView && (
                <div>
                  <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
                    Proyecto destino
                  </label>
                  <select
                    required
                    className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
                    value={actividad.proyecto_id || ''}
                    onChange={(e) => actualizarFila(actividad.id, 'proyecto_id', e.target.value)}
                  >
                    <option value="" disabled>Seleccione un proyecto...</option>
                    {proyectos?.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
                  ¿Qué actividad va a realizar?
                </label>
                <input
                  type="text"
                  required
                  placeholder="Describe la actividad..."
                  className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading placeholder-dim focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300 text-sm"
                  value={actividad.titulo}
                  onChange={(e) => actualizarFila(actividad.id, 'titulo', e.target.value)}
                />
              </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
                      Estado
                    </label>
                    <select
                      className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
                      value={actividad.estado || 'pendiente'}
                      onChange={(e) => actualizarFila(actividad.id, 'estado', e.target.value)}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_desarrollo">En Desarrollo</option>
                      <option value="terminada">Terminada</option>
                    </select>
                  </div>
                  <div className="flex-1">
                  <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
                    Horas estimadas
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300 text-sm"
                    value={actividad.horas}
                    onChange={(e) => actualizarFila(actividad.id, 'horas', e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
                    Fechas (Selecciona varias)
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="date"
                      className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-body focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
                      onChange={(e) => {
                        if (!e.target.value) return;
                        const currentFechas = actividad.fechas || [];
                        if (!currentFechas.includes(e.target.value)) {
                          actualizarFila(actividad.id, 'fechas', [...currentFechas, e.target.value]);
                        }
                        e.target.value = ''; // Limpiar para que pueda seleccionar la misma si la borró
                      }}
                    />
                    <div className="flex flex-wrap gap-2 min-h-[30px]">
                      {(actividad.fechas || []).map(fecha => (
                        <span key={fecha} className="text-xs font-mono bg-dark-600/50 text-accent-400 px-2 py-1.5 rounded-lg flex items-center gap-2 border border-accent-500/20">
                          {fecha}
                          <button 
                            type="button" 
                            className="text-red-400/80 hover:text-red-400 transition-colors"
                            onClick={() => {
                              actualizarFila(actividad.id, 'fechas', actividad.fechas.filter(f => f !== fecha));
                            }}
                          >✕</button>
                        </span>
                      ))}
                      {(!actividad.fechas || actividad.fechas.length === 0) && (
                         <span className="text-xs text-dim italic">Agrega una o más fechas...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={agregarFila}
            className="text-sm font-medium text-accent-400 hover:text-neon-400 hover:underline transition-all"
          >
            + Añadir otra actividad
          </button>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 bg-dark-700/50 text-muted py-2.5 rounded-xl font-semibold hover:bg-dark-600/50 hover:text-body transition-all duration-300 text-sm border border-glass-border">
            Cancelar
          </button>
          <button type="submit" className="flex-1 bg-gradient-to-r from-accent-600 to-accent-500 text-white py-2.5 rounded-xl font-semibold hover:from-accent-500 hover:to-neon-500 transition-all duration-500 shadow-md shadow-accent-600/20 text-sm">
            Guardar
          </button>
        </div>
      </form>
    </Modal>
  );
}
