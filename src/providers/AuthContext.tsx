import { useEffect, useMemo, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../utils/context/authContext';
import { Usuario } from '../models/user.interface';

export interface AuthContextType {
  usuario: Usuario | null;
  isLoading: boolean;
  token: string | null;
  logIn: (token: string | null) => void;
  logOut: () => void;
  getUsuario: () => void;
  updateUsuario: (newUser: Partial<Usuario>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  hasVideoGame: (videoGameId: number) => boolean;
}

interface AuthProviderProps {
  child: React.ReactNode;
}

export function AuthProvider({ child }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logOut = useCallback(() => {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }, []);

  const updateToken = useCallback(
    (newToken: string | null) => {
      setToken(newToken);
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        localStorage.setItem('token', newToken);
      } else {
        logOut();
      }
    },
    [logOut]
  );

  const logIn = useCallback(
    (newToken: string | null) => {
      updateToken(newToken);
    },
    [updateToken]
  );

  const getUsuario = useCallback(() => {
    axios
      .get<Usuario>('/api/auth/profile')
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener el usuario:', error);
        logOut();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [logOut]);

  const updateUsuario = useCallback(
    async (newUser: Partial<Usuario>) => {
      try {
        await axios.patch('/api/users/' + usuario!.id, newUser);
        getUsuario();
        return Promise.resolve();
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
      }
    },
    [usuario, getUsuario]
  );

  const deleteAccount = useCallback(async () => {
    try {
      await axios.delete('/api/users/' + usuario!.id);
      logOut();
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  }, [usuario, logOut]);

  const hasVideoGame = useCallback(
    (videoGameId: number): boolean => {
      if (!usuario || !usuario.videoGames) return false;
      return usuario.videoGames.some((vg) => vg.videoGame.id === videoGameId);
    },
    [usuario]
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);

      if (!usuario) {
        setIsLoading(true);
        getUsuario();
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUsuario(null);
    }
  }, [token, usuario, getUsuario]);

  const contextValue = useMemo<AuthContextType>(() => {
    return {
      usuario,
      token,
      isLoading,
      updateUsuario,
      getUsuario,
      deleteAccount,
      logOut,
      logIn,
      hasVideoGame,
    };
  }, [isLoading, usuario, token, updateUsuario, logOut, logIn, getUsuario, deleteAccount, hasVideoGame]);

  return <AuthContext.Provider value={contextValue}>{child}</AuthContext.Provider>;
}
