import logo from '../../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
  return (
    <footer className="px-4 py-8 text-white">
      <div className="border-t-placeholder border-t pt-6 text-center"> </div>
      <div className="container mx-auto">
        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 text-center md:mb-0 md:text-left">
            <div className="mb-4 flex items-center justify-center md:justify-start">
              <img src={logo} alt="DINOGAME Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="max-w-md">Tu tienda de juegos favorita, donde la diversión nunca se extingue.</p>
          </div>

          <div className="relative grid grid-cols-2 gap-8 max-md:text-center md:gap-16">
            <div className="border-r-placeholder border-r pr-4 md:border-r-0">
              <h4 className="mb-4 text-lg">USUARIOS</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="no-underline">
                    INICIAR SESIÓN
                  </a>
                </li>
                <li>
                  <a href="#" className="no-underline">
                    REGISTRARSE
                  </a>
                </li>
              </ul>
            </div>

            <div className="pl-4">
              <h4 className="mb-4 text-lg">INTERÉS</h4>
              <ul className="space-y-2 [&>li>a]:no-underline">
                <li>
                  <a href="#">JUEGOS</a>
                </li>
                <li>
                  <a href="#">BLOG</a>
                </li>
                <li>
                  <a href="#">SOBRE NOSOTROS</a>
                </li>
                <li>
                  <a href="#">DESARROLLADORES</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
