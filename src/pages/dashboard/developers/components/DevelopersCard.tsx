import { Ban, CalendarDays, Gamepad } from 'lucide-react';
import { Usuario } from '../../../../models/user.interface';
import { useAlert } from '../../../../hooks/useAlert';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function DeveloperCard({ developer }: { developer: Usuario }) {
  const { showAlert, showToast } = useAlert();
  const navigate = useNavigate();

  const [videoGameCount, setVideoGameCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`/api/video-games/developer/${developer.id}/video-games`)
      .then((res) => {
        setVideoGameCount(res.data.length);
      })
      .catch((e) => {
        console.error('Error fetching video games:', e);
      });
  }, []);

  const handleDelete = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    showAlert({
      title: 'Eliminar Desarrollador',
      message: '¿Estás seguro de que quieres eliminar este desarrollador?',
      type: 'warning',
      isConfirm: true,
      onClose: async (confirm) => {
        if (!confirm) return;
        try {
          await axios.delete(`/api/users/${developer.id}`);
          showToast({
            type: 'success',
            message: 'Desarrollador eliminado correctamente',
            duration: 2000,
          });
          navigate('/dashboard/desarrolladores', {
            state: { needsRefresh: true },
          });
        } catch {
          showAlert({
            title: 'Error',
            message: 'No se pudo eliminar el desarrollador.',
            type: 'error',
          });
        }
      },
    });
  };

  const formattedDate = new Date(developer.fechaNacimiento).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  return (
    <div className="bg-placeholder flex h-32 w-full flex-col justify-between rounded-md p-4 text-white shadow">
      <div className="flex items-center justify-between">
        <h4 className="text-md truncate uppercase">{developer.nombre}</h4>
        <Ban className="text-red stroke-2 hover:cursor-pointer" onClick={handleDelete} />
      </div>

      <div className="space-y-1 text-sm text-gray-200">
        <div className="flex items-center">
          <CalendarDays className="text-green mr-2 h-4 w-4 stroke-2" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center">
          <Gamepad className="text-green mr-2 h-4 w-4 stroke-2" />
          <span>
            {videoGameCount} videojuego{videoGameCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}
