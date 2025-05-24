import { StyledInput } from "../../../../components/forms/StyledInput";
import { StyledTextArea } from "../../../../components/forms/StyledTextArea";
import { Modal } from "../../../../components/Modal";
import { useNavigate } from "react-router";

interface FormsProps {
    modalId: string;
    modalTitle: string;
    redirecTo: string;
    data: {
        titulo: string;
        descripcion: string;
    };
    errors?: {
        titulo?: string[];
        descripcion?: string[];
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    saveButton?: string;
    exitButton?: string;
}

export function CategoryFormsComponent({
    modalId,
    modalTitle,
    redirecTo,
    data,
    errors = {},
    onChange,
    onSubmit,
    saveButton = "Guardar",
    exitButton = "Cancelar"
}: FormsProps) {

    const navigate = useNavigate();

    const salir = () => navigate(redirecTo);

    return (
        <div className="block items-center">
            <Modal modalTitle={modalTitle} size="md" modalId={modalId}>
                <form onSubmit={onSubmit}>
                    <div className="my-3">
                        <StyledInput
                            id="titulo"
                            type="input"
                            placeholder="Título"
                            value={data.titulo}
                            onChange={onChange}
                            label="Título"
                            errors={errors?.titulo}

                        />
                    </div>
                    <div>
                        <StyledTextArea
                            id="descripcion"
                            placeholder="Descripción"
                            value={data.descripcion}
                            onChange={onChange}
                            label="Descripción"
                            errors={errors?.descripcion}
                        />
                    </div>
                    <div className="flex flex-col w-1/4">
                        <button type="submit" className="mb-4 text-white font-medium bg-green mt-4 rounded p-2 hover:cursor-pointer hover:bg-white hover:text-green">
                            {saveButton}
                        </button>
                        <button onClick={salir} className="bg-white p-2 rounded text-green hover:cursor-pointer hover:bg-green hover:text-white">
                            {exitButton}
                        </button>
                    </div>

                </form>
            </Modal>
        </div>
    );
}