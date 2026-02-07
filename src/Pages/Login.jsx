import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithEmailAndPasswordFunc, googleLoginFunc, setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";


  if (user) {
    navigate("/");
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");
        navigate(from);
      })
      .catch((err) => {
        console.error(err.code);
        toast.error(err.code); // Clear error message
      });
  };

  const handleGoogleLogin = () => {
    googleLoginFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in with Google!");
        navigate(from);
      })
      .catch((err) => {
        console.error(err.code);
        toast.error(err.code);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Continue with Google
          </button>

          <p className="text-center text-sm mt-2">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
