import axios from "axios";
import { API_URL } from "./constants/constants";

// This file ONLY knows how to talk to the backend over HTTP.
// It exposes generic REST verbs (get / getById / post / put / delete) —
// no object-specific logic here. Controllers call these with a resource
// name ("customers", "sales-orders", ...) and build their own methods
// around them. Pages never import this file directly.

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // No response at all = the request never reached a server: wrong
    // API_URL, server not running, or (on a real device) localhost isn't
    // reachable from the phone. Server responded but with an error status
    // = a real backend error, so surface its message instead.
    if (!error.response) {
      return Promise.reject(
        new Error(
          `Network error: could not reach ${API_URL}. Check that the server is running and that API_URL is correct for how you're running the app (see constants.js).`
        )
      );
    }

    const message = error.response.data?.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

// ---- Generic CRUD ----------------------------------------------------
export const get = (resource, params = {}) => api.get(`/${resource}`, { params });

export const getById = (resource, id) => api.get(`/${resource}/${id}`);

export const post = (resource, data = {}) => api.post(`/${resource}`, data);

export const put = (resource, id, data) => api.put(`/${resource}/${id}`, data);

export const del = (resource, id) => api.delete(`/${resource}/${id}`);
