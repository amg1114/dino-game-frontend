import React from 'react';
import { StyledSelect } from '../../../../components/forms/StyledSelect';
import { useHomePage } from '../../../home/hooks/useHomePage';
import type { Categoria } from '../../../../models/categoria.interface';

interface CategoryFilterVideoGamesInputProps {
  inputCategoria: string;
  setInputCategoria: (value: string) => void;
}

export function CategoryFilterVideoGamesInput({
  inputCategoria,
  setInputCategoria,
}: CategoryFilterVideoGamesInputProps) {
  const { categories } = useHomePage();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInputCategoria(value);
  };
  const categorias: Categoria[] = categories.data;

  return (
    <div className="-mt-8">
      <StyledSelect
        label="Categoría"
        value={inputCategoria}
        onChange={handleChange}
        id="category-video-game"
        errors={[]}
        options={[
          { value: '', label: 'Todas las categorías' },
          ...categorias.map((categoria: Categoria) => ({
            value: categoria.slug,
            label: categoria.titulo,
          })),
        ]}
      />
    </div>
  );
}
