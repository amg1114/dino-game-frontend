import { useNavigate } from "react-router";
import { CategoryFormsComponent } from "./components/CategoryForms";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { Modal } from "@components/Modal";

export function CreateCategory() {
    const {
        data,
        errorTitulo,
        errorDescripcion,
        handleChange,
        createCategoria,
        isEmpty
    } = useCreateCategory();

    const navigate = useNavigate();

    return (
        <div>
            <Modal onClose={() => navigate('/dashboard/categorias')} modalId="create-category" modalTitle="Nueva Categoría">
                <CategoryFormsComponent
                    data={data}
                    errors={{
                        titulo: errorTitulo ? [errorTitulo] : undefined,
                        descripcion: errorDescripcion ? [errorDescripcion] : undefined
                    }}
                    onChange={handleChange}
                />
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={isEmpty}
                        onClick={createCategoria}
                        className="primary-button"
                    >
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