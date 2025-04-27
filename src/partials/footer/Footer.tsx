import logo from '../../assets/logo.svg'; // Asegúrate de que la ruta sea correcta

export const Footer = () => {
  return (
    <footer className="border-t-placeholder border-t pt-6 text-white max-md:text-center">
      <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
        <div className="mb-6 text-center md:mb-0 md:text-left">
          <div className="mb-4 flex items-center justify-center md:justify-start">
            <img src={logo} alt="DINOGAME Logo" className="h-12 w-auto object-contain" />
          </div>
          <p className="max-w-md">Tu tienda de juegos favorita, donde la diversión nunca se extingue.</p>
        </div>

        <div className="flex gap-8 max-md:flex-col max-md:justify-center max-md:text-center md:gap-16">
          <article>
            <h4 className="mb-4 text-lg">USUARIOS</h4>
            <ul className="space-y-2">
              <li>
                <a href="/login" className="no-underline">
                  INICIAR SESIÓN
                </a>
              </li>
              <li>
                <a href="/registe" className="no-underline">
                  REGISTRARSE
                </a>
              </li>
            </ul>
          </article>

          <article>
            <h4 className="mb-4 text-lg">INTERÉS</h4>
            <ul className="space-y-2">
              <li>
                <a href="/juegos" className="no-underline">
                  JUEGOS
                </a>
              </li>
              <li>
                <a href="/blog" className="no-underline">
                  BLOG
                </a>
              </li>
              <li>
                <a href="/about" className="no-underline">
                  SOBRE NOSOTROS
                </a>
              </li>
              <li>
                <a href="/about#desarrolladores" className="no-underline">
                  DESARROLLADORES
                </a>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </footer>
  );
};
