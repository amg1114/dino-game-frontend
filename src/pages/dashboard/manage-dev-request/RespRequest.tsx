import { useNavigate, useParams } from "react-router";
import { Modal } from "../../../components/Modal";
import { useGetRequest } from "./hooks/useRequest";
import axios from "axios";
import { useAlert } from "../../../hooks/useAlert";
import React from "react";

export function RespRequest() {

    const { id } = useParams<{ id: string }>()
    const { data, setData } = useGetRequest(id!);
    const navigate = useNavigate();
    const { showToast } = useAlert();

    const handleAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            axios.patch(`/api/users/developers/${id}/solicitud`, { estado: data.estado = "APPROVED" });
            showToast({
                type: "success",
                message: "Solicitud Acceptada",
                duration: 2000
            });
            navigate("/dashboard/solicitudes", { state: { needsRefresh: true } });
        } catch (e) {
            console.error(e);
        };
    }

    const handleReject = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        try {
            axios.patch(`/api/users/developers/${id}/solicitud`, { estado: data.estado = "REJECTED" });
            showToast({
                type: 'success',
                message: 'Solicitud Rechazada',
                duration: 2000
            });
            navigate('/dashboard/solicitudes', { state: { needsRefresh: true } });
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <div>
            <Modal onClose={() => navigate('/dashboard/solicitudes')} modalId="Resp-dev-request" modalTitle="Solicitud para verificación como dev">
                <div className="h-max">
                    <div className="">
                        <h4>Titulo</h4>
                        <input readOnly className="w-full mb-6 bg-placeholder text-center text-sm uppercase font-medium p-3 rounded-sm" type="text" name="titulo" value={data.titulo} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                        <h4 className="">Mensaje</h4>
                        <textarea readOnly className="w-full h-60 leading-6 text-justify bg-placeholder p-3 rounded-sm" name="mensaje" value={data.mensaje} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
                    </div>
                    <button type="submit" onClick={handleAccept} className="absolute mt-4 right-7 w-1/4 bg-green rounded-xl p-3 hover:cursor-pointer hover:bg-white hover:text-green hover:-translate-y-1 transition-all duration-200 ">Aceptar </button>
                    <button type="submit" onClick={handleReject} className="absolute mt-18 right-7 w-1/4 underline p-3 rounded hover:cursor-pointer hover:bg-placeholder">Rechazar </button>
                </div>
            </Modal>
        </div>
    );
}