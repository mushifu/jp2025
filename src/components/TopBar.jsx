import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { User } from 'lucide-react';
import { useToast } from './ToastContext';

const ALLOWED_USERS = import.meta.env.VITE_ALLOWED_USERS.split(',');

export default function TopBar() {
  const { user, login, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const { showToast } = useToast();

  // Detectar clic fuera del menú
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Login con Google
  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/userinfo.email',
    onSuccess: async tokenResponse => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const { email, name, picture } = res.data;

        if (ALLOWED_USERS.includes(email)) {
          login(email, tokenResponse.access_token, name, picture);
        } else {
          showToast('Acceso no autorizado', 'error');
        }
      } catch (err) {
        showToast('Error al iniciar sesión', 'error');
      }
    },
    onError: () => showToast('Error al iniciar sesión'),
  });

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-lg z-50 rounded-b-xl">
      <div className="flex justify-between items-center h-16 max-w-md mx-auto px-4">
        <span className="text-[#191919] font-semibold text-lg">
          {user ? `Hola, ${user.name}` : "Hola, invitado"}
        </span>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          >
            {user ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <User size={24} className="text-[#191919]" />
            )}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg z-50">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-[#191919] hover:bg-white/60 rounded-t-lg transition"
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  onClick={() => {
                    googleLogin();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-[#191919] hover:bg-white/60 rounded-t-lg transition"
                >
                  Iniciar sesión
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
