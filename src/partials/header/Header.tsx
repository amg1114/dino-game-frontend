import { Search, Menu } from 'lucide-react';
import logo from '../../assets/logo.svg';

export default function Header() {
  return (
    <header className="flex items-center justify-between text-white">
      <div className="text-2xl tracking-wide">
        <figure className="w-24 md:w-40">
          <img src={logo} alt="Logo Dinogame" className="h-auto w-full" />
        </figure>
      </div>

      <nav className="mr-auto ml-6 hidden space-x-6 md:flex">
        <a href="/blog" className="font-roboto text-white not-hover:no-underline">
          BLOG
        </a>
        <a href="/juegos" className="font-roboto text-white not-hover:no-underline">
          JUEGOS
        </a>
        <a href="/categorias" className="font-roboto text-white not-hover:no-underline">
          CATEGORÍAS
        </a>
      </nav>

      <div className="hidden items-center space-x-4 md:flex">
        <button className="transition-transform hover:text-green-400 active:scale-95">
          <a href="/buscar" className="text-green">
            <Search />
          </a>
        </button>

        <button className="primary-button">
          <a href="/iniciar-sesion" className="text-white no-underline">
            INICIAR SESIÓN
          </a>
        </button>
        <button className="secondary-button">
          <a href="/registro" className="text-white no-underline">
            REGISTRARSE
          </a>
        </button>
      </div>

      <button type="button" className="text-green md:hidden">
        <Menu />
      </button>
    </header>
  );
}
