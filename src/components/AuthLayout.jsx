import loginImg from "../Assets/Images/login_img.jpg";

const AuthLayout = ({ title, children, footer }) => {
  return (
    <div className="position-relative vh-100 vw-100 overflow-hidden">
      {/* Background */}
      <img
        src={loginImg}
        alt="auth background"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ objectFit: "cover" }}
      />

      {/* Overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

      {/* Card */}
      <div className="position-relative d-flex justify-content-center align-items-center h-100">
        <div
          className="card p-5 shadow-lg"
          style={{
            width: "500px",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.2)",
          }}
        >
          <h3 className="text-center mb-5 text-white fs-1">{title}</h3>

          {children}

          {footer}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
