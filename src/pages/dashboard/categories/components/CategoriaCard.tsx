import { SquarePen, Trash, Gamepad } from 'lucide-react';
import { Categoria } from '../../../../models/categoria.interface';
import { truncateDescription } from '../../../../utils/truncateDescription';
import { Link, useNavigate } from 'react-router';
import { useAlert } from '../../../../hooks/useAlert';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function CategoriaCard({ categoria }: { categoria: Categoria }) {
  const { showAlert, showToast } = useAlert();
  const navigate = useNavigate();
  const [videoGames, setVideoGames] = useState<number>(0);

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + '/api/categorias?withGames=true').then((resp) => {
      const respuesta = resp.data.data;
      const categoriaConJuegos = respuesta.find((cat: Categoria) => cat.id === categoria.id);
      setVideoGames(categoriaConJuegos?.videoGames?.length || 0);
    });
  }, [categoria.id]);

  const handleDelete = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    showAlert({
      title: 'Eliminar Categoría',
      message: '¿Estás seguro de que quieres eliminar esta categoría?',
      type: 'warning',
      isConfirm: true,
      onClose: async (confirm) => {
        if (!confirm) return;

        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/api/categorias/${categoria.id}`);
          showToast({
            type: 'success',
            message: 'Categoría eliminada correctamente',
            duration: 2000,
          });
          navigate('/dashboard/categorias', { state: { needsRefresh: true } });
        } catch {
          showAlert({
            title: 'Error',
            message: '',
            type: 'error',
          });
        }
      },
    });
  };

  return (
    <div className="bg-placeholder relative flex aspect-[16/9] w-full flex-col rounded-md p-4 md:max-w-3xs lg:max-w-xl">
      <div className="mb-1 flex flex-row justify-between uppercase">
        <div className="lg:text-mb md:text-sm">
          <h4>{categoria.titulo}</h4>
        </div>
        <div className="mt-1 flex gap-1 stroke-2 md:text-sm lg:text-xl">
          <Link to={`/dashboard/categorias/update/${categoria.slug}`}>
            <SquarePen className="text-green" />
          </Link>
          <Trash className="text-red hover:cursor-pointer" onClick={handleDelete} />
        </div>
      </div>
      <div className="mt-2 min-h-1 flex-1 overflow-y-hidden">
        <p>{truncateDescription(categoria.descripcion)}</p>
      </div>
      <div className="absolute bottom-2 flex">
        <Gamepad className="text-green stroke-2 text-2xl" />
        <p className="md:text-mb mt-0.5 ml-1 text-sm">{videoGames}</p>
      </div>
    </div>
  );
}
