import logo from '../../assets/logo.svg'
import game_pad from './images/game_pad.png'
import dollar from './images/dollar.png'
import community from './images/community.png'
import react from './images/reactjs.png'
import nest from './images/nestjs.png'
import postgresql from './images/postgresql.png'
import alejo from './images/alejo.png'
import felipe from './images/felipe.png'
import daniel from './images/daniel.png'
import gina from './images/gina.png'
import nata from './images/nata.png'

export function AboutPage() {
    return (
        <div className='w-full mx-auto'>

            <div className='flex flex-col items-center'>
                <img className="w-xl" src={logo} alt="DinoGame-logo" />
                <h3 className='my-6 text-center md:text-2xl'>el lugar perfecto para conocer y crear juegos con estilo</h3>
            </div>

            <div className='grid grid-cols-1 mx-auto gap-10 md:grid-cols-3 max-w-[90%] text-center mt-10 border-b-placeholder-2 border-b pb-12'>
                <div>
                    <img className='w-52 mx-auto md:w-36' src={game_pad} alt="game_pad" />
                    <h3 className='mt-8'>Accede a Tus Juegos al Instante</h3>
                    <p>Desde grandes compañias hasta estudios inependientes. Disfruta de ofertas exclusivas, actualizaciones automáticas y otras grandes ventajas</p>
                </div>
                <div>
                    <img className='w-52 mx-auto md:w-36' src={dollar} alt="dollar-icon" />
                    <h3 className='mt-8'>Lanza tu Juego</h3>
                    <p>DinoGame ofrece un conjunto de herramientas y servicios que ayuda a desarrolladores a sacar el máximo provecho a la distribución de sus juegos</p>
                </div>
                <div >
                    <img className='w-52 mx-auto md:w-36' src={community} alt="community_icon" />
                    <h3 className='mt-8'>Nuestra Comunidad</h3>
                    <p>DinoGame nace como respuesta a la necesidad de un espacio hecho para el público interesado en este tipo de entretenimiento, siendo una plataforma que bsuca cumplir con las expectativas propuestas por los gamers</p>
                </div>
            </div>

            <div className='w-full mx-auto md:max-w-[70%] border-b-placeholder-2 border-b pb-12'>
                <h2 className='mt-8 pb-8 text-center'>herramientas utilizadas</h2>
                <div className='flex flex-col my-8 items-center md:flex-row'>
                    <img className='w-3xs' src={react} alt="ReactJs" />
                    <div className='text-center md:mr-0 md:px-4 md:text-start'>
                        <h3 className='my-2'>reactjs</h3>
                        <p>En el frontend se empleó ReactJS para crear una interfaz dinamica y responsiva. Se implementaron
                            componentes reutilizables que mejjoran la experiencia del usuario, permtiendo una navegación fluida
                            y una visualización clara de los productos.
                        </p>
                    </div>
                </div>

                <div className='flex flex-col items-center md:flex-row-reverse'>
                    <img className='w-3xs' src={nest} alt="NestJS" />
                    <div className='m-auto text-center md:mr-2 md:text-end'>
                        <h3 className='mt-2'>nestjs</h3>
                        <p>Se utilizó NestJS para construir la lógica del backend, aprovechando su estructura modular y soporte para TypeScript.
                            Permitió desarrollar una API robusta, escalable y mantenible, facilitando la gestión de rutas, controladores y sevicios.
                        </p>
                    </div>

                </div>
                <div className='flex flex-col items-center my-8 md:flex-row'>
                    <img className='w-3xs' src={postgresql} alt="postgresql" />
                    <div className='m-auto text-center md:ml-3 md:text-start'>
                        <h3 className='mt-2'>postgresql</h3>
                        <p>Para la gestión de datos se utilizó PostgreSQL, una base de datos relacional potente y confiable.
                            Se estructuraron las tablas para manejar eficientemente información sobre productos, usuarios y pedidos,
                            optimizando las consultas y asegurando la integridad de los datos.
                        </p>
                    </div>
                </div>
            </div>

            <h2 className='mt-8 text-center'>equipo de desarrollo</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 place-items-center'>
                <div className='flex flex-col items-center text-center'>
                    <img src={felipe} alt="Dev-semisenior-felipe" />
                    <h3 className='mt-4'>Felipe Cabal</h3>
                    <p>Desarrollador Full Stack (Semi-senior)</p>

                </div>

                <div className='flex flex-col items-center text-center'>
                    <img src={gina} alt="Dev-gina" />
                    <h3>Gina Moreno</h3>
                    <p>Desarrolladora Web (Junior) enfocada en front </p>
                </div>

                <div className='flex flex-col items-center text-center'>
                    <img src={alejo} alt="Senior-dev-Alejo" />
                    <h3>Alejandro Moreno</h3>
                    <p>Desarrollador web (Senior) con rol de Full Stack Developer, Scrum Máster y Diseñador UI/UX.</p>
                </div>

                <div className='flex flex-col items-center text-center'>
                    <img src={daniel} alt="Dev-daniel" />
                    <h3>Daniel Cuestas</h3>
                    <p>Desarrollador web (Junior) enfocado en frontend con ReactJS y tareas de QA.</p>
                </div>

                <div className='flex flex-col items-center text-center'>
                    <img src={nata} alt="Dev-Natalia" />
                    <h3>Natalia Gomez</h3>
                    <p>Desarrolladora Web (Junior) centrada en frontend.</p>

                </div>
            </div>
        </div>
    );
};