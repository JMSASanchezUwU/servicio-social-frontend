/**
 * Pantalla vacía — tokens semánticos.
 */
export default function EmptyState({ onCrearProyecto }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 w-28 h-28 bg-accent-600/20 rounded-full blur-2xl" />
        <div className="relative w-28 h-28 glass rounded-3xl flex items-center justify-center glow-accent">
          <span className="text-5xl">🚀</span>
        </div>
      </div>

      <h2 className="text-3xl font-extrabold text-heading mb-3 tracking-tight">
        Tu Espacio de Trabajo
      </h2>
      <p className="text-muted max-w-md mb-10 text-base leading-relaxed">
        Selecciona un proyecto del menú lateral o crea uno nuevo para empezar a registrar y
        organizar tus horas de servicio.
      </p>
      <button
        onClick={onCrearProyecto}
        className="bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-neon-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-accent-600/25 hover:shadow-accent-500/40 transition-all duration-500 hover:-translate-y-1 active:translate-y-0"
      >
        + Crear mi primer proyecto
      </button>
    </div>
  );
}
