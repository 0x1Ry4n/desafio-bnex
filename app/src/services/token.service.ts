/* eslint-disable @typescript-eslint/no-explicit-any */
interface User {
  access: string;
  refresh: string;
  [key: string]: any; 
}

const TokenService = {
  getLocalRefreshToken(): string | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      return user?.refresh || null;
    }
    return null;
  },

  getLocalAccessToken(): string | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user: User = JSON.parse(userStr);
      return user?.access || null;
    }
    return null;
  },

  updateLocalAccessToken(newAccessToken: string): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      console.error('No user found in localStorage');
      return;
    }
    try {
      const user: User = JSON.parse(userStr);
      if (user) {
        user.access = newAccessToken;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.error('Parsed user is null');
      }
    } catch (error) {
      console.error('Error parsing user from localStorage', error);
    }
  },

  getUser(): Omit<User, "password"> | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user: User = JSON.parse(userStr);
        return user;
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
        return null;
      }
    }
    return null;
  },

  setUser(user: User): void {
    if (!user) {
      console.error('Invalid user data');
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
  },

  removeUser(): void {
    localStorage.removeItem('user');
  },
};

export default TokenService;
