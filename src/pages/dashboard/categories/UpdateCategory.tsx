import { useNavigate, useParams } from 'react-router';
import { CategoryFormsComponent } from './components/CategoryForms';
import { useUpdateCategory } from './hooks/useUpdateCategory';
import { Modal } from '@components/Modal';

export function UpdateCategory() {
  const { slug } = useParams<{ slug: string }>();

  const { data, handleChange, errorTitulo, errorDescripcion, updateCategoria, isModified } = useUpdateCategory(slug!);

  const navigate = useNavigate();

  if (!slug) return <p>Categoría no encontrada </p>;
  return (
    <div>
      <Modal
        onClose={() => navigate('/dashboard/categorias')}
        modalId="update-category"
        modalTitle="Actualiza la Categoría"
      >
        <CategoryFormsComponent
          data={data}
          errors={{
            titulo: errorTitulo ? [errorTitulo] : undefined,
            descripcion: errorDescripcion ? [errorDescripcion] : undefined,
          }}
          onChange={handleChange}
        />
        <div className="mt-6 flex justify-end">
          <button type="submit" onClick={updateCategoria} disabled={!isModified} className="primary-button">
            Guardar
          </button>
          <button onClick={() => navigate('/dashboard/categorias')} className="secondary-button ml-4">
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}
