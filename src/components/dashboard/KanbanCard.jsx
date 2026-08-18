/**
 * Tarjeta individual Kanban — tokens semánticos.
 */
export default function KanbanCard({ actividad, colorClasses, onMover, onEditar, onEliminar, isGlobalView, proyectoNombre }) {
  return (
    <div
      className={`glass rounded-xl p-4 hover:border-glass-border-hover transition-all duration-300 group flex flex-col gap-3 hover:-translate-y-0.5 ${colorClasses.cardGlow} relative`}
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button onClick={() => onEditar(actividad)} className="p-1 text-faint hover:text-blue-400 bg-dark-600/50 rounded" title="Editar">✏️</button>
        <button onClick={() => onEliminar(actividad.id)} className="p-1 text-faint hover:text-red-400 bg-dark-600/50 rounded" title="Eliminar">🗑️</button>
      </div>

      <div>
        {isGlobalView && (
          <span className="text-[10px] uppercase tracking-wider text-accent-400 font-bold mb-1 block">
            {proyectoNombre || 'Proyecto desconocido'}
          </span>
        )}
        <h4 className="font-semibold text-body text-sm mb-2 group-hover:text-heading transition-colors pr-10">
          {actividad.titulo}
        </h4>
        <div className="flex justify-between items-center">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${colorClasses.badge}`}>
            ⏱️ {actividad.horas_invertidas}h
          </span>
          <span className="text-[10px] text-dim">{actividad.fecha_asignacion}</span>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-glass-border">
        {actividad.estado !== 'pendiente' && (
          <button
            onClick={() =>
              onMover(actividad.id, actividad.estado === 'terminada' ? 'en_desarrollo' : 'pendiente')
            }
            className="flex-1 text-xs py-1.5 bg-dark-700/50 hover:bg-dark-600/60 text-muted hover:text-body rounded-lg font-medium transition-all duration-200"
          >
            ⬅️
          </button>
        )}
        {actividad.estado !== 'terminada' && (
          <button
            onClick={() =>
              onMover(actividad.id, actividad.estado === 'pendiente' ? 'en_desarrollo' : 'terminada')
            }
            className="flex-1 text-xs py-1.5 bg-accent-600/15 hover:bg-accent-600/25 text-accent-400 hover:text-accent-400 rounded-lg font-medium transition-all duration-200"
          >
            ➡️
          </button>
        )}
      </div>
    </div>
  );
}
