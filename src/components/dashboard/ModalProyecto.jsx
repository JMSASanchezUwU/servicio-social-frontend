import Modal from '../ui/Modal';

/**
 * Modal para crear un nuevo proyecto — tokens semánticos.
 */
export default function ModalProyecto({ isOpen, onClose, nombre, setNombre, onSubmit }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-sm">
      <h3 className="text-xl font-bold text-heading mb-5 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-accent-600/20 flex items-center justify-center text-sm">📁</span>
        Nuevo Proyecto
      </h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-faint mb-2 uppercase tracking-wider">
            Nombre del proyecto
          </label>
          <input
            type="text"
            required
            placeholder="Ej. Museo Contemporáneo"
            className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading placeholder-dim focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300 text-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="pt-4 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 bg-dark-700/50 text-muted py-2.5 rounded-xl font-semibold hover:bg-dark-600/50 hover:text-body transition-all duration-300 text-sm border border-glass-border">
            Cancelar
          </button>
          <button type="submit" className="flex-1 bg-gradient-to-r from-accent-600 to-accent-500 text-white py-2.5 rounded-xl font-semibold hover:from-accent-500 hover:to-neon-500 transition-all duration-500 shadow-md shadow-accent-600/20 text-sm">
            Crear Proyecto
          </button>
        </div>
      </form>
    </Modal>
  );
}
