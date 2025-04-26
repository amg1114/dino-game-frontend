import { Outlet } from 'react-router-dom';
import Header from '../partials/header/Header';
import { Footer } from '../partials/footer/Footer';

const GlobalLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-body">
        <Header />
        <main className="flex-grow bg-body py-9">
            <div className="container">
                <Outlet />
            </div>
        </main>
        <Footer />
        </div>
    );
};

export default GlobalLayout;
