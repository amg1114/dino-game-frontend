
import { useAlert } from "@hooks/useAlert";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";

export function RecoverAccount() {

    const { token } = useParams();
    const { showToast, showAlert } = useAlert();
    const navigate = useNavigate();

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        if (!token) {
            console.error("Token is required for account recovery.");
            return;
        }
        axios.post(`/api/auth/recover-account?token=${token}`).then(() => {
            showToast({
                type: 'success',
                message: 'Cuenta recuperada exitosamente. Ahora puedes iniciar sesión.',
                duration: 4000,
            });
            navigate('/iniciar-sesion')
        }).catch(() => {
            showAlert({
                type: 'error',
                title: 'Error',
                message: "No se pudo recuperar la cuenta. Verifica el token o intenta nuevamente.",
                duration: 4000,
            });
        });
    }, [token]);

    return <>
    </>

}
