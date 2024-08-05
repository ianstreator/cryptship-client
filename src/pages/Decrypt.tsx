import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Decrypt() {
  const { id: redisCipherKey } = useParams();
  console.log(redisCipherKey);
  return (
    <>
      <div>Decrypt</div>
    </>
  );
}

export default Decrypt;
