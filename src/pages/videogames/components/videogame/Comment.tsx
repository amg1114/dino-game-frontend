import { Comentario } from "../../../../models/comentario.interface";

export function Comment({ comment }: { comment: Comentario }) {
    return (
        <>
            <div className="w-full border-b-2 border-b-placeholder pb-2 mb-3">
                <h4><span className="text-green">&#64;</span>{comment.user.nombre}</h4>
                <p>{comment.comentario}</p>
            </div>
        </>
    )
}