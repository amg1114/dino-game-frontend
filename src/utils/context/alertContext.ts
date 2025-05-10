import { createContext } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error' | 'loading';

export interface Toast {
  type: AlertType;
  message: string;
  duration?: number;
}

export interface AlertToast extends Exclude<Toast, 'duration'> {
  title: string;
}

export interface VisibleAlertToast extends AlertToast {
  close: () => void;
}

export interface AlertContextType {
  showToast: (toast: Toast) => void;
  showAlert: (toast: AlertToast) => VisibleAlertToast;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);
