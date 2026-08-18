import { useTheme } from '../../context/ThemeContext';
import KanbanCard from './KanbanCard';

/**
 * Configuración de columnas Kanban por tema.
 * Se necesitan dos variantes porque los colores de columna
 * (blue, emerald, gray) no usan nuestros tokens custom.
 */
function getColumnas(isDark) {
  return [
    {
      id: 'pendiente',
      titulo: 'Pendiente',
      icon: '⏳',
      classes: {
        container: isDark ? 'bg-dark-800/40 border-slate-700/30' : 'bg-slate-100/80 border-slate-200',
        title: isDark ? 'text-slate-400' : 'text-slate-500',
        count: isDark ? 'bg-slate-700/60 text-slate-300' : 'bg-slate-200 text-slate-600',
        badge: isDark ? 'text-slate-300 bg-slate-700/50' : 'text-slate-600 bg-slate-200',
        cardGlow: isDark ? 'hover:shadow-md hover:shadow-slate-700/20' : 'hover:shadow-md hover:shadow-slate-200',
      },
    },
    {
      id: 'en_desarrollo',
      titulo: 'En Desarrollo',
      icon: '⚡',
      classes: {
        container: isDark ? 'bg-blue-950/20 border-blue-500/15' : 'bg-blue-50/80 border-blue-200',
        title: isDark ? 'text-blue-400' : 'text-blue-600',
        count: isDark ? 'bg-blue-500/15 text-blue-300' : 'bg-blue-100 text-blue-700',
        badge: isDark ? 'text-blue-300 bg-blue-500/15' : 'text-blue-700 bg-blue-100',
        cardGlow: isDark ? 'hover:shadow-md hover:shadow-blue-500/10' : 'hover:shadow-md hover:shadow-blue-200',
      },
    },
    {
      id: 'terminada',
      titulo: 'Terminada',
      icon: '✅',
      classes: {
        container: isDark ? 'bg-emerald-950/20 border-emerald-500/15' : 'bg-emerald-50/80 border-emerald-200',
        title: isDark ? 'text-emerald-400' : 'text-emerald-600',
        count: isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-100 text-emerald-700',
        badge: isDark ? 'text-emerald-300 bg-emerald-500/15' : 'text-emerald-700 bg-emerald-100',
        cardGlow: isDark ? 'hover:shadow-md hover:shadow-emerald-500/10' : 'hover:shadow-md hover:shadow-emerald-200',
      },
    },
  ];
}

/**
 * Tablero Kanban con 3 columnas.
 */
export default function KanbanBoard({ actividades, onMoverActividad, onEditar, onEliminar, isGlobalView, proyectos }) {
  const { isDark } = useTheme();
  const columnas = getColumnas(isDark);

  return (
    <div className="flex gap-5 h-full min-w-max">
      {columnas.map((col) => {
        const actividadesColumna = actividades.filter((a) => a.estado === col.id);

        return (
          <div
            key={col.id}
            className={`w-80 rounded-2xl p-4 flex flex-col max-h-full border ${col.classes.container}`}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className={`font-bold text-sm flex items-center gap-2 ${col.classes.title}`}>
                <span>{col.icon}</span>
                {col.titulo}
              </h3>
              <span className={`${col.classes.count} text-xs px-2.5 py-1 rounded-full font-bold`}>
                {actividadesColumna.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {actividadesColumna.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-dim italic">Sin actividades</p>
                </div>
              ) : (
                actividadesColumna.map((actividad) => (
                  <KanbanCard
                    key={actividad.id}
                    actividad={actividad}
                    colorClasses={col.classes}
                    onMover={onMoverActividad}
                    onEditar={onEditar}
                    onEliminar={onEliminar}
                    isGlobalView={isGlobalView}
                    proyectoNombre={isGlobalView ? proyectos?.find(p => p.id === actividad.proyecto_id)?.nombre : null}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
