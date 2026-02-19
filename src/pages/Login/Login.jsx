import { useState } from "react";
import { useNavigate } from "react-router-dom";
import joi from "joi";
import ClipLoader from "react-spinners/ClipLoader";

import AuthLayout from "../../components/AuthLayout";
import { loginUser } from "../../services/authService";
import { errorToast, successToast } from "../../components/Toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const schema = joi.object({
    username: joi.string().required().messages({
      "string.empty": "Username is required",
    }),
    password: joi.string().required().messages({
      "string.empty": "Password is required",
    }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = schema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.accessToken);
      navigate("/");
      successToast("Login successful");
      dispatch(login(data));
    } catch (err) {
      console.log(err);
      errorToast(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      footer={
        <p className="text-center text-white mt-3 mb-0">
          Don’t have an account?{" "}
          <span
            className="text-primary fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="alert alert-danger mt-1">{errors.username}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="alert alert-danger mt-1">{errors.password}</p>
          )}
        </div>

        <button
          className="btn btn-primary w-100"
          type="submit"
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Login"}
        </button>
      </form>
    </AuthLayout>
  );
};

export default Login;
