import React, { JSX, useEffect, useRef } from 'react';

export function Modal({ children, onClose, modalTitle, style, modalId }: { children: React.ReactNode; onClose: () => void; modalTitle?: string; style?: React.CSSProperties; modalId?: string }): JSX.Element {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            if (!modalId || (event.target as HTMLElement).dataset.modalId === modalId) {
                onClose();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <>
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0, 0, 0, .8)] flex items-center justify-center z-10" data-modal-id={modalId}>
            <div className="bg-[#454545] p-5 max-w-7xl rounded-2xl" ref={modalRef} onClick={(e) => e.stopPropagation()} style={style}>
                <div className=" p-4 text-center">
                    <h3 className="text-xll font-semibold">{modalTitle}</h3>
                </div>

                <div className="p-2">
                    {children}
                </div>
            </div>
        </div>
    </>
}