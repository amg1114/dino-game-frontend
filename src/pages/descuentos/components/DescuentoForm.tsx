import { Modal } from "../../../components/Modal";
import { useNewDescuento } from "../hooks/useNewDescuento";
import { StyledInput } from "../../../components/forms/StyledInput";
import { Link, useParams } from "react-router";


export function DescuentoForm() {
    const { id } = useParams();


    const { descuento, handleChange, navigate, handleSubmit } = useNewDescuento(id ?? null);
    return (
        <>
            <Modal onClose={() => navigate(`/dashboard/juegos/${id}/descuentos`)} modalTitle="NUEVO DESCUENTO" size="sm" modalId="login-modal">
                <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 px-4">
                    <div>
                        <StyledInput
                            id="fechaInicio"
                            type="date"
                            label="Fecha de inicio"
                            placeholder="01-01-2000"
                            value={descuento.fechaInicio}
                            onChange={handleChange}

                        />
                    </div>
                    <div>
                        <StyledInput
                            id="fechaFin"
                            type="date"
                            label="Fecha de final"
                            placeholder="01-01-2000"
                            value={descuento.fechaFin}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <StyledInput
                            id="porcentaje"
                            type="number"
                            label="Porcentaje"
                            placeholder="0.00"
                            value={descuento.porcentaje}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="gap-4 flex justify-end">
                        <button className="primary-button w-full sm:w-auto" type="submit">
                            Guardar
                        </button>
                        <Link to={`/dashboard/juegos/${id}/descuentos`} className="secondary-button w-full sm:w-auto" type="button">
                            Cancelar
                        </Link>
                    </div>
                </form>
            </Modal>
        </>
    )
}