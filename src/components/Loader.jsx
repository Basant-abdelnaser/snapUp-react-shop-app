import RingLoader from "react-spinners/RingLoader";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={overlayStyle}>
      <RingLoader size={50} color="#fff" />
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

export default Loader;
