import { useTheme } from '../../context/ThemeContext';

/**
 * Mapeo de estados a sus badges visuales por tema.
 */
function getBadge(estado, isDark) {
  const badges = {
    terminada: {
      clase: isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-100 text-emerald-700',
      label: 'Terminada',
    },
    en_desarrollo: {
      clase: isDark ? 'bg-blue-500/15 text-blue-400' : 'bg-blue-100 text-blue-700',
      label: 'En Desarrollo',
    },
    pendiente: {
      clase: isDark ? 'bg-slate-700/50 text-slate-400' : 'bg-slate-200 text-slate-600',
      label: 'Pendiente',
    },
  };
  return badges[estado] || badges.pendiente;
}

/**
 * Vista de tabla/registro detallado.
 */
export default function TablaActividades({ actividades, onEditar, onEliminar, onCambiarEstado, isGlobalView, proyectos }) {
  const { isDark } = useTheme();

  const actividadesOrdenadas = [...actividades].sort(
    (a, b) => new Date(b.fecha_asignacion) - new Date(a.fecha_asignacion)
  );

  return (
    <div className="glass rounded-2xl overflow-hidden max-w-4xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-glass-border text-[10px] text-faint uppercase tracking-[0.15em]">
            <th className="p-4 font-semibold">Fecha</th>
            {isGlobalView && <th className="p-4 font-semibold">Proyecto</th>}
            <th className="p-4 font-semibold">Actividad</th>
            <th className="p-4 font-semibold">Estado</th>
            <th className="p-4 font-semibold text-right">Horas</th>
            <th className="p-4 font-semibold text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-glass-border">
          {actividadesOrdenadas.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-10 text-center text-dim italic">
                No hay actividades registradas en este proyecto.
              </td>
            </tr>
          ) : (
            actividadesOrdenadas.map((act) => {
              const badge = getBadge(act.estado, isDark);
              return (
                <tr key={act.id} className="hover:bg-dark-700/30 transition-colors duration-200 group">
                  <td className="p-4 text-sm text-muted font-medium whitespace-nowrap font-mono">
                    {act.fecha_asignacion}
                  </td>
                  {isGlobalView && (
                    <td className="p-4 text-xs font-bold text-accent-400">
                      {proyectos?.find(p => p.id === act.proyecto_id)?.nombre || 'Desconocido'}
                    </td>
                  )}
                  <td className="p-4 text-sm text-body">{act.titulo}</td>
                  <td className="p-4">
                    <select
                      value={act.estado}
                      onChange={(e) => onCambiarEstado(act.id, e.target.value)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-bold outline-none cursor-pointer appearance-none text-center ${badge.clase}`}
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="pendiente" className="bg-input-bg text-body">Pendiente</option>
                      <option value="en_desarrollo" className="bg-input-bg text-body">En Desarrollo</option>
                      <option value="terminada" className="bg-input-bg text-body">Terminada</option>
                    </select>
                  </td>
                  <td className="p-4 text-sm text-accent-400 font-bold text-right font-mono">
                    {act.horas_invertidas} h
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onEditar(act)} className="text-faint hover:text-blue-400" title="Editar">✏️</button>
                      <button onClick={() => onEliminar(act.id)} className="text-faint hover:text-red-400" title="Eliminar">🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
