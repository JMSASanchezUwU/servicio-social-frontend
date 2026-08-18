/**
 * Header del proyecto activo — tokens semánticos.
 */
export default function ProjectHeader({
  proyectoNombre,
  vistaActiva,
  onCambiarVista,
  onAgregarActividad,
}) {
  return (
    <header className="glass-light border-b border-glass-border px-8 py-5 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-extrabold text-heading tracking-tight">
          {proyectoNombre}
        </h2>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onCambiarVista('kanban')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
              vistaActiva === 'kanban'
                ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30'
                : 'text-faint hover:text-heading hover:bg-dark-700/50 border border-transparent'
            }`}
          >
            ◻️ Tablero
          </button>
          <button
            onClick={() => onCambiarVista('tabla')}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 ${
              vistaActiva === 'tabla'
                ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30'
                : 'text-faint hover:text-heading hover:bg-dark-700/50 border border-transparent'
            }`}
          >
            📋 Registro Detallado
          </button>
        </div>
      </div>

      <button
        onClick={onAgregarActividad}
        className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-neon-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-accent-600/20 hover:shadow-accent-500/30 transition-all duration-500 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="text-lg leading-none">+</span> Agregar Actividad
      </button>
    </header>
  );
}
