import { useTheme } from '../../context/ThemeContext';

/**
 * Botón toggle sol/luna para cambiar de tema.
 */
export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="relative w-14 h-7 rounded-full transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-accent-500/50"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #1e293b, #334155)'
          : 'linear-gradient(135deg, #93c5fd, #60a5fa)',
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-500 shadow-md"
        style={{
          transform: isDark ? 'translateX(0)' : 'translateX(28px)',
          background: isDark ? '#1e293b' : '#fbbf24',
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
