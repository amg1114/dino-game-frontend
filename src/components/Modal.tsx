import React, { JSX, useEffect, useRef } from 'react';

export function Modal({ children, onClose, modalTitle, size, modalId }: { children: React.ReactNode; onClose: () => void; modalTitle?: string; size?: string; modalId?: string }): JSX.Element {
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
        <div className="bg-body fixed top-0 left-0 w-full h-full flex items-center justify-center z-10 body-text" data-modal-id={modalId} style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} onClick={onClose}>
            <div
                className={`bg-placeholder-2 p-5 max-w-7xl rounded-2xl h-min w-full sm:w-full max-h-screen overflow-y-auto`}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: size }}
            >
                <div className="px-4 text-center">
                    <h3 className="text-xll font-semibold">{modalTitle}</h3>
                </div>
                <div className="p-2">
                    {children}
                </div>
            </div>
        </div>
    </>
}