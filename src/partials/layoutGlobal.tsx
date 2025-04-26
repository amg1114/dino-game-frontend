import { Outlet } from 'react-router-dom';
import Header from '../partials/header/Header';
import { Footer } from '../partials/footer/Footer';

const GlobalLayout = () => {
    return (
     
        <main className="h-screen bg-body py-9">
            <div className="container">
                <Header />
                <Outlet />
                <Footer />
            </div>
        </main>
      
        
    );
};

export default GlobalLayout;
