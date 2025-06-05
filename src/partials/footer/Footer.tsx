import { Link } from 'react-router';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../hooks/useAuth';

export const Footer = () => {
  const { isLoading, usuario } = useAuth();
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
              {(isLoading || !usuario) && (
                <>
                  <li>
                    <Link to="/iniciar-sesion" className="no-underline">
                      INICIAR SESIÓN
                    </Link>
                  </li>
                  <li>
                    <Link to="/registro" className="no-underline">
                      REGISTRARSE
                    </Link>
                  </li>
                </>
              )}
              {!isLoading && usuario && (
                <>
                  <li>
                    <Link to="/perfil" className="no-underline">
                      PERFIL
                    </Link>
                  </li>
                  {usuario.tipo === 'ESTANDAR' && (
                    <li>
                      <Link to="/perfil/solicitud-desarrollador" className="no-underline">
                        SOLICITUD DESARROLLADOR
                      </Link>
                    </li>
                  )}
                  {usuario.tipo !== 'ESTANDAR' && (
                    <li>
                      <Link to="/perfil/dashboard" className="no-underline">
                        DASHBOARD
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </article>

          <article>
            <h4 className="mb-4 text-lg">INTERÉS</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/juegos" className="no-underline">
                  JUEGOS
                </Link>
              </li>
              <li>
                <Link to="/blog" className="no-underline">
                  BLOG
                </Link>
              </li>
              <li>
                <Link to="/about" className="no-underline">
                  SOBRE NOSOTROS
                </Link>
              </li>
              <li>
                <Link to="/about#desarrolladores" className="no-underline">
                  DESARROLLADORES
                </Link>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </footer>
  );
};
