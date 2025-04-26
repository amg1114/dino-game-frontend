import logo from '../../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
    return (
    <footer className="text-white py-8 px-4">
        <div className="border-t pt-6 text-center" > </div>
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
            <p className="max-w-md">
                Tu tienda de juegos favorita, donde la diversión nunca se extingue.
            </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-16 relative">
                <div className="border-b-placeholder-2 pr-4 border-r md:border-r-0">
                    <h3 className="text-lg font-bold mb-4">USUARIOS</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className='no-underline'>INICIAR SESIÓN</a></li>
                        <li><a href="#" className='no-underline'>REGISTRARSE</a></li>
                    </ul>
                </div>

                <div className="pl-4">
                    <h3 className="text-lg font-bold mb-4">INTERÉS</h3>
                    <ul className="space-y-2 [&>li>a]:no-underline">
                        <li><a href="#">JUEGOS</a></li>
                        <li><a href="#">BLOG</a></li>
                        <li><a href="#">SOBRE NOSOTROS</a></li>
                        <li><a href="#">DESARROLLADORES</a></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    </footer>
    );
};