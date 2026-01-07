import { api } from "../axios";

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
  const encryptionSalt = btoa(
    String.fromCharCode(...new Uint8Array(saltBytes))
  );

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

export async function deriveKeys(password: string, saltBase64: string) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // Convert Salt from Base64 to Buffer
  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  // Derive the Master Key
  const masterKey = await window.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // For this simple version, we will use the raw MasterKey for data
  // and a Hash of the MasterKey for Login.
  const rawKey = await window.crypto.subtle.exportKey("raw", masterKey);
  const authKeyBuffer = await window.crypto.subtle.digest("SHA-256", rawKey);

  // Convert to Base64 strings
  const dataKey = masterKey; // Keep this object in memory
  const authKey = btoa(String.fromCharCode(...new Uint8Array(authKeyBuffer)));

  return { dataKey, authKey };
}
