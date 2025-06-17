import { Comentario } from '../../../../models/comentario.interface';

export function Comment({ comment }: { comment: Comentario }) {
  return (
    <>
      <div className={`bg-placeholder mb-3 w-full rounded p-3`}>
        <h4>
          <span className="text-green">&#64;</span>
          {comment.user.nombre}
        </h4>
        <p>{comment.comentario}</p>
      </div>
    </>
  );
}
