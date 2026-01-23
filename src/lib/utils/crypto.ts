export function bufferToBase64(data: ArrayBuffer | Uint8Array): string {
  let bytes: Uint8Array;

  if (data instanceof Uint8Array) {
    bytes = data;
  } else {
    bytes = new Uint8Array(data);
  }

  return btoa(String.fromCharCode(...bytes));
}

function base64ToBuffer(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

export interface EncryptedPayload {
  cipherText: string; // o texto encriptado
  iv: string; // vetor público de inicialização (evitar ataques de rainbow table)
}

export async function encryptText(
  text: string,
  dataKey: CryptoKey,
  iv?: Uint8Array<ArrayBuffer>
): Promise<EncryptedPayload> {
  const enc = new TextEncoder();

  // 1. Transforma json em bytes
  const encodedData = enc.encode(text);

  // 2. Gera o iv vector
  if (!iv) iv = window.crypto.getRandomValues(new Uint8Array(12));

  // 3. Aplica criptografia AES
  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    dataKey,
    encodedData
  );

  // 4. Retorna tudo em base64 para envio via http.
  return {
    cipherText: bufferToBase64(encryptedBuffer),
    iv: bufferToBase64(iv),
  };
}

export async function decryptText(
  cipherTextBase64: string,
  ivBase64: string,
  dataKey: CryptoKey
): Promise<string> {
  const dec = new TextDecoder();

  const cipherText = base64ToBuffer(cipherTextBase64);
  const iv = base64ToBuffer(ivBase64);

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    dataKey,
    cipherText as BufferSource
  );

  return dec.decode(decryptedBuffer); // Volta direto para string, sem JSON.parse
}

/**
 * Dada a senha do usuário, nós derivamos uma authKey e uma dataKey
 * o servidor só vai conhecer a authKey, sendo impossibilitado de inferir a dataKey
 *
 * @param password
 * @param saltBase64
 * @returns
 */
export async function deriveKeys(password: string, saltBase64: string) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const salt = Uint8Array.from(atob(saltBase64), (c) => c.charCodeAt(0));

  // Derivar a master key a partir da password e do salt
  const masterKey = await window.crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  // Deriva a authKey a partir da master key
  const rawKey = await window.crypto.subtle.exportKey("raw", masterKey);
  const authKeyBuffer = await window.crypto.subtle.digest("SHA-256", rawKey);

  // Por motivo de simplicidade, vamos utilizar a própria masterKey como dataKey
  const dataKey = masterKey;
  const authKey = btoa(String.fromCharCode(...new Uint8Array(authKeyBuffer)));

  return { dataKey, authKey };
}
