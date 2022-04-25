export const setLoginSession = (type) => {
  localStorage.setItem("walletType", type);
};
export const getLoginSession = () => {
  return localStorage.getItem("walletType");
};
export const removeLoginSession = (data) => {
  localStorage.removeItem("walletType");
};
