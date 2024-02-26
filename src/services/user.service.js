import axios from "axios";
import { axiosInstance } from "../common/AxiosInstance";
import { MAIN_API } from "../common/const";
import TokenService from "./token.service";
import { filterQueryMaker } from "../common/common";

export const UserService = {
  registerUser: async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local/register", data);
      if (response?.data.jwt) {
        // response.data['level'] = 1

        TokenService.setUser({
          ...response?.data,
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  registerBasicInformation: async (data, jwtToken) => {
    const body = { data };
    try {
      const headers = {
        "Content-Type": "application/json",
        // No need to include Authorization header here
        // Add any other custom headers you need here
      };

      if (jwtToken) {
        headers["Authorization"] = `Bearer ${jwtToken}`;
      }

      const response = await axios.post(`${MAIN_API}/basicinformations`, body, {
        headers,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  registerContactInformation: async (data, jwtToken) => {
    const body = { data };
    try {
      const headers = {
        "Content-Type": "application/json",
        // No need to include Authorization header here
        // Add any other custom headers you need here
      };

      if (jwtToken) {
        headers["Authorization"] = `Bearer ${jwtToken}`;
      }

      const response = await axios.post(
        `${MAIN_API}/contactinformations`,
        body,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, data, noToken) => {
    const body = { data };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": ""
    };

    try {
      const response = await axiosInstance.put(
        "/users/" + id,
        body, {headers}
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUserInfoBySection: async (id, data, sectionType) => {
    const body = { data };
    try {
      const response = await axiosInstance[id ? "put" : "post"](
        `/${sectionType}/` + `${id ? id : ""}`,
        body
      );
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
  getUsersWithFilters: async (filters, page = 1, pageSize = 10) => {
    const query = filterQueryMaker(filters);
    try {
      const response = await axiosInstance.get(`/users?populate=*${query}&filters[id][$ne]=${TokenService.getUser()?.user?.id}&sort[0]=createdAt:desc`);
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

  getUserCurrentUser: async () => {
    try {
      const id = TokenService.getUser()?.user?.id;
      const response = await axiosInstance.get(`/users/${id}?populate=*`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const response = await axiosInstance.get(`/users/${id}?populate=*`);
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
          ...response.data,
        });
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  checkUser: async (username, password) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": ""
        // Add any other custom headers you need here
      };

    

      const response = await axiosInstance.post("/auth/local", {
        identifier: username,
        password,
      }, { headers });
     
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    TokenService.removeUser();
  },

  getCurrentUserAPI: async () => {
    const id = TokenService.getUser()?.user.id;
    if (!id) {
      return null; // Or handle appropriately
    }

    try {
      // Make concurrent requests for basic and contact data
      const [userData, basicData, contactData] = await Promise.all([
        axiosInstance.get(`/users/${id}`),
        axiosInstance.get(`/basicinformations?filters[userId][$eq]=${id}`),
        axiosInstance.get(`/contactinformations?filters[userId][$eq]=${id}`),
      ]);

      // Destructure data from responses
      const { data: userInfoData } = userData.data;
      const { data: basicInfoData } = basicData.data;
      const { data: contactInfoData } = contactData.data;

      // Extract attributes

      const basicDataAttributes =
        basicInfoData.length > 0
          ? { ...basicInfoData[0].attributes, id: basicInfoData[0].id }
          : {};
      const contactDataAttributes =
        contactInfoData.length > 0
          ? { ...contactInfoData[0].attributes, id: contactInfoData[0].id }
          : {};

      // Return combined data
      return {
        userData: userInfoData,
        basicData: basicDataAttributes,
        contactData: contactDataAttributes,
      };
    } catch (error) {
      throw error;
    }
  },

  uploadUserImage: async (userId, file) => {

    const formData = new FormData();
    formData.append("files.image1", file);
    formData.append("data", JSON.stringify({ user_Id: userId }));

    try {
      const response = await axiosInstance.post("/user-images", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
