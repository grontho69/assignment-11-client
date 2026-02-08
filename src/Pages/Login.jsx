import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithEmailAndPasswordFunc,  setUser, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";


  if (user) {
    navigate("/");
    return null;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value
    const password = e.target.password.value

    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setUser(res.user);
        toast.success("Login successful!");
        navigate(from);
      })
      .catch((err) => {
        console.error(err.code);
        toast.error(err.code); 
      });
  };

 

  return (
  <div className="auth-container">
  <div className="auth-card">
    {/* Header */}
    <div className="auth-header">
      <div className="auth-logo">🩸 BloodConnect</div>
      <h2 className="auth-title">Welcome Back</h2>
      <p className="auth-subtitle">Login to your account</p>
    </div>

    {/* Form */}
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <label className="form-label">Email Address</label>
            <input type="email"
              name="email"
              className="form-input" placeholder="your.email@example.com" />
      </div>

      <div className="form-group relative">
        <label className="form-label">Password</label>
            <input type={showPassword ? "text" : "password"}
              name="password"
              className="form-input" placeholder="Enter your password" />
        <span className="absolute right-2 top-8 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </span>
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Login
      </button>
    </form>

   

    {/* Footer */}
    <div className="auth-footer">
      Don&apos;t have an account?
      <Link to="/register">Register here</Link>
    </div>
  </div>
</div>
  );
};

export default Login;
