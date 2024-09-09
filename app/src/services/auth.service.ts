import api from './api';
import TokenService from './token.service';

const AuthService = {
  login: async (username: string, password: string) => {
    try {
      const response = await api.post('/auth/jwt/create/', {
        username,
        password,
      });

      if (response.data.access && response.data.refresh) {
        TokenService.updateLocalAccessToken(response.data.access);
        
        api.defaults.headers.common['Authorization'] = `JWT ${response.data.access}`;

        const user = await api.get('/auth/users/me/');
        
        delete user.data.password;

        if (user.data) {
          TokenService.setUser({...user.data, access: response.data.access}); 
        }

        return user.data;
      } else {
        throw new Error('Tokens não foram retornados');
      }
    } catch (error) {
      console.error('Falha no login:', error);
      throw error;
    }
  },

  logout: () => {
    // Remove tokens e dados do usuário localmente
    TokenService.removeUser();
  },

  register: async (username: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/users/', {
        username,
        email,
        password,
        re_password: password, 
      });
      return response.data;
    } catch (error) {
      console.error('Falha no registro:', error);
      throw error;
    }
  },

  getCurrentUser: () => {
    return TokenService.getUser();
  }
};

export default AuthService;
