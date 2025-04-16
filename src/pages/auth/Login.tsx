import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { useAuth } from "../../providers/AuthContext";
import { useEffect, useState } from "react";
import { z } from "zod";
import axios from "axios";

const schema = z.object({
    correo: z.string().email("Correo electrónico inválido")
});

export function Login() {
    const ENDPOINT = import.meta.env.API_URL + '/auth/login';
    const { usuario, updateToken, isLoading } = useAuth();
    const [data, setData] = useState({
        correo: '',
        password: ''
    });
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [successModal, setSuccessModal] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const navigate = useNavigate();
    const onclose = (): void => {
        navigate('/');
    };

    useEffect(() => {
        if (!isLoading && usuario) {
            navigate('/');
        }
        if (errorModal) {
            setTimeout(() => {
                setErrorModal(null);
            }, 3000);
        }
        if (successModal) {
            setTimeout(() => {
                setSuccessModal(false);
                navigate('/');
            }, 3000);
        }
    }, [usuario, isLoading, errorModal, successModal]);

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            schema.parse(data);
            axios.post(ENDPOINT, data)
                .then((response) => {
                    updateToken(response.data.access_token);
                    setSuccessModal(true);
                })
                .catch((e) => {
                    setErrorModal(e.response.data.message);
                });
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorModal(error.errors[0].message);
            }
        }
    };

    return <>
        <Modal onClose={onclose} modalTitle="INICIAR SESIÓN" style={{ width: '350px', height: 'auto' }} modalId="login-modal">
            <form>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-gray-700">EMAIL</label>
                        <input
                            type="text"
                            id="correo"
                            className="rounded p-2 bg-[#303030] focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="Ingrese su email"
                            value={data.correo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-gray-700">CONTRASEÑA</label>
                        <input
                            type="password"
                            id="password"
                            className="rounded p-2 bg-[#303030] focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="Ingrese su contraseña"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-2">
                    <p className="text-green text-sm cursor-pointer hover:text-green-2">Olvide mi contraseña</p>
                </div>
                <div className="flex flex-col gap-1 p-4 mt-4 w-full items-center justify-center">
                    <button
                        type="submit"
                        className="bg-green text-white rounded p-2 hover:bg-blue-600 w-fit cursor-pointer font-semibold"
                        onClick={login}
                    >
                        INICIAR SESIÓN
                    </button>
                    <button
                        type="button"
                        className="text-white rounded p-2 w-fit cursor-pointer"
                        onClick={() => navigate('/register')}
                    >
                        Registrarse
                    </button>
                </div>
            </form>
        </Modal>
        {errorModal && (
            <Modal
                onClose={() => setErrorModal(null)}
                modalTitle="Error"
                style={{ width: '300px', height: 'auto' }}
                modalId="error-modal"
            >
                <p className="text-red-500">{errorModal}</p>
            </Modal>
        )}
        {successModal && (
            <Modal
                onClose={() => setSuccessModal(false)}
                modalTitle="Éxito" style={{ width: '300px', height: 'auto' }}
                modalId="success-modal"
            >
                <p className="text-green-500">Inicio de sesión exitoso</p>
            </Modal>
        )}
    </>
}