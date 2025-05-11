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
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProfileRoute, ProfileSidebar } from './components/ProfileSidebar';
import { useAlert } from '../../hooks/useAlert';

export function ProfileLayout() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { usuario, logOut, deleteAccount } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [toggleSidebar, setToggleSidebar] = useState(false);

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

  const handleLogout = useCallback(() => {
    showAlert({
      title: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      type: 'warning',
      isConfirm: true,
      onClose(confirm) {
        if (confirm) {
          logOut();
          navigate('/');
        }
      },
    });
  }, [showAlert, logOut, navigate]);

  const handleDeleteAccount = useCallback(() => {
    showAlert({
      title: 'Cerrar Sesión',
      message: '¿Estás seguro de que deseas cerrar sesión? Esto eliminará tu cuenta y no podrás recuperarla.',
      type: 'warning',
      isConfirm: true,
      onClose(confirm) {
        if (confirm) {
          deleteAccount()
            .then(() => {
              showAlert({
                title: 'Éxito',
                message: 'Tu cuenta ha sido eliminada con éxito.',
                type: 'success',
                duration: 2000,
              });
              navigate('/');
            })
            .catch(() => {
              showAlert({
                title: 'Error',
                message: 'Hubo un error al eliminar tu cuenta. Por favor, inténtalo de nuevo más tarde.',
                type: 'error',
              });
            });

          return;
        }

        showAlert({
          title: 'Cancelado',
          message: 'La eliminación de la cuenta ha sido cancelada.',
          type: 'info',
          duration: 2000,
        });
      },
    });
  }, [deleteAccount, showAlert, navigate]);

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
        onClick: handleLogout,
        icon: <LogOut strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
        placeAtEnd: true,
      },
      {
        title: 'Eliminar Cuenta',
        onClick: handleDeleteAccount,
        icon: <Trash strokeWidth={2.3} />,
        access: ['ESTANDAR', 'DEVELOPER', 'ADMINISTRATOR'],
      },
    ],
    [handleLogout, handleDeleteAccount]
  );
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
