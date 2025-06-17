import { useNavigate, useParams } from 'react-router';
import { Modal } from '../../../../components/Modal';
import { useGetRequest } from './hooks/useRequest';
import axios from 'axios';
import { useAlert } from '../../../../hooks/useAlert';
import React from 'react';

export function RespRequest() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetRequest(id!);
  const navigate = useNavigate();
  const { showToast } = useAlert();

  const handleAccept = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      axios.patch(`/api/users/developers/${id}/solicitud`, { estado: (data.estado = 'APPROVED') });
      showToast({
        type: 'success',
        message: 'Solicitud Acceptada',
        duration: 2000,
      });
      navigate('/dashboard/solicitudes', { state: { needsRefresh: true } });
    } catch (e) {
      console.error(e);
    }
  };

  const handleReject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      axios.patch(`/api/users/developers/${id}/solicitud`, { estado: (data.estado = 'REJECTED') });
      showToast({
        type: 'success',
        message: 'Solicitud Rechazada',
        duration: 2000,
      });
      navigate('/dashboard/solicitudes', { state: { needsRefresh: true } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <Modal onClose={() => navigate('/dashboard/solicitudes')} modalId="Resp-dev-request" modalTitle="Solicitud">
        <div className="h-max">
          <div className="">
            <h4>Titulo</h4>
            <p className="mb-4 w-full rounded-sm text-sm uppercase">{data.titulo}</p>

            <h4 className="">Mensaje</h4>
            <p className="w-full rounded-sm text-justify leading-6">{data.mensaje}</p>
            {/* <textarea readOnly  name="mensaje" value={data.mensaje} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} /> */}
          </div>
          <div className="mt-6 flex justify-end">
            <button type="submit" onClick={handleAccept} className="primary-button">
              Aceptar{' '}
            </button>
            <button type="submit" onClick={handleReject} className="secondary-button ml-4">
              Rechazar{' '}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
