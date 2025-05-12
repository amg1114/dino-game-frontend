import { MailCheck, MailQuestion, MailX } from 'lucide-react';
import { StyledTextArea } from '../../../components/forms/StyledTextArea';
import { useSolicitudDesarrollador } from '../hooks/useSolicitudDesarrollador';
import { EstadoSolicitud } from '../../../models/solicitud.interface';

export function SolicitudDesarrollador() {
  const { solicitud, message, errors, handleChange, handleSubmit } = useSolicitudDesarrollador();

  const info: Record<EstadoSolicitud, { title: string; icon: React.ReactNode; message: string }> = {
    REJECTED: {
      title: 'Solicitud rechazada',
      icon: <MailX className="text-red" />,
      message:
        'Lamentablemente, tu solicitud ha sido rechazada. Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros.',
    },
    PENDING: {
      title: 'Solicitud pendiente',
      icon: <MailQuestion className="text-yellow" />,
      message:
        'Gracias por tu interés en publicar tus juegos en Dinogame. Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo lo antes posible.',
    },
    APPROVED: {
      title: 'Solicitud aprobada',
      icon: <MailCheck className="text-green" />,
      message: '¡Felicidades! Tu solicitud ha sido aprobada. Ahora puedes empezar a publicar tus juegos en Dinogame.',
    },
  };

  return (
    <>
      {solicitud.fetched && !solicitud.data && (
        <section>
          <h1>
            ¿Quieres publicar tus juegos en <span className="text-green">Dinogame</span>?
          </h1>
          <p>
            Envía tu solicitud para obtener un perfil de desarrollador y empezar a compartir tus creaciones con miles de
            jugadores. Cuéntanos sobre ti, tu experiencia y los proyectos que has desarrollado o estás desarrollando.
            Nuestro equipo revisará tu solicitud y te contactará lo antes posible. ¡Forma parte de la comunidad de
            creadores de Dinogame!
          </p>
          <form className="mt-4" onSubmit={(e) => handleSubmit(e)}>
            <StyledTextArea
              id="mensaje"
              placeholder="Escribe tu mensaje"
              value={message}
              onChange={(e) => handleChange(e)}
              name="mensaje"
              errors={errors}
            />
            <footer className="mt-4 flex justify-end gap-2">
              <button type="submit" className="primary-button" disabled={errors.length > 0}>
                Enviar
              </button>
              <button type="button" className="secondary-button">
                Cancelar
              </button>
            </footer>
          </form>
        </section>
      )}

      {solicitud.fetched && solicitud.data && (
        <section className="absolute inset-0 flex flex-1 flex-col items-center justify-center gap-4">
          <h1 className="flex items-center gap-2">
            {info[solicitud.data.estado].title}
            {info[solicitud.data.estado].icon}
          </h1>
          <p className="max-w-lg text-center">{info[solicitud.data.estado].message}</p>
        </section>
      )}
    </>
  );
}
