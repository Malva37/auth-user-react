import { authClient } from '../http/authClient';
import { Result } from '../types/Result.js';
import { User } from '../types/User';
import { UserRegister } from '../types/UserRegister.js';
import { UserRequest } from '../types/UserRequest.js';

function register(user: UserRegister): Promise<User> {
  // const { username, password, displayName } = user;

  return authClient.post('/auth/register', user);
}

function login(userData : UserRequest): Promise<Result> {
  return authClient.post('/auth/login', userData);
}

function logout() {
  return authClient.get('/auth/logout');
}

// function activate(activationToken) {
//   return authClient.get(`/activation/${activationToken}`);
// }

function refresh(refreshToken: string): Promise<Result> {
  return authClient.post('/auth/refresh', refreshToken);
}

export const authService = { register, login, logout, refresh };
