/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useMemo, useState } from 'react';
import { accessTokenService } from '../services/accessTokenService';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { Result } from '../types/Result.js';
import { User } from '../types/User.js';
import { UserRegister } from '../types/UserRegister';
import { UserRequest } from '../types/UserRequest.js';

type ContextType = {
  isChecked: boolean;
  user: User | null;
  error: string | null,
  // setError: () => string | null,
  // checkAuth: () => void;
  login: (userData: UserRequest) => Promise<any>;
  register: (userData: UserRegister) => Promise<any>;
  logout: () => Promise<any>;
};

export const AuthContext = React.createContext<ContextType>({
  isChecked: false,
  user: null,
  error: null,
  // setError: () => null,
  // checkAuth: () => {},
  login: () => Promise.resolve<any>(null),
  register: () => Promise.resolve<any>(null),
  logout: () => Promise.resolve<any>(null),
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecked, setChecked] = useState(true);

  // async function checkAuth() {
  //   try {
  //     const result: Result = await authService.refresh(refreshToken);
  //     const { accessToken, refreshToken } = result;

  //     accessTokenService.save(accessToken);

  //     if (user){
  //       const userResponse : User = await userService.getUser(user.id);
  //       // const userFromServer = userResponse.data;

  //       setUser(userResponse);
  //     }
  //   } catch (error) {
  //     console.log('User is not authentincated');
  //   } finally {
  //     setChecked(true);
  //   }
  // }

  async function login(userData: UserRequest) {
    try {
      const result: Result = await authService.login(userData);
      const { accessToken, refreshToken } = result;
      accessTokenService.save(accessToken);
      await authService.refresh(refreshToken);
    } catch (error) {
      console.log('User is not authentincated');
      console.log(error);
    }
  }

  async function register (userData: UserRegister) {
    try {
      const result: User = await authService.register(userData);
      const { id, username, displayName, admin } = result;
      const user = { id, username, displayName, admin };
      setUser(user);      
    } catch (error) {
      console.log('User is not authentincated');
      setError('User is not authentincated');
    }
    console.log(user);
  }

  async function logout() {
    try {
      await authService.logout();
      accessTokenService.remove();
      setUser(null);
    } catch (error) {
      console.log('User is not authentincated');
      setError('some problem with logout');
    }
    console.log(user);
  }

  const value = useMemo(() => ({
    isChecked,
    user,
    error,
    // setError,
    // checkAuth,
    login,
    register,
    logout,
  }), [user, isChecked]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
