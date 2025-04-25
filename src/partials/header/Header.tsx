import { Search } from 'lucide-react';
import logo from '../../assets/logo.svg';

export default function Header() {
    return (
        <header className="bg-gray-700 text-white px-6 py-2 flex items-center justify-between shadow-md">
        <div className="text-2xl font-bold tracking-wide">
            <figure className='w-40'>
                <img src={logo} alt="Logo Dinogame" className='w-full h-auto' />
            </figure>
        </div>

        <nav className="md:flex space-x-6 font-semibold mr-auto ml-6">
            <a href="#" className="text-white no-underline">BLOG</a>
            <a href="#" className="text-white no-underline">JUEGOS</a>
            <a href="#" className="text-white no-underline">CATEGORÍAS</a>
        </nav>
    
        <div className="flex items-center space-x-4">
            <button className="text-green-500 hover:text-green-400 active:scale-95 transition-transform" onClick={() => alert('Función de búsqueda no implementada')}>
                <Search size={18} color="#3DAB7B" />
            </button>

            <button className="primary-button" onClick={() => alert('Función de iniciar sesión no implementada')}>
                INICIAR SESIÓN
            </button>
            <button className="secondary-button" style={{ backgroundColor: '#303030' }} onClick={() => alert('Función de registrarse no implementada')}>
                REGISTRARSE
            </button>
        </div>
    </header>
  );
}
