import { createContext } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'loading';

export interface Toast {
  type: AlertType;
  message: string;
  duration?: number;
}

export interface AlertToast extends Toast {
  title: string;
  isConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  onClose?: (confirm?: boolean) => void;
}

export interface VisibleAlertToast extends AlertToast {
  confirmValue?: boolean;
  close: () => void;
}

export interface AlertContextType {
  showToast: (toast: Toast) => void;
  showAlert: (toast: AlertToast) => VisibleAlertToast;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
