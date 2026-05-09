import axios from "axios";

// BASE API INSTANCE
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

// ATTACH TOKEN AUTOMATICALLY
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- ADMIN APIs ---------------- //

export const registerAdminApi = (data) =>
  API.post("/api/admin/register", data);

export const loginAdminApi = (data) =>
  API.post("/api/admin/login", data);

export const addCourseApi = (data) =>
  API.post("/api/admin/addcourse", data);

export const updateCourseApi = (id, data) =>
  API.put(`/api/admin/updatecourse/${id}`, data);

export const getAllCoursesAdminApi = () =>
  API.get("/api/admin/courses");

export const deleteCourseApi = (id) =>
  API.delete(`/api/admin/deletecourse/${id}`);

// ⭐ ADMIN — FETCH ONLY HIS SINGLE COURSE FOR EDITING

export const getAdminSingleCourseApi = (id) =>
  API.get(`/api/course/${id}`);

// ---------------- USER APIs ---------------- //

export const registerUserApi = (data) =>
  API.post("/api/users/register", data);

export const loginUserApi = (data) =>
  API.post("/api/users/login", data);

export const purchaseCourseApi = (data) =>
  API.post("/api/users/purchasecourse", data);

// ---------------- PUBLIC APIs ---------------- //
// Public — ANYONE can view courses (user & admin)

export const getAllCoursesApi = () =>
  API.get("/api/courses");   // ✔ CORRECT (NOT /courses/courses)

export const getSingleCourseApi = (id) =>
  API.get(`/api/course/${id}`);

export default API;
