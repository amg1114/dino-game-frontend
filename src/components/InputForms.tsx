import { StyledInput } from "./forms/StyledInput";
import { StyledTextArea } from "./forms/StyledTextArea";
import { Modal } from "./Modal";
import { useNavigate } from "react-router";

interface InputFormsProps {
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
    buttonLabel?: string;
    buttonLabelTwo?: string;
}

export function InputFormsComponent({
    modalId,
    modalTitle,
    redirecTo,
    data,
    errors = {},
    onChange,
    onSubmit,
    buttonLabel = "Guardar",
    buttonLabelTwo = "Salir"
}: InputFormsProps) {

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

                    <button type="submit" className="text-white bg-green mt-4 rounded p-2 hover:cursor-pointer hover:bg-white hover:text-green">
                        {buttonLabel}
                    </button>
                    <button onClick={salir} className="ml-6 bg-green p-2 rounded text-white hover:cursor-pointer hover:bg-white hover:text-green">
                        {buttonLabelTwo}
                    </button>
                </form>
            </Modal>
        </div>
    );
}