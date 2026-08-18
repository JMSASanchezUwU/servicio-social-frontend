import ThemeToggle from '../ui/ThemeToggle';

/**
 * Panel lateral — soporta tema claro/oscuro via tokens semánticos.
 */
export default function Sidebar({
  proyectos,
  proyectoActivo,
  onSelectProyecto,
  onNuevoProyecto,
  onEditarProyecto,
  onEliminarProyecto,
  progresoTotal,
  userEmail,
  onLogout,
}) {
  return (
    <aside className="w-72 glass flex flex-col border-r border-glass-border z-10">
      {/* Encabezado con barra de progreso */}
      <div className="p-6 border-b border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-extrabold text-gradient tracking-tight">
            Servicio Social
          </h1>
          <ThemeToggle />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between bg-dark-800/40 p-3 rounded-xl border border-glass-border">
            <span className="text-xs font-medium text-faint uppercase tracking-wider flex items-center gap-2">
              <span className="text-accent-500">⏱️</span> Total Horas
            </span>
            <span className="text-sm font-bold text-accent-400">
              {progresoTotal} hrs
            </span>
          </div>
        </div>
      </div>

      {/* Lista de proyectos y Analíticas */}
      <div className="p-4 flex-1 overflow-y-auto">
        
        {/* Analíticas Globales */}
        <div className="mb-2">
          <button
            onClick={() => onSelectProyecto('analytics')}
            className={`w-full text-left p-3 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-3 ${
              proyectoActivo === 'analytics'
                ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30 shadow-md shadow-accent-600/10'
                : 'text-heading hover:bg-dark-700/50 hover:text-accent-400 border border-transparent'
            }`}
          >
            <span className="text-lg">📊</span>
            Analíticas Globales
          </button>
        </div>

        {/* Todas las Actividades */}
        <div className="mb-6">
          <button
            onClick={() => onSelectProyecto('todas')}
            className={`w-full text-left p-3 rounded-xl transition-all duration-300 text-sm font-bold flex items-center gap-3 ${
              proyectoActivo === 'todas'
                ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30 shadow-md shadow-accent-600/10'
                : 'text-heading hover:bg-dark-700/50 hover:text-accent-400 border border-transparent'
            }`}
          >
            <span className="text-lg">🌍</span>
            Todas las Actividades
          </button>
        </div>

        <h2 className="text-[10px] uppercase tracking-[0.2em] text-dim font-bold mb-4 ml-2">
          Proyectos
        </h2>
        <ul className="space-y-1">
          {proyectos.length === 0 ? (
            <p className="text-xs text-dim ml-2 italic">Sin proyectos aún...</p>
          ) : (
            proyectos.map((proyecto) => (
              <li
                key={proyecto.id}
                className={`group cursor-pointer p-3 rounded-xl transition-all duration-300 text-sm font-medium flex items-center justify-between gap-2.5 ${
                  proyectoActivo === proyecto.id
                    ? 'bg-accent-600/20 text-accent-400 border border-accent-500/30 shadow-md shadow-accent-600/10 animate-pulse-glow'
                    : 'text-muted hover:bg-dark-700/50 hover:text-heading border border-transparent'
                }`}
              >
                <div 
                  className="flex items-center gap-2.5 flex-1 truncate" 
                  onClick={() => onSelectProyecto(proyecto.id)}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    proyectoActivo === proyecto.id ? 'bg-accent-400' : 'bg-dim'
                  }`} />
                  <span className="truncate">{proyecto.nombre}</span>
                </div>
                
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEditarProyecto(proyecto); }}
                    className="p-1.5 text-faint hover:text-blue-400 rounded bg-dark-600/50 hover:bg-dark-500/50"
                    title="Editar proyecto"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEliminarProyecto(proyecto.id); }}
                    className="p-1.5 text-faint hover:text-red-400 rounded bg-dark-600/50 hover:bg-dark-500/50"
                    title="Eliminar proyecto"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <button
          onClick={onNuevoProyecto}
          className="mt-6 w-full py-2.5 border border-dashed border-dark-500 rounded-xl text-sm text-faint hover:text-accent-400 hover:border-accent-500/40 hover:bg-accent-600/5 transition-all duration-300 group"
        >
          <span className="group-hover:scale-110 inline-block transition-transform">+</span>{' '}
          Nuevo Proyecto
        </button>
      </div>

      {/* Pie con info de usuario y logout */}
      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-3 mb-3 px-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-600 to-neon-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {userEmail?.charAt(0).toUpperCase()}
          </div>
          <div className="text-xs text-faint truncate">{userEmail}</div>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-2 bg-dark-800/60 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-300 font-medium"
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
