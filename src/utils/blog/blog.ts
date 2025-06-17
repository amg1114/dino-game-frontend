export type PostFormMode = 'create' | 'edit';
export interface PostForm {
  titulo: string | null;
  descripcion: string | null;
  thumb: File | null;
}

export type PostFormField = keyof PostForm;
