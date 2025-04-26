import { Search } from 'lucide-react';
import logo from '../../assets/logo.svg';

export default function Header() {
    return (
        <header className="text-white px-6 py-2 flex items-center justify-between shadow-md">
        <div className="text-2xl tracking-wide">
            <figure className='w-40'>
                <img src={logo} alt="Logo Dinogame" className='w-full h-auto' />
            </figure>
        </div>

        <nav className="md:flex space-x-6 font-semibold mr-auto ml-6">
            <a href="/blog" className="text-white no-underline">BLOG</a>
            <a href="/juegos" className="text-white no-underline">JUEGOS</a>
            <a href="/categorias" className="text-white no-underline">CATEGORÍAS</a>
        </nav>
        
        <div className="flex items-center space-x-4">
            <button className="hover:text-green-400 active:scale-95 transition-transform">
            <a href="/buscar">
                <Search size={18} color="#3DAB7B" />
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
    </header>
    );
}
