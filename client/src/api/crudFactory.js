import api from "./axios.js";

export const createCrudApi = (resource) => ({
  list: (params) => api.get(`/${resource}`, { params }).then((r) => r.data.data),
  getOne: (id) => api.get(`/${resource}/${id}`).then((r) => r.data.data),
  create: (payload) => api.post(`/${resource}`, payload).then((r) => r.data.data),
  update: (id, payload) => api.put(`/${resource}/${id}`, payload).then((r) => r.data.data),
  remove: (id) => api.delete(`/${resource}/${id}`).then((r) => r.data.data)
});
