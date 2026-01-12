import { api } from "../api-client";
import { bufferToBase64, deriveKeys } from "../utils/crypto";

export interface SignupData {
  email: string;
  name: string;
  password: string;
  invitationCode: string;
}

export interface SignupResponse {
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  name: string;
  email: string;
}

export async function signup(body: SignupData) {
  // Generate encryptionSalt to be used to derive the encryption key from the user password
  const saltBytes = window.crypto.getRandomValues(new Uint8Array(16));
  const encryptionSalt = bufferToBase64(saltBytes);

  // Derive authKey (server thinks of it as a password) and dataKey from the user password
  const { authKey } = await deriveKeys(body.password, encryptionSalt);

  // Send encryption salt and user data to the server
  const payload = {
    ...body,
    encryptionSalt,
    password: authKey,
  };
  const { data } = await api.post<SignupResponse>("/auth/signup", payload);
  return data;
}

export async function signin(credentials: LoginCredentials) {
  const { data: encryptionSalt } = await api.get<string>("/auth/salt", {
    params: {
      email: credentials.email,
    },
  });

  const { authKey, dataKey } = await deriveKeys(
    credentials.password,
    encryptionSalt
  );

  const { data } = await api.post<LoginResponse>("/auth/signin", {
    email: credentials.email,
    password: authKey,
  });
  return { ...data, dataKey };
}
