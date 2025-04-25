import logo from '../../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
    return (
    <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="border-t border-gray-700 pt-6 text-center" style={{ color: '#333333' }}> </div>
        <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center mb-4">
                <img 
                src={logo} 
                alt="DINOGAME Logo" 
                className="h-12 w-auto object-contain"
                />
            </div>
            <p className="text-gray-400 max-w-md">
                Tu tienda de juegos favorita, donde la diversión nunca se extingue.
            </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
                <h3 className="text-lg font-bold mb-4 text-yellow-400">USUARIOS</h3>
                <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">INICIAR SESIÓN</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">REGISTRARSE</a></li>
                </ul>
            </div>

            <div>
                <h3 className="text-lg font-bold mb-4 text-yellow-400">INTERÉS</h3>
                <ul className="space-y-2">
                <li><a href="#" className="hover:text-yellow-400 transition-colors">JUEGOS</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">BLOG</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">SOBRE NOSOTROS</a></li>
                <li><a href="#" className="hover:text-yellow-400 transition-colors">DESARROLLADORES</a></li>
                </ul>
            </div>
            </div>
        </div>
        </div>
    </footer>
    );
};