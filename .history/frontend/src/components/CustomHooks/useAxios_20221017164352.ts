import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

import { useContext } from 'react';
import { Context } from '../Context/Context';
import { UserDecoded } from '../Interfaces/token.interface';

const baseURL = 'https://ecommerce-fullstack-yache.herokuapp.com';
// const baseURL = 'http://localhost:8080';

export const useAxios = () => {
  const {
    access_token,
    refresh_token,
    setAccessToken,
    setRefreshToken,
    setUser,
  } = useContext(Context);

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (access_token) {
      req.headers!.Authorization = 'Bearer ' + access_token;

      const user: UserDecoded = jwt_decode(access_token!);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(
        `${baseURL}/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: 'Bearer ' + refresh_token,
          },
        },
      );

      // Save in local storage
      localStorage.setItem(
        'access_token',
        JSON.stringify(response.data.access_token),
      );
      localStorage.setItem(
        'refresh_token',
        JSON.stringify(response.data.refresh_token),
      );

      // Save in context api
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      setUser(user);

      req.headers!.Authorization = 'Bearer ' + response.data.access_token;
    }
    return req;
  });

  return axiosInstance;
};
