import { Outlet } from 'react-router-dom';
import Header from '../partials/header/Header'; // Ajusta la ruta según tu estructura
import { Footer } from '../partials/footer/Footer'; // Ajusta la ruta según tu estructura

const GlobalLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-800">
        <Header />
        <main className="flex-grow p-4">
        <Outlet /> {/* Esto renderizará el contenido de las rutas hijas */}
        </main>
        <Footer />
    </div>
    );
};

export default GlobalLayout;