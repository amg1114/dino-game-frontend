import { JSX, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const modalSize = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

type modalSize = keyof typeof modalSize;

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  modalTitle?: string;
  size?: modalSize;
  modalId?: string;
}

export function Modal({ children, onClose, modalTitle, size = 'md', modalId }: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const [out, setOut] = useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        if (!modalId || (event.target as HTMLElement).dataset.modalId === modalId) {
          setOut(true);
          onClose();
        }
      }
    },
    [modalId, onClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div
        className="bg-body/80 body-text animate__animated animate__fadeIn fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center"
        data-modal-id={modalId}
        onClick={onClose}
      >
        <div
          className={`${modalSize[size]} bg-placeholder-2 animate__animated h-min max-h-screen w-full overflow-y-auto rounded-md p-5 sm:w-full ${out ? 'animate__slideOutUp' : 'animate__slideInDown'}`}
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 text-center">
            <h3 className="text-3xl">{modalTitle}</h3>
          </div>
          <div className="p-2">{children}</div>
        </div>
      </div>
    </>
  );
}
