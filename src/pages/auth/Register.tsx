import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { z } from "zod";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../providers/AuthContext";
import countries from "world-countries";

const schema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    fechaNacimiento: z.string().min(1, "La fecha de nacimiento es obligatoria").date("La fecha de nacimiento no es válida"),
    pais: z.string().min(1, "El país es obligatorio"),
    sexo: z.string().min(1, "El género es obligatorio"),
    correo: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export function Register() {
    const ENDPOINT = import.meta.env.API_URL + "/auth/register"
    const navigate = useNavigate();
    const { usuario, isLoading, updateToken } = useAuth();
    const [formData, setFormData] = useState({
        nombre: "",
        fechaNacimiento: "",
        pais: "",
        sexo: "",
        correo: "",
        password: "",
    });
    const [errorModal, setErrorModal] = useState<string | null>(null);
    const [successModal, setSuccessModal] = useState<boolean>(false);

    const onClose = (): void => {
        navigate('/');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
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
    }, [isLoading, usuario, errorModal, successModal]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            schema.parse(formData);
            axios.post(ENDPOINT, formData)
                .then((response) => {
                    updateToken(response.data.access_token);
                    setErrorModal(null);
                    setSuccessModal(true);
                })
                .catch((error) => {
                    setErrorModal(error.response.data.message);
                }
                );
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrorModal(error.errors[0].message);
            }
        }
    };

    return <>
        <Modal onClose={onClose} modalTitle="Registrarse" size='lg' modalId="register-modal">
            <form className="flex flex-col gap-4 px-4 mt-4 overflow-y-auto max-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-white uppercase">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="Jhon Doe"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-white uppercase">Fecha De Nacimiento</label>
                        <input
                            type="date"
                            id="fechaNacimiento"
                            className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                            placeholder="01/01/2000"
                            min="1900-01-01"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-white uppercase">País</label>
                        <select
                            id="pais"
                            className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                            value={formData.pais}
                            onChange={handleChange}
                        >
                            <option disabled value="">Seleccione una opción</option>
                            {countries.map((country) => (
                                <option key={country.cca2} value={country.cca2}>
                                    {country.name.common}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xl text-white uppercase">Género</label>
                        <select
                            id="sexo"
                            className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                            value={formData.sexo}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Seleccione una opcion</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="D">Otro</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl text-white uppercase">Correo Electrónico</label>
                    <input
                        type="correo"
                        id="correo"
                        className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="jhondoe@example.com"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl text-white uppercase">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        className="rounded p-2 bg-placeholder focus:outline-none focus:ring-2 focus:ring-green"
                        placeholder="**************"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-1 mt-4 w-full items-center justify-center">
                    <button
                        type="submit"
                        className='primary-button w-full sm:w-auto uppercase'
                        onClick={handleSubmit}
                    >
                        Registrarse
                    </button>
                    <button
                        type="button"
                        className="text-white rounded p-2 w-full sm:w-auto cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </Modal>
        {errorModal && (
            <Modal
                onClose={() => setErrorModal(null)}
                modalTitle="Error"
                size='xs'
                modalId="error-modal"
            >
                <p className="text-white">{errorModal}</p>
            </Modal>
        )}
        {successModal && (
            <Modal
                onClose={() => setSuccessModal(false)}
                modalTitle="Éxito"
                size='xs'
                modalId="success-modal"
            >
                <p className="text-white">Registro Exitoso</p>
            </Modal>
        )}
    </>
}