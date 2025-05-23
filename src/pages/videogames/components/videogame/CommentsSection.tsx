import { StyledTextArea } from "../../../../components/forms/StyledTextArea";
import { Comment } from "./Comment";
import { Comentario } from "../../../../models/comentario.interface";
import { useComment } from "../../hooks/videogame/useComment";

export function CommentsSection({ comentarios, fetchData }: { comentarios: Comentario[], fetchData: () => Promise<void> }) {
    const comments = comentarios;
    const { handleComentarioChange, handleComentarioSubmit, comentario, setComentario, error } = useComment({ fetchData });
    return <>
        <div className="w-full">
            <h2>Comentarios</h2>
            <StyledTextArea
                placeholder="Escribe un comentario"
                onChange={handleComentarioChange}
                value={comentario}
                name="comentario"
                id="comentario"
                errors={error ? [error] : []}
            />
            <div className="w-full flex gap-2 mt-3 justify-end">
                <button onClick={handleComentarioSubmit} className="primary-button uppercase">
                    Guardar
                </button>
                <button onClick={() => setComentario("")} className="secondary-button uppercase">
                    Descartar
                </button>
            </div>
            <div className="w-full mt-3 sm:mt-0">
                {
                    comments.length > 0 ? <>
                        {comments.map((comment: Comentario) => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </> : <></>
                }
            </div>
        </div>
    </>

}