import { Comentario } from '../../../../models/comentario.interface';

export function Comment({ comment, isLast = false }: { comment: Comentario; isLast?: boolean }) {
  return (
    <>
      <div className={`w-full pb-2 mb-3${!isLast ? 'border-b-placeholder border-b-2' : ''}`}>
        <h4>
          <span className="text-green">&#64;</span>
          {comment.user.nombre}
        </h4>
        <p>{comment.comentario}</p>
      </div>
    </>
  );
}
