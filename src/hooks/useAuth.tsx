import { useContext } from 'react';
import { AuthContext } from '../utils/context/authContext';
import { AuthContextType } from '../providers/AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
