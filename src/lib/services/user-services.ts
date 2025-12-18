import { api, STORAGE_KEY } from "../axios";
import type { UserInfo } from "../schemas/user";

export async function loadUser() {
  const jwt = localStorage.getItem(STORAGE_KEY);

  if (jwt) {
    const response = await api
      .get<UserInfo>("/auth/user-info")
      .catch(() => null);

    return response ? response.data : null;
  }

  return null;
}
