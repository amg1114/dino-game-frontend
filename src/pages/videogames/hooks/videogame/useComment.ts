import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CommentValidator } from "../../../../utils/zod/comment.validator";
import { z } from "zod";

export function useComment({ fetchData }: { fetchData: () => Promise<void> }) {
    const { slug } = useParams();
    const [comentario, setComentario] = useState("");
    const [error, setError] = useState("");

    const handleComentarioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComentario(e.target.value);
    };

    const handleComentarioSubmit = () => {
        try {
            CommentValidator.parse(comentario);
            axios.post(`/api/video-games/${slug}/comentarios`, { comentario: comentario })
                .then(() => {
                    setComentario("");
                    fetchData();
                })
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError("");
                setError(error.errors[0].message);
            } else {
                setError("Error desconocido");
            }
        }
    };
    useEffect(() => {
        if (comentario.length === 0) {
            setError("");
            return;
        }
    }, [comentario]);

    return {
        comentario,
        setComentario,
        handleComentarioChange,
        handleComentarioSubmit,
        error
    };
}