import { axiosInstance } from "../common/AxiosInstance";
import TokenService from "./token.service";

export const UserService = {
  registerUser: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local/register", data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  registerBasicInformation: async (data) => {
    const body = {data}
    try {
      const response = await axiosInstance.post("/basicinformationsr", body);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const response = await axiosInstance.patch("/auth/local/register" + id, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUsersAll: async () => {
    try {
      const response = await axiosInstance.get("/users?populate=*");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await axiosInstance.get("/users/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      // if (username && password == 'admin') {
      //   TokenService.setUser({ username, password })
      //   return { data: 'done' }
      // }
      const response = await axiosInstance.post("/auth/local", {
        identifier: email,
        password,
      });
      if (response.data.jwt) {
        // response.data['level'] = 1
 
        TokenService.setUser({
          ...response.data
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    TokenService.removeUser();
  },

  getCurrentUser: () => {
    TokenService.getUser();
  },
};
