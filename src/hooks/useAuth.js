import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Hook que encapsula toda la lógica de autenticación con Supabase.
 * Maneja: sesión, login, registro, logout y estado de carga.
 */
export function useAuth() {
  const [sesion, setSesion] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargandoAuth, setCargandoAuth] = useState(false);
  const [esRegistro, setEsRegistro] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSesion(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => setSesion(session));

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargandoAuth(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const isEmailNotConfirmed = error.message.toLowerCase().includes('email not confirmed');
      alert(isEmailNotConfirmed 
        ? 'Debes confirmar tu correo electrónico antes de iniciar sesión. Por favor revisa tu bandeja de entrada o spam.' 
        : 'Error al iniciar sesión: ' + error.message);
    }
    setCargandoAuth(false);
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setCargandoAuth(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert('Error al registrarse: ' + error.message);
    } else {
      alert('¡Cuenta creada con éxito!\n\nHemos enviado un enlace de confirmación a tu correo electrónico. Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para confirmar tu cuenta antes de iniciar sesión.');
      setEsRegistro(false);
      setPassword('');
    }
    setCargandoAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return {
    sesion,
    email,
    setEmail,
    password,
    setPassword,
    cargandoAuth,
    esRegistro,
    setEsRegistro,
    handleLogin,
    handleRegistro,
    handleLogout,
  };
}
