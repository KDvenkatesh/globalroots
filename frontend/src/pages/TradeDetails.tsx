import { useParams } from "react-router-dom";

const TradeDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "50px" }}>
      <h1>Trade Details</h1>

      <p>Trade ID : {id}</p>
    </div>
  );
};

export default TradeDetails;