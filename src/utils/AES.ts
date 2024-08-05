const CRYPTO = window.crypto.subtle;

const generateAESKey = async () => {
  const key = await CRYPTO.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

    const rawKey = await CRYPTO.exportKey("raw", key);
    const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));

    console.log(rawKey);
    console.log(String.fromCharCode(...new Uint8Array(rawKey)))

    console.log(base64Key);
    console.log(atob(base64Key));
    // console.log(
    //   atob(base64Key)
    //     .split("")
    //     .map((char) => char.charCodeAt(0))
    // );
  return key;
};

// Convert the secret key to a shareable/clipboard format.
const AESKeyToBase64 = async (key: CryptoKey) => {
  const rawKey = await CRYPTO.exportKey("raw", key);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
  console.log(base64Key);
  return base64Key;
};

const encryptData = async (key: CryptoKey, data: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(data);
  const encryptedData = await CRYPTO.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encodedData
  );
  return { iv, encryptedData };
};

const decryptData = async (
  key: CryptoKey,
  iv: Uint8Array,
  encryptedData: ArrayBuffer
) => {
  const decoder = new TextDecoder();
  const decryptedData = await CRYPTO.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    encryptedData
  );
  return decoder.decode(decryptedData);
};

export { generateAESKey, encryptData, decryptData };
