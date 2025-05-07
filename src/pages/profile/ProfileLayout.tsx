import {
  Code,
  Gamepad,
  LayoutDashboard,
  LibraryBigIcon,
  Lock,
  LogOut,
  Mail,
  MessageSquareWarning,
  Newspaper,
  PanelLeftCloseIcon,
  Tags,
  Trash,
  User,
} from 'lucide-react';
import { Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useMemo, useState } from 'react';
import { ProfileRoute, ProfileSidebar } from './components/ProfileSidebar';

export function ProfileLayout() {
  const { usuario } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Memoize routes to avoid recreating them on every render
  const routes: ProfileRoute[] = useMemo(
    () => [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard strokeWidth={2.3} />,
        access: ['ADMINISTRATOR', 'DEVELOPER'],
      },
      {
        title: 'Categorías',
        path: '/dashboard/categorias',
        icon: <Tags strokeWidth={2.3} />,
        access: ['ADMINISTRATOR'],
      },
      {
        title: 'Juegos',
        path: '/dashboard/juegos',
        icon: <Gamepad strokeWidth={2.3} />,
        access: ['ADMINISTRATOR', 'DEVELOPER'],
      },
      {
        title: 'Reportes',
        path: '/dashboard/reportes',
        icon: <MessageSquareWarning strokeWidth={2.3} />,
        access: ['ADMINISTRATOR'],
      },
      {
        title: 'Desarrolladores',
        path: '/dashboard/desarrolladores',
        icon: <Code strokeWidth={2.3} />,
        access: ['ADMINISTRATOR'],
      },
      {
        title: 'Solicitudes',
        path: '/dashboard/solicitudes',
        icon: <Mail strokeWidth={2.3} />,
        access: ['ADMINISTRATOR'],
      },
      {
        title: 'Posts',
        path: '/dashboard/posts',
        icon: <Newspaper strokeWidth={2.3} />,
        access: ['ADMINISTRATOR', 'DEVELOPER'],
      },
      {
        title: 'Información Personal',
        path: '/perfil',
        icon: <User strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
      },
      {
        title: 'Biblioteca',
        path: '/perfil/biblioteca',
        icon: <LibraryBigIcon strokeWidth={2.3} />,
        access: ['ESTANDAR'],
      },
      {
        title: 'Solicitud Desarrollador',
        path: '/perfil/solicitud-desarrollador',
        icon: <Mail strokeWidth={2.3} />,
        access: ['ESTANDAR'],
      },
      {
        title: 'Restablecer Contraseña',
        path: '/perfil/restablecer-contrasena',
        icon: <Lock strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
      },
      {
        title: 'Cerrar Sesión',
        path: '/',
        icon: <LogOut strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
        placeAtEnd: true,
      },
      {
        title: 'Eliminar Cuenta',
        path: '/',
        icon: <Trash strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
      },
    ],
    []
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showSidebar = !isMobile || toggleSidebar;

  return (
    <>
      {usuario && (
        <div className="flex flex-1 flex-wrap max-md:flex-col md:gap-12">
          <header className="w-full text-end md:hidden">
            <button
              onClick={() => setToggleSidebar((val) => !val)}
              className={showSidebar ? 'primary-button primary-button--sm' : 'secondary-button secondary-button--sm'}
            >
              <PanelLeftCloseIcon />
            </button>
          </header>
          {showSidebar && <ProfileSidebar routes={routes} usuario={usuario} />}
          {(!isMobile || (!showSidebar && isMobile)) && (
            <main className="border-placeholder-2 flex-1 max-md:w-full md:border-l-2 md:pl-12">
              <Outlet />
            </main>
          )}
        </div>
      )}
    </>
  );
}
