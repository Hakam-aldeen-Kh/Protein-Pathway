import api from "../utils/api";

const secureApi = api

export const refreshAuthToken = async (originalRequest) => {
  try {
    await secureApi.post('auth/refresh-token');
    originalRequest._retry = true;
    return secureApi(originalRequest);
  } catch (refreshError) {
    window.location.href = "/login";
    return Promise.reject(refreshError);
  }
};

export const handleUnauthorizedError = async (error) => {
  const originalRequest = error.config;
  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    return refreshAuthToken(originalRequest);
  }
  return Promise.reject(error);
};

secureApi.interceptors.response.use(
  (response) => response,
  (error) => handleUnauthorizedError(error),
);

export default secureApi;