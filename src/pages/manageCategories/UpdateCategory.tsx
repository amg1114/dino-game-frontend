import { useParams } from "react-router";
import { InputFormsComponent } from "../../components/InputForms";
import { useUpdateCategory } from "./hooks/useUpdateCategory";

export function UpdateCategory() {
    const { slugCategoria } = useParams<{ slugCategoria: string }>();

    const { data, handleChange, errorTitulo, errorDescripcion, updateCategoria } = useUpdateCategory(slugCategoria!);

    if (!slugCategoria) return <p>Categoría no encontrada </p>;
    return (
        <div>
            <InputFormsComponent
                modalId="update-category"
                modalTitle="Actualiza la categoría"
                redirecTo="/dashboard/categorias"
                data={data}
                errors={{
                    titulo: errorTitulo ? [errorTitulo] : undefined,
                    descripcion: errorDescripcion ? [errorDescripcion] : undefined
                }}
                onChange={handleChange}
                onSubmit={updateCategoria}
            />
        </div>
    );
}