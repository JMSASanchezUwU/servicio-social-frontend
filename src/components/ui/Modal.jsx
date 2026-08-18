/**
 * Modal reutilizable — usa tokens semánticos para ambos temas.
 */
export default function Modal({ isOpen, onClose, maxWidth = 'max-w-sm', children }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-overlay backdrop-blur-md flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`glass rounded-2xl shadow-2xl w-full ${maxWidth} p-6 glow-accent animate-fade-in-up`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
