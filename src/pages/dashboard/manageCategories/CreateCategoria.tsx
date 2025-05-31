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
        createCategoria
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
                        onClick={createCategoria}
                        className="rounded p-3 transition-all duration-200 bg-green hover:bg-white hover:text-green hover:-translate-y-1 cursor-pointer"
                    >
                        Guardar
                    </button>
                    <button onClick={() => navigate('/dashboard/categorias')} className="ml-4 p-3 rounded underline hover:cursor-pointer hover:bg-placeholder">
                        Cancelar
                    </button>
                </div>
            </Modal>
        </div>

    );
}