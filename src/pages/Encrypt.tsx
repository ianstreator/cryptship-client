import { FormEvent } from "react";
import { encryptData, generateAESKey } from "../utils/AES";

function Encrypt() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputElement = form.elements.namedItem("data") as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue === "") return;

    const key = await generateAESKey();

    const { encryptedData, iv } = await encryptData(key, inputValue);

    // const res = await fetch("https://localhost:4000",)
    console.log(encryptedData, iv, key);
    console.log(new Uint8Array(encryptedData));
  };

  return (
    <>
      <div>Encrypt</div>
      <form action="submit" onSubmit={(e) => handleSubmit(e)}>
        <p>Default expiration 10 minutes.</p>
        <input
          type="number"
          min={10}
          max={60}
          defaultValue={10}
          step={5}
          placeholder="Enter minutes till expiration of data"
        />
        <p>
          Once you click encrypt, your data will be encrypted in the browser.
          Only the encryption will be stored on our server for the length of
          time you chose above.
        </p>
        <br />
        <p>
          A link to our decrypt page will be generated as well as the key needed
          for decryption. Send both of these to the recipient.
        </p>
        <input
          style={{ width: 300 }}
          type="text"
          name="data"
          placeholder="Paste data to be encrypted here"
        />
        <button type="submit">ENCRYPT</button>
      </form>
    </>
  );
}

export default Encrypt;
