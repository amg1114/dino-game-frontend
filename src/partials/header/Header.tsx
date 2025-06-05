import { Search, Menu, User, ShieldUser, Joystick } from 'lucide-react';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router';

export function Header() {
  const { isLoading, usuario } = useAuth();
  return (
    <header className="flex items-center justify-between text-white">
      <div className="text-2xl tracking-wide">
        <figure className="w-24 md:w-40">
          <Link to="/">
            <img src={logo} alt="Logo Dinogame" className="h-auto w-full" />
          </Link>
        </figure>
      </div>

      <nav className="mr-auto ml-6 hidden space-x-6 lg:flex">
        <Link to="/blog" className="font-roboto text-white not-hover:no-underline">
          BLOG
        </Link>
        <Link to="/juegos" className="font-roboto text-white not-hover:no-underline">
          JUEGOS
        </Link>
        <Link to="/categorias" className="font-roboto text-white not-hover:no-underline">
          CATEGORÍAS
        </Link>
      </nav>

      <div className="hidden items-center space-x-4 lg:flex">
        <button className="transition-transform hover:text-green-400 active:scale-95">
          <Link to="/buscar" className="text-green text-2xl">
            <Search />
          </Link>
        </button>

        {(isLoading || !usuario) && (
          <>
            <Link to="/iniciar-sesion" className="primary-button">
              INICIAR SESIÓN
            </Link>
            <Link to="/registro" className="secondary-button">
              REGISTRARSE
            </Link>
          </>
        )}

        {!isLoading && usuario && (
          <Link to="/perfil" className="secondary-button flex items-center gap-2">
            {usuario.tipo === 'ESTANDAR' && (
              <span className="text-green font-bold">
                <User />
              </span>
            )}

            {usuario.tipo === 'ADMINISTRATOR' && (
              <span className="text-green font-bold">
                <ShieldUser />
              </span>
            )}

            {usuario.tipo === 'DEVELOPER' && (
              <span className="text-green font-bold">
                <Joystick />
              </span>
            )}

            {usuario.nombre}
          </Link>
        )}
      </div>

      <button type="button" className="text-green text-xl md:text-3xl lg:hidden">
        <Menu />
      </button>
    </header>
  );
}
