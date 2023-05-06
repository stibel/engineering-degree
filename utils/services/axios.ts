import axios from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${
            typeof window !== 'undefined' && localStorage.getItem('accessToken')
        }`
    },
    baseURL: 'https://joinus.kalinowski.one/api/v1/'
});
