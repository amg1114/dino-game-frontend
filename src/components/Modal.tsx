import React, { JSX, useEffect, useRef } from 'react';
import '../css/modal/modal.css'


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
        <div className="modal-fade" data-modal-id={modalId}>
            <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()} style={style}>
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