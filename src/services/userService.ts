import { httpClient } from '../http/httpClient.js';
import { User } from '../types/User.js';

function getUser(userId: number): Promise<User> {
  return httpClient.get(`/users/${userId}`);
}

export const userService = { getUser };
