import secureApi from "./secureApi";

export const checkAuth = async () => {
  try {
    const response = await secureApi.get("auth/check-auth");
    console.log(response.data);
    return response.data.data.isAuthenticated;
  } catch {
    return false;
  }
};
