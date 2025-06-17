import { StyledTextArea } from '../../../../components/forms/StyledTextArea';
import { Comment } from './Comment';
import { Comentario } from '../../../../models/comentario.interface';
import { useComment } from '../../hooks/videogame/useComment';

export function CommentsSection({
  comentarios,
  fetchData,
}: {
  comentarios: Comentario[];
  fetchData: () => Promise<void>;
}) {
  const comments = comentarios;
  const { handleComentarioChange, handleComentarioSubmit, comentario, setComentario, error, usuario } = useComment({
    fetchData,
  });

  return (
    <>
      <div className="w-full">
        {usuario?.tipo !== 'ESTANDAR' && usuario ? (
          <></>
        ) : (
          <>
            <StyledTextArea
              placeholder="Escribe un comentario"
              onChange={handleComentarioChange}
              value={comentario}
              name="comentario"
              id="comentario"
              errors={error ? [error] : []}
            />
            <div className="mt-3 flex w-full justify-end gap-2">
              <button onClick={handleComentarioSubmit} className="primary-button uppercase">
                Guardar
              </button>
              <button onClick={() => setComentario('')} className="secondary-button uppercase">
                Descartar
              </button>
            </div>
          </>
        )}

        <div className="mt-3 w-full">
          {comments.length > 0 ? (
            <>
              {comments.map((comment: Comentario) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </>
          ) : (
            <p className="bg-placeholder text-body rounded p-4 text-center uppercase">No hay comentarios disponibles</p>
          )}
        </div>
      </div>
    </>
  );
}
