import { FormEvent, useEffect, useState } from "react";
import { encryptData, generateSymmetricKey, symmetricKeyToShareableKey, shareableKeyToSymmetricKey } from "../utils/AES";

function Encrypt() {
  const BASE_URL = "http://localhost:5173/decrypt/"

  const [decryptUrl, setDecryptUrl] = useState("")
  const [decryptKey, setDecryptKey] = useState("")


  useEffect(() => {
    console.log(decryptUrl)
    console.log(decryptKey)
  }, [decryptUrl, decryptKey, setDecryptUrl, setDecryptKey])


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const cipherElement = form.elements.namedItem("cipher") as HTMLInputElement;
    const plainTextValue = cipherElement.value;

    const ttlElement = form.elements.namedItem("ttl") as HTMLInputElement;
    const ttlValue = ttlElement.value;

    if (plainTextValue === "") return;

    const { symmetricKey } = await generateSymmetricKey();
    const { shareableKey } = await symmetricKeyToShareableKey(symmetricKey);

    console.log(symmetricKey, shareableKey)

    const cipher = await encryptData(symmetricKey, plainTextValue);

    const res = await fetch("http://localhost:3000/encrypter", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({ cipher, ttl: ttlValue })
    });


    const { cipherKey } = await res.json()

    if (res.status !== 200) return

    console.log(cipherKey)

    setDecryptUrl(BASE_URL + cipherKey)
    setDecryptKey(shareableKey)
  };

  return (
    <div className="p-10">
      <form action="submit" onSubmit={(e) => handleSubmit(e)} className="h-60 flex flex-col justify-around items-center">
        <div className="flex">
          <label>Set how long the encryption will last in minutes.</label>
          <input
            name="ttl"
            type="number"
            min={10}
            max={60}
            defaultValue={10}
            step={5}
            className="text-center"
          />
        </div>

        <div className="flex ">
          <input
            style={{ width: 300 }}
            type="text"
            name="cipher"
            placeholder="Enter data to be encrypted here."
          />
          <button type="submit">ENCRYPT</button>

        </div>

      </form>

      {(decryptUrl && decryptKey) &&
        <div className="p-8 m-8 bg-black/50 flex flex-col items-center justify-center">
          <h1 className=" text-xl">Share the following with the decrypter</h1>

          <div className="flex flex-col items-start">
            <div className="flex flex-row m-2">
              <p className="p-2 m-1 select-none">URL: </p>
              <p className="p-3 px-6 rounded-md max-w-fit justify-center bg-black/50">{decryptUrl}</p>
            </div>
            <div className="flex flex-row m-2">
              <p className="p-2 m-1 select-none">KEY: </p>
              <p className="p-3 px-6 rounded-md max-w-fit justify-center bg-black/50">
                {decryptKey}
              </p>

            </div>

          </div>

        </div>
      }
    </div>
  );
}

export default Encrypt;
