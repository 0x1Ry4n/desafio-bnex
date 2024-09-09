import api from "./api";

const UserService = {
  getProducts() {
    return api.get("/products/");
  },

  getUserBoard() {
    return api.get("/auth/users/me/");
  },
};

export default UserService;
