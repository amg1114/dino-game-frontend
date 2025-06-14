import { StyledInput } from '../../../../components/forms/StyledInput';
import { StyledTextArea } from '../../../../components/forms/StyledTextArea';

interface FormsProps {
  data: {
    titulo: string;
    descripcion: string;
  };
  errors?: {
    titulo?: string[];
    descripcion?: string[];
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function CategoryFormsComponent({ data, errors = {}, onChange }: FormsProps) {
  return (
    <div className="block items-center">
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
    </div>
  );
}
