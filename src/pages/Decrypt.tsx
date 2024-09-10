import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { decryptData } from "../utils/AES";

function Decrypt() {
  const { id: cipherKey } = useParams();
  const BASE_URL = "http://localhost:3000/decrypter/"

  const [cipher, setCipher] = useState("")
  const [message, setMessage] = useState("")
  const [decryptKey, setDecryptKey] = useState("")


  const getChiper = async () => {
    const res = await fetch(BASE_URL + cipherKey)
    const cipher = await res.json()
    setCipher(cipher)
  }

  useEffect(() => {
    getChiper()
  }, [])
  return (
    <>
      <input type="text" name="decrypt-key" placeholder="Paste decryption key here." />
    </>
  );
}

export default Decrypt;
