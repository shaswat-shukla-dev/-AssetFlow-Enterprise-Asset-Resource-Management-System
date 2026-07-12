import api from "./axios.js";

export const authApi = {
  login: (payload) => api.post("/auth/login", payload).then((r) => r.data.data),
  register: (payload) => api.post("/auth/register", payload).then((r) => r.data.data),
  profile: () => api.get("/auth/profile").then((r) => r.data.data)
};
