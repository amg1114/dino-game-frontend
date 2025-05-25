import axios from "axios";
import { useNavigate } from "react-router";
import { useAlert } from "../../../hooks/useAlert";
import { useCallback } from "react";

export function useDeleteDescuento(id: number | string | null, descuento: number | string | null) {
    const navigate = useNavigate();
    const { showToast, showAlert } = useAlert();

    const handleDelete = useCallback((ObtenerDescuentos: () => void) => {
        showAlert({
            title: 'Eliminar descuento',
            message: '¿Estás seguro de que deseas eliminar este descuento?',
            type: 'warning',
            isConfirm: true,
            onClose(confirm) {
                if (confirm) {
                    axios
                        .delete(`/api/video-games/${id}/descuentos/${descuento}`)
                        .then((res) => {
                            console.log(res.data);
                            showToast({
                                type: 'success',
                                message: 'Descuento eliminado correctamente',
                                duration: 2000,
                            });
                            ObtenerDescuentos();
                            navigate(`/dashboard/juegos/${id}/descuentos`);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                }
            }
        })
    }, [showAlert, id, descuento, navigate, showToast]);
    return handleDelete;
}