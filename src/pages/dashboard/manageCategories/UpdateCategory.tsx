import { useNavigate, useParams } from "react-router";
import { CategoryFormsComponent } from "./components/CategoryForms";
import { useUpdateCategory } from "./hooks/useUpdateCategory";
import { Modal } from "@components/Modal";

export function UpdateCategory() {
    const { slug } = useParams<{ slug: string }>();

    const { data, handleChange, errorTitulo, errorDescripcion, updateCategoria, isModified } = useUpdateCategory(slug!);

    const navigate = useNavigate();

    if (!slug) return <p>Categoría no encontrada </p>;
    return (
        <div>
            <Modal onClose={() => navigate('/dashboard/categorias')} modalId="update-category" modalTitle="Actualiza la Categoría" >
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
                        onClick={updateCategoria}
                        disabled={!isModified}
                        className={`rounded p-3 transition-all duration-200 ${!isModified
                            ? 'bg-green brightness-75'
                            : 'bg-green hover:bg-white hover:text-green hover:-translate-y-1 cursor-pointer'
                            }`}
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