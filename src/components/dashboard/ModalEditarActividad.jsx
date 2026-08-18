import Modal from '../ui/Modal';

export default function ModalEditarActividad({ isOpen, onClose, actividad, setActividad, onSubmit, proyectos }) {
  if (!actividad) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-heading flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center text-sm">✏️</span>
          Editar Actividad
        </h3>
        <button onClick={onClose} className="w-8 h-8 rounded-lg bg-dark-700/50 text-faint hover:text-heading hover:bg-dark-600 transition-all duration-200 flex items-center justify-center text-sm">
          ✕
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
            Proyecto
          </label>
          <select
            required
            className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300 text-sm"
            value={actividad.proyecto_id}
            onChange={(e) => setActividad({ ...actividad, proyecto_id: e.target.value })}
          >
            {proyectos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
            Título de la Actividad
          </label>
          <input
            type="text"
            required
            className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
            value={actividad.titulo}
            onChange={(e) => setActividad({ ...actividad, titulo: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
            Estado
          </label>
          <select
            className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
            value={actividad.estado || 'pendiente'}
            onChange={(e) => setActividad({ ...actividad, estado: e.target.value })}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_desarrollo">En Desarrollo</option>
            <option value="terminada">Terminada</option>
          </select>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
              Horas
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
              value={actividad.horas_invertidas}
              onChange={(e) => setActividad({ ...actividad, horas_invertidas: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
              Fecha
            </label>
            <input
              type="date"
              required
              className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-body focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 text-sm"
              value={actividad.fecha_asignacion}
              onChange={(e) => setActividad({ ...actividad, fecha_asignacion: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 bg-dark-700/50 text-muted py-2.5 rounded-xl font-semibold hover:bg-dark-600/50 hover:text-body transition-all duration-300 text-sm border border-glass-border">
            Cancelar
          </button>
          <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-xl font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-500 shadow-md shadow-blue-600/20 text-sm">
            Guardar Cambios
          </button>
        </div>
      </form>
    </Modal>
  );
}
