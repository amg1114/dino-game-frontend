
import { useParams } from "react-router";
import { Modal } from "../../../components/Modal";
import { useNewDescuento } from "../hooks/useNewDescuento";
import { StyledInput } from "../../../components/forms/StyledInput";


export function DescuentoForm() {
    const { id } = useParams();

    const { descuento } = useNewDescuento(id ?? null);
    return (
        <>
            <Modal modalTitle="NUEVO DESCUENTO" size="sm" modalId="login-modal">
                <form>
                    <div>
                        <StyledInput
                            id="porcentaje"
                            type="number"
                            placeholder="0.00"
                            value={descuento.porcentaje.toString()}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    descuento.porcentaje = value;
                                }
                            }}
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}