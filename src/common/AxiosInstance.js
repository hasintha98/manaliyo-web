import axios from 'axios';
import { MAIN_API } from './const';
import TokenService from '../services/token.service';
import { UserService } from '../services/user.service';

// Create an Axios instance with custom configuration, if needed
export const axiosInstance = axios.create({
  baseURL: MAIN_API, // Replace with your API's base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json',
    'Authorization': TokenService.getToken() ?`Bearer ${TokenService.getToken()}` : ''
    // Add any custom headers you need here
  },
});



axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data


  return response;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response && error.response.status === 401) {
    await UserService.logout()
    window.location.reload(false);
  }
  return Promise.reject(error);
});

