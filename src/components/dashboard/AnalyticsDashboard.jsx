import { useMemo, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function AnalyticsDashboard({ actividades, proyectos }) {
  const { isDark } = useTheme();
  const [proyectoFiltro, setProyectoFiltro] = useState('todos');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [fechaFiltro, setFechaFiltro] = useState('todas');

  // Filtrar actividades por todos los filtros activos
  const actividadesFiltradas = useMemo(() => {
    let filtradas = actividades;
    if (proyectoFiltro !== 'todos') {
      filtradas = filtradas.filter(a => a.proyecto_id === proyectoFiltro);
    }
    if (estadoFiltro !== 'todos') {
      // estado en db: 'terminada', 'en_desarrollo', 'pendiente'
      filtradas = filtradas.filter(a => a.estado === estadoFiltro);
    }
    if (fechaFiltro !== 'todas') {
      filtradas = filtradas.filter(a => a.fecha_asignacion === fechaFiltro);
    }
    return filtradas;
  }, [actividades, proyectoFiltro, estadoFiltro, fechaFiltro]);

  // Total de horas
  const horasTotales = useMemo(() => {
    return actividadesFiltradas.reduce((sum, act) => sum + Number(act.horas_invertidas || 0), 0);
  }, [actividadesFiltradas]);

  // Datos para gráfico de Horas en el Tiempo (por fecha)
  const datosTiempo = useMemo(() => {
    const agrupado = actividadesFiltradas.reduce((acc, act) => {
      const fecha = act.fecha_asignacion;
      if (!acc[fecha]) acc[fecha] = 0;
      acc[fecha] += Number(act.horas_invertidas || 0);
      return acc;
    }, {});

    return Object.entries(agrupado)
      .map(([fecha, horas]) => ({ fecha, horas }))
      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  }, [actividadesFiltradas]);

  // Datos para gráfico de distribución por Proyecto
  const datosProyectos = useMemo(() => {
    let filtradasBase = actividades;
    if (estadoFiltro !== 'todos') filtradasBase = filtradasBase.filter(a => a.estado === estadoFiltro);
    if (fechaFiltro !== 'todas') filtradasBase = filtradasBase.filter(a => a.fecha_asignacion === fechaFiltro);

    const agrupado = filtradasBase.reduce((acc, act) => {
      const proy = proyectos.find(p => p.id === act.proyecto_id);
      const nombre = proy ? proy.nombre : 'Desconocido';
      const rawId = proy ? proy.id : 'desconocido';
      if (!acc[nombre]) acc[nombre] = { name: nombre, rawId, value: 0 };
      acc[nombre].value += Number(act.horas_invertidas || 0);
      return acc;
    }, {});

    return Object.values(agrupado);
  }, [actividades, proyectos, estadoFiltro, fechaFiltro]);

  // Datos para gráfico de Estado
  const datosEstado = useMemo(() => {
    // Para el gráfico de estado, no queremos filtrar por estado para no desaparecer las otras barras
    // Filtramos solo por proyecto y fecha
    let filtradasBase = actividades;
    if (proyectoFiltro !== 'todos') filtradasBase = filtradasBase.filter(a => a.proyecto_id === proyectoFiltro);
    if (fechaFiltro !== 'todas') filtradasBase = filtradasBase.filter(a => a.fecha_asignacion === fechaFiltro);

    const agrupado = filtradasBase.reduce((acc, act) => {
      const estado = act.estado === 'terminada' ? 'Terminada' : 
                     act.estado === 'en_desarrollo' ? 'En Desarrollo' : 'Pendiente';
      const rawEstado = act.estado;
      if (!acc[estado]) acc[estado] = { name: estado, raw: rawEstado, count: 0 };
      acc[estado].count++;
      return acc;
    }, {});

    return Object.values(agrupado);
  }, [actividades, proyectoFiltro, fechaFiltro]);

  // Limpiar filtros
  const limpiarFiltros = () => {
    setProyectoFiltro('todos');
    setEstadoFiltro('todos');
    setFechaFiltro('todas');
  };

  const hayFiltrosActivos = proyectoFiltro !== 'todos' || estadoFiltro !== 'todos' || fechaFiltro !== 'todas';

  // Configuración de colores según tema
  const textColor = isDark ? '#cbd5e1' : '#334155';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="flex-1 overflow-y-auto p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-heading tracking-tight">
            Analíticas Globales
          </h2>
          <p className="text-muted text-sm mt-1">
            Visualiza el rendimiento y progreso de tu servicio social
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {hayFiltrosActivos && (
            <button 
              onClick={limpiarFiltros}
              className="text-sm font-semibold text-accent-400 hover:text-neon-400 transition-colors"
            >
              Deshacer Filtros ✕
            </button>
          )}
          <select 
            value={proyectoFiltro}
            onChange={(e) => setProyectoFiltro(e.target.value)}
            className="bg-input-bg border border-glass-border rounded-xl px-4 py-2.5 text-heading focus:ring-2 focus:ring-accent-500/50 outline-none transition-all duration-300 shadow-sm"
          >
            <option value="todos">Todos los proyectos</option>
            {proyectos.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tarjetas de métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-2xl p-6 flex items-center gap-4 glow-accent">
          <div className="w-12 h-12 rounded-xl bg-accent-600/20 text-accent-400 flex items-center justify-center text-xl">
            ⏱️
          </div>
          <div>
            <p className="text-sm font-semibold text-faint uppercase tracking-wider">Total Horas</p>
            <p className="text-3xl font-bold text-heading">{horasTotales}</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
            📋
          </div>
          <div>
            <p className="text-sm font-semibold text-faint uppercase tracking-wider">Actividades</p>
            <p className="text-3xl font-bold text-heading">{actividadesFiltradas.length}</p>
          </div>
        </div>
        <div className="glass rounded-2xl p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            ✅
          </div>
          <div>
            <p className="text-sm font-semibold text-faint uppercase tracking-wider">Completadas</p>
            <p className="text-3xl font-bold text-heading">
              {actividadesFiltradas.filter(a => a.estado === 'terminada').length}
            </p>
          </div>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Horas en el tiempo */}
        <div className="glass rounded-2xl p-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-heading mb-6">Horas invertidas a lo largo del tiempo</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={datosTiempo} onClick={(data) => {
                if (data && data.activeLabel) {
                  setFechaFiltro(data.activeLabel === fechaFiltro ? 'todas' : data.activeLabel);
                }
              }}>
                <defs>
                  <linearGradient id="colorHoras" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="fecha" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#141a2e' : '#ffffff', borderColor: isDark ? '#334670' : '#e2e8f0', borderRadius: '12px', color: textColor }}
                  cursor={{ stroke: '#8b5cf6', strokeWidth: 2, fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="horas" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorHoras)" activeDot={{ r: 8, fill: '#06b6d4' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por Proyecto */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-heading mb-6">Horas por Proyecto</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosProyectos}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  onClick={(data) => {
                    const isSelected = proyectoFiltro === data.rawId;
                    setProyectoFiltro(isSelected ? 'todos' : data.rawId);
                  }}
                  className="cursor-pointer"
                >
                  {datosProyectos.map((entry, index) => {
                    const isSelected = proyectoFiltro === entry.rawId;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        opacity={proyectoFiltro === 'todos' || isSelected ? 1 : 0.3}
                        className="hover:opacity-80 transition-opacity" 
                      />
                    );
                  })}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: isDark ? '#141a2e' : '#ffffff', borderColor: isDark ? '#334670' : '#e2e8f0', borderRadius: '12px', color: textColor }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: textColor }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Estado de actividades */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-heading mb-6">Estado de las actividades</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datosEstado} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: gridColor }}
                  contentStyle={{ backgroundColor: isDark ? '#141a2e' : '#ffffff', borderColor: isDark ? '#334670' : '#e2e8f0', borderRadius: '12px', color: textColor }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {datosEstado.map((entry, index) => {
                    const color = entry.name === 'Terminada' ? '#10b981' : entry.name === 'En Desarrollo' ? '#3b82f6' : '#64748b';
                    const isSelected = estadoFiltro === entry.raw;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={color} 
                        opacity={estadoFiltro === 'todos' || isSelected ? 1 : 0.3}
                        onClick={() => setEstadoFiltro(isSelected ? 'todos' : entry.raw)}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
