import { useParams } from "react-router";
import { DescuentoList } from "./components/DescuentoList";

export function DescuentoPage() {
    const { id } = useParams();

    return (
        <div className="">
            <DescuentoList id={id ?? ""} />

        </div>
    )
}