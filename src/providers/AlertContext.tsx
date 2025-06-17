import { useState, ReactNode } from 'react';
import { AlertContext, AlertToast, AlertType, Toast, VisibleAlertToast } from '../utils/context/alertContext';
import { CircleAlert, CircleCheck, CircleX, Info, LoaderCircle } from 'lucide-react';
import { Modal } from '../components/Modal';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [alertToast, setAlertToast] = useState<VisibleAlertToast | null>(null);

  const icons: Record<AlertType, React.ReactNode> = {
    info: <Info className="text-blue" />,
    success: <CircleCheck className="text-green" />,
    warning: <CircleAlert className="text-yellow" />,
    error: <CircleX className="text-red" />,
    loading: <LoaderCircle className="text-blue animate-spin" />,
  };

  const textColors: Record<AlertType, string> = {
    info: 'text-blue',
    success: 'text-green',
    warning: 'text-yellow',
    error: 'text-red',
    loading: 'text-white',
  };

  const backgroundColors: Record<AlertType, string> = {
    info: 'bg-blue-light',
    success: 'bg-green-light',
    warning: 'bg-yellow-light',
    error: 'bg-red-light',
    loading: 'bg-blue-inherit',
  };

  const showToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
    const index = toasts.length;
    let timeoutId: NodeJS.Timeout | null = null;
    if (toast.duration !== 0) {
      timeoutId = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, toast.duration || 2000);
    }
    // Devuelve función para cerrar manualmente
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setToasts((prev) => {
        const copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
    };
  };

  const showAlert = (toast: AlertToast): VisibleAlertToast => {
    const visibleAlertToast: VisibleAlertToast = {
      ...toast,
      close: () => {
        setAlertToast(null);
        if (toast.onClose) {
          toast.onClose(visibleAlertToast.confirmValue);
        }
      },
    };

    setAlertToast(visibleAlertToast);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => visibleAlertToast.close(), toast.duration);
    }

    return visibleAlertToast;
  };

  return (
    <AlertContext.Provider value={{ showToast, showAlert }}>
      {children}

      {/* Render toasts */}
      <div className="fixed right-4 bottom-8 z-50 flex flex-col gap-2">
        {toasts.map((toast, i) => (
          <div
            className={`${backgroundColors[toast.type]} ${textColors[toast.type]} flex items-center gap-2 rounded p-4 shadow`}
            key={i + toast.message}
          >
            <figure className="text-2xl">{icons[toast.type]}</figure>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Render alert toast */}
      {alertToast && (
        <Modal blockClose={true} size="sm">
          <div className="w-full px-4 py-6">
            <figure
              className={`${backgroundColors[alertToast.type]} mx-auto flex aspect-square w-fit items-center justify-center rounded-full p-7 text-6xl`}
            >
              {icons[alertToast.type]}
            </figure>
            <h4 className="my-4 text-center">{alertToast.title}</h4>
            <p className="text-center">{alertToast.message}</p>
            {alertToast.isConfirm && (
              <footer className="mt-10 flex justify-center gap-4">
                <button
                  className="primary-button"
                  onClick={() => {
                    alertToast.confirmValue = true;
                    alertToast.close();
                  }}
                >
                  {alertToast.confirmText || 'Aceptar'}
                </button>
                <button
                  className="secondary-button"
                  onClick={() => {
                    alertToast.confirmValue = false;
                    alertToast.close();
                  }}
                >
                  {alertToast.cancelText || 'Cancelar'}
                </button>
              </footer>
            )}
          </div>
        </Modal>
      )}
    </AlertContext.Provider>
  );
};
