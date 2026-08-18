import ThemeToggle from '../ui/ThemeToggle';

/**
 * Página de Login/Registro — soporta tema claro/oscuro.
 */
export default function LoginPage({
  email,
  setEmail,
  password,
  setPassword,
  cargandoAuth,
  esRegistro,
  setEsRegistro,
  onSubmit,
}) {
  return (
    <div className="flex h-screen bg-mesh items-center justify-center font-sans px-4">
      {/* Toggle de tema en esquina */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Orbes decorativos de fondo */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accent-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-neon-500/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="glass rounded-3xl shadow-2xl w-full max-w-md p-10 glow-accent animate-fade-in-up relative z-10">
        {/* Logo / Encabezado */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-600/20 border border-accent-500/30 mb-5">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gradient tracking-tight">
            Servicio Social
          </h1>
          <p className="text-muted mt-2 text-sm">
            {esRegistro ? 'Crea una cuenta para comenzar' : 'Control de horas y actividades'}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              placeholder="tu@correo.com"
              className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-3 text-heading placeholder-faint focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted mb-2 uppercase tracking-wider">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-input-bg border border-glass-border rounded-xl px-4 py-3 text-heading placeholder-faint focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50 outline-none transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={cargandoAuth}
            className="w-full bg-gradient-to-r from-accent-600 to-accent-500 text-white py-3.5 rounded-xl font-bold hover:from-accent-500 hover:to-neon-500 transition-all duration-500 mt-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-600/25 hover:shadow-accent-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            {cargandoAuth
              ? '⏳ Procesando...'
              : esRegistro
                ? '🚀 Crear Cuenta'
                : '🔐 Entrar al Tablero'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-glass-border-hover to-transparent mb-6" />
          <button
            type="button"
            onClick={() => setEsRegistro(!esRegistro)}
            className="text-sm text-accent-400 hover:text-neon-400 font-medium transition-colors duration-300"
          >
            {esRegistro
              ? '¿Ya tienes cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate gratis'}
          </button>
        </div>
      </div>
    </div>
  );
}
