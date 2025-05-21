import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Calification() {
    const [calification, setCalification] = useState<number>(0);

    useEffect(() => {

    }, [calification]);

    const handleSetCalification = (value: number) => {
        setCalification(value);
    }
    return (
        <>
            <div className="flex items-center gap-2">

                {[...Array(5)].map((_, i) =>
                    i < calification ? (
                        <StarIcon
                            key={i}
                            fill="#3dab7b"
                            color="#3dab7b"
                            onClick={() => handleSetCalification(i + 1)}
                        />
                    ) : (
                        <StarIcon
                            key={i}
                            color="#3dab7b"
                            onClick={() => handleSetCalification(i + 1)}
                        />
                    )
                )}
                <p>{calification.toFixed(1)}</p>
            </div>
        </>
    )
}