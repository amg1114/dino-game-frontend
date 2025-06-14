export type PostFormMode = 'create' | 'edit';
export interface BlogForm {
  titulo: string | null;
  descripcion: string | null;
  thumb: File | null;
}
