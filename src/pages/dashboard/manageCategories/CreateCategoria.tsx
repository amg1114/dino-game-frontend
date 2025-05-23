import { CategoryFormsComponent } from "./components/CategoryForms";
import { useCreateCategory } from "./hooks/useCreateCategory";

export function CreateCategory() {
    const {
        data,
        errorTitulo,
        errorDescripcion,
        handleChange,
        createCategoria
    } = useCreateCategory();

    return (
        <div>
            <CategoryFormsComponent
                modalId="create-category"
                modalTitle="Nueva Categoría"
                redirecTo="/dashboard/categorias"
                data={data}
                errors={{
                    titulo: errorTitulo ? [errorTitulo] : undefined,
                    descripcion: errorDescripcion ? [errorDescripcion] : undefined
                }}
                onChange={handleChange}
                onSubmit={createCategoria}
            />
        </div>
    );
}