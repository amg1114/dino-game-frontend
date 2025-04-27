import { useState, useEffect } from "react";

export const useResponsiveItems = () => {
    const [itemsPerPage, setItemsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width <= 640) {
                setItemsPerPage(4);
            } else {
                (width >= 720)
                setItemsPerPage(9);
            }
        };
        handleResize(); // Inicial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return itemsPerPage;
};
