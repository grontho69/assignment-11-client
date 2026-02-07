import { useState, useContext } from "react";
import {  Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc, 
    googleLoginFunc,
    updateProfileFunc,
    signoutUserFunc,
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoUrl;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = photoURL.files[0]
    console.log(file)

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passCheck.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase letters."
      );
      return;
    }

const res = await axios.post('https://api.imgbb.com/1/upload?key=f44db395c371677d5dbde5340322dd7c', { image: file }, {
      headers: {
      'Content-Type':'multipart/form-data'
      }
    })
  const mainPhotoURL = res.data.data.display_url
    
    createUserWithEmailAndPasswordFunc(email, password)
      .then(() => {
        updateProfileFunc(name, mainPhotoURL)
          .then(() => {
            signoutUserFunc().then(() => {
              toast.success("Signup successful! Please login.");
              setUser(null);
             
            });
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };




  const handleGoogleLogin = () => {
    googleLoginFunc()
      .then((res) => {
        setUser(res.user);
        toast.success("Logged in with Google!");
        navigate("/");


      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <label className="label">Your Name</label>
          <input type="text" name="name" placeholder="Your Name" className="w-full p-2 border rounded" required />
          <label className="label">Photo</label>
          <input type="file" name="photoUrl" placeholder="Photo URL" className="w-full p-2 border rounded" required />
          <label className="label">Your Email</label>
          <input type="email" name="email" placeholder="Email" className="w-full p-2 border rounded" required />
          <div className="relative">
            <label className="label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              required
            />
            <span className="absolute right-2 top-8 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Register</button>
          <button type="button" onClick={handleGoogleLogin} className="w-full bg-red-500 text-white py-2 rounded">Continue with Google</button>
          <p className="text-center text-sm mt-2">
            Already have an account? <Link to="/login" className="text-blue-500 underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
