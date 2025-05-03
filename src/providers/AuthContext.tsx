import { useEffect, useMemo, useState, ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/authContext';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fechaNacimiento: Date;
  pais: string;
  sexo: string;
}

export interface AuthContextType {
  token: string | null;
  usuario: Usuario | null;
  isLoading: boolean;
  updateToken: (newToken: string | null) => void;
  deleteToken: () => void;
}

interface AuthProviderProps {
  child: ReactNode;
}

function AuthProvider({ child }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
  };

  const deleteToken = () => {
    setToken(null);
  };

  const getUsuario = () => {
    axios
      .get<Usuario>(import.meta.env.API_URL + '/auth/profile')
      .then((response) => {
        setUsuario(response.data);
        console.log('Usuario cargado desde el contexto:', response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      getUsuario();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUsuario(null);
    }
  }, [token]);

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      token,
      usuario,
      isLoading,
      updateToken,
      deleteToken,
    };
  }, [token, isLoading, usuario]);

  return <AuthContext.Provider value={contextValue}>{child}</AuthContext.Provider>;
}

export default AuthProvider;
