import { createContext } from 'react';
import { AuthContextType } from '../providers/AuthContext';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
