const CRYPTO = window.crypto.subtle;

const generateCryptoKey = async () => {
  const cryptoKey = await CRYPTO.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  return { cryptoKey };
};

const cryptoKeyToBase64 = async (cryptoKey: CryptoKey) => {
  const rawKey = await CRYPTO.exportKey("raw", cryptoKey);

  const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
  return { base64Key };
};
const base64ToCryptoKey = async (base64Key: string) => {
  const decodedKey = Uint8Array.from(atob(base64Key), (c) => c.charCodeAt(0));

  const symmetricKey = await CRYPTO.importKey(
    "raw",
    decodedKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  console.log(symmetricKey);
};

const encryptData = async (cryptoKey: CryptoKey, data: string) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedData = new TextEncoder().encode(data);
  // const encodedData = encoder.encode(data);
  const encryptedData = await CRYPTO.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    encodedData
  );
  console.log(encryptedData);
  console.log(new Uint8Array(encryptedData));
  const combinedBuffer = new Uint8Array(iv.length + encryptedData.byteLength);
  combinedBuffer.set(iv, 0);
  combinedBuffer.set(new Uint8Array(encryptedData), iv.length);
  // console.log(combinedBuffer);

  const base64Cipher = btoa(String.fromCharCode(...combinedBuffer));
  // return { iv, encryptedData };
  return { base64Cipher };
};

const decryptData = async (
  cryptoKey: CryptoKey,
  iv: Uint8Array,
  encryptedData: ArrayBuffer
) => {
  const decryptedData = await CRYPTO.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    cryptoKey,
    encryptedData
  );
  const decoder = new TextDecoder();
  const originalData = decoder.decode(decryptedData);
  return { originalData };
};

export {
  generateCryptoKey,
  cryptoKeyToBase64,
  base64ToCryptoKey,
  encryptData,
  decryptData,
};
