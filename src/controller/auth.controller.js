import * as services from "../services";

const RESOURCE = "auth";

// Holds the logged-in user for the life of the app. Pages read this
// through the functions below instead of managing their own copy.
let currentUser = null;

export const login = async (username, password) => {
  const user = await services.post(`${RESOURCE}/login`, { username, password });

  currentUser = user;
  services.setAuthToken(user.token);

  return user;
};

export const logout = () => {
  currentUser = null;
  services.setAuthToken(null);
};

export const getCurrentUser = () => currentUser;

export const isInternalUser = () =>
  Boolean(currentUser?.groups?.includes("base.group_user"));
