import {
  LoginRequest,
  LoginResponse,
  ServerMessageResponse,
  User,
} from "@/lib/types";
import axiosInstance from ".";

/**
 * User login
 *
 * @param payload Request payload
 * @returns Token
 */
export async function login(payload: LoginRequest) {
  const res = await axiosInstance.post<LoginResponse>("/login", payload);

  return res.data;
}

/**
 * Logged in user
 *
 * @returns User
 */
export async function me() {
  const res = await axiosInstance.get<User>("/user");

  return res.data;
}

/**
 * Logout
 *
 * @returns Server response
 */
export async function logout() {
  const res = await axiosInstance.post<ServerMessageResponse>("/user/logout");

  return res.data;
}
