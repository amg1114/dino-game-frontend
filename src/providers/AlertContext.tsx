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
  const [alertToast, setAlertToast] = useState<AlertToast | null>(null);

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

    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, toast.duration || 2000);
  };

  const showAlert = (toast: AlertToast) => {
    setAlertToast(toast);
    return {
      ...alertToast,
      close: () => {
        setAlertToast(null);
      },
    } as VisibleAlertToast;
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
          </div>
        </Modal>
      )}

      <section className="bg-yellow-light text-blue fixed top-0 left-0 p-4">
        {alertToast && <p>Mounted Alert toast</p>}
      </section>
    </AlertContext.Provider>
  );
};
