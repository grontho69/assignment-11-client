import { useState, useContext, useEffect } from "react";
import {  Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc, 
    
    updateProfileFunc,
    signoutUserFunc,
    setUser,
  } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([])
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')
   const [upazila, setUpazila] = useState([])
  
  useEffect(() => {
    axios.get('./upazila.json')
      .then(res => {
        setUpazilas(res.data.upazilas)
      })
     axios.get('./district.json')
      .then(res => {
        setDistricts(res.data.districts)
      })
    
  }, [])
  

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = photoUrl.files[0]
    const phone = e.target.phone.value
    
    const blood = e.target.blood.value    

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passCheck.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase letters."
      );
      return;
    }

const res = await axios.post(`https://api.imgbb.com/1/upload?key=c8b6debf6280ade9dbfbce13a28e3e0d`, { image: file }, {
      headers: {
      'Content-Type':'multipart/form-data'
      }
    })
    const mainPhotoUrl = res.data.data.display_url

    const formData = {
      email,
      name,
      mainPhotoUrl,
      password,
      phone,
     
      blood,
      district,
      upazila

    }
  
console.log(formData)
    
    if (res.data.success === true) {
        createUserWithEmailAndPasswordFunc(email, password)
      .then(() => {
        updateProfileFunc(name, mainPhotoUrl)
          .then(() => {
            signoutUserFunc().then(() => {
              toast.success("Signup successful! Please login.");
              axios.post('http://localhost:3000/user', formData)
                .then(res => {
                console.log(res.data)
                }).catch(err => {
                console.log(err)
              })
              setUser(null);
              navigate('/login')
             
            });
          })
          .catch((err) => toast.error(err.message));
      })
      .catch((err) => toast.error(err.message));
  };
    }
    
  




 

  return (
   <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">🩸 BloodConnect</div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">
            Join our blood donation community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>


           <div className="form-group">
            <label className="form-label">Photo</label>
            <input
              type="file"
              name="photoUrl"
              className="form-input"
              placeholder="choose a photo"
            />
          </div>

          
        
            <div className="form-group relative">
              <label className="form-label">Password</label>
              <input
              type={showPassword ? "text" : "password"}
              name="password"
                className="form-input"
                placeholder="Min. 6 characters"
              />
              <span className="absolute right-2 top-8 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            
          

          
          <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="01XXXXXXXXX"
              />
            </div>

          <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select"
              name="blood">
                <option disabled={true} >Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div> 
            
          </div>

          
            <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select">
                <option disabled selected value='' >Select District</option>
                {
                  districts.map(d => <option value={d?.name} key={d.id}>{d?.name }</option>)
               }
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="form-select">
                <option disabled selected value='' >Select Upazila</option>
                {
                  upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name }</option>)
               }
              </select>
            </div>
          </div> 

         
         

         
          <button type="submit" className="btn btn-primary w-full">
            Create Account
          </button>
        </form>

      
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;


