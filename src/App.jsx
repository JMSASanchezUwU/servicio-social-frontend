import { useState, useEffect } from 'react';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useProyectos } from './hooks/useProyectos';
import { useActividades } from './hooks/useActividades';

// Componentes
import LoginPage from './components/auth/LoginPage';
import Sidebar from './components/layout/Sidebar';
import ProjectHeader from './components/dashboard/ProjectHeader';
import KanbanBoard from './components/dashboard/KanbanBoard';
import TablaActividades from './components/dashboard/TablaActividades';
import EmptyState from './components/dashboard/EmptyState';
import ModalProyecto from './components/dashboard/ModalProyecto';
import ModalActividad from './components/dashboard/ModalActividad';
import ModalEditarActividad from './components/dashboard/ModalEditarActividad';
import AnalyticsDashboard from './components/dashboard/AnalyticsDashboard';

function App() {
  const auth = useAuth();
  const proyectos = useProyectos();
  const actividades = useActividades();

  const [vistaActiva, setVistaActiva] = useState('kanban');

  // Cargar datos cuando hay sesión activa
  useEffect(() => {
    if (auth.sesion) {
      proyectos.cargarProyectos(auth.sesion.user.id);
      actividades.cargarActividades(auth.sesion.user.id);
    }
  }, [auth.sesion]);

  // Manejar logout: limpiar sesión + datos
  const handleLogout = async () => {
    await auth.handleLogout();
    proyectos.resetProyectos();
    actividades.resetActividades();
  };

  // --- PANTALLA DE LOGIN ---
  if (!auth.sesion) {
    return (
      <LoginPage
        email={auth.email}
        setEmail={auth.setEmail}
        password={auth.password}
        setPassword={auth.setPassword}
        cargandoAuth={auth.cargandoAuth}
        esRegistro={auth.esRegistro}
        setEsRegistro={auth.setEsRegistro}
        onSubmit={auth.esRegistro ? auth.handleRegistro : auth.handleLogin}
      />
    );
  }

  // --- DATOS DERIVADOS ---
  const isGlobalView = proyectos.proyectoActivo === 'todas';
  const actividadesDelProyecto = isGlobalView 
    ? actividades.actividades 
    : actividades.actividades.filter((a) => a.proyecto_id === proyectos.proyectoActivo);
    
  const progresoTotal = actividades.actividades.reduce(
    (total, act) => total + Number(act.horas_invertidas),
    0
  );
  
  const proyectoActivoNombre = isGlobalView
    ? 'Todas las Actividades'
    : proyectos.proyectos.find((p) => p.id === proyectos.proyectoActivo)?.nombre || '';

  // --- DASHBOARD ---
  return (
    <div className="flex h-screen bg-mesh text-slate-200 font-sans relative">
      <Sidebar
        proyectos={proyectos.proyectos}
        proyectoActivo={proyectos.proyectoActivo}
        onSelectProyecto={proyectos.setProyectoActivo}
        onNuevoProyecto={() => {
          proyectos.setProyectoAEditar(null);
          proyectos.setNuevoProyectoNombre('');
          proyectos.setModalProyectoAbierto(true);
        }}
        onEditarProyecto={(proyecto) => {
          proyectos.setProyectoAEditar(proyecto);
          proyectos.setNuevoProyectoNombre(proyecto.nombre);
          proyectos.setModalProyectoAbierto(true);
        }}
        onEliminarProyecto={proyectos.handleEliminarProyecto}
        progresoTotal={progresoTotal}
        userEmail={auth.sesion.user.email}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        {!proyectos.proyectoActivo ? (
          <EmptyState onCrearProyecto={() => proyectos.setModalProyectoAbierto(true)} />
        ) : proyectos.proyectoActivo === 'analytics' ? (
          <AnalyticsDashboard 
            actividades={actividades.actividades} 
            proyectos={proyectos.proyectos} 
          />
        ) : (
          <>
            <ProjectHeader
              proyectoNombre={proyectoActivoNombre}
              vistaActiva={vistaActiva}
              onCambiarVista={setVistaActiva}
              onAgregarActividad={() => actividades.setModalActividadAbierto(true)}
            />

            <div className="flex-1 overflow-x-auto p-8">
              {vistaActiva === 'kanban' && (
                <KanbanBoard
                  actividades={actividadesDelProyecto}
                  onMoverActividad={actividades.handleMoverActividad}
                  onEditar={(act) => {
                    actividades.setActividadAEditar(act);
                    actividades.setModalEdicionActividadAbierto(true);
                  }}
                  onEliminar={actividades.handleEliminarActividad}
                  isGlobalView={isGlobalView}
                  proyectos={proyectos.proyectos}
                />
              )}
              {vistaActiva === 'tabla' && (
                <TablaActividades 
                  actividades={actividadesDelProyecto} 
                  onEditar={(act) => {
                    actividades.setActividadAEditar(act);
                    actividades.setModalEdicionActividadAbierto(true);
                  }}
                  onEliminar={actividades.handleEliminarActividad}
                  onCambiarEstado={actividades.handleMoverActividad}
                  isGlobalView={isGlobalView}
                  proyectos={proyectos.proyectos}
                />
              )}
            </div>
          </>
        )}
      </main>

      <ModalProyecto
        isOpen={proyectos.modalProyectoAbierto}
        onClose={() => proyectos.setModalProyectoAbierto(false)}
        nombre={proyectos.nuevoProyectoNombre}
        setNombre={proyectos.setNuevoProyectoNombre}
        onSubmit={(e) => proyectos.handleGuardarProyecto(e, auth.sesion.user.id)}
        isEditing={!!proyectos.proyectoAEditar}
      />

      <ModalActividad
        isOpen={actividades.modalActividadAbierto}
        onClose={() => actividades.setModalActividadAbierto(false)}
        actividades={actividades.nuevasActividades}
        setActividades={actividades.setNuevasActividades}
        ACTIVIDAD_VACIA={actividades.ACTIVIDAD_VACIA}
        onSubmit={(e) => actividades.handleGuardarActividad(e, proyectos.proyectoActivo, isGlobalView)}
        isGlobalView={isGlobalView}
        proyectos={proyectos.proyectos}
      />
      <ModalEditarActividad
        isOpen={actividades.modalEdicionActividadAbierto}
        onClose={() => actividades.setModalEdicionActividadAbierto(false)}
        actividad={actividades.actividadAEditar}
        setActividad={actividades.setActividadAEditar}
        onSubmit={actividades.handleGuardarEdicionActividad}
        proyectos={proyectos.proyectos}
      />
    </div>
  );
}

export default App;