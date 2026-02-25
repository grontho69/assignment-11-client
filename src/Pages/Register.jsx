import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Select from "react-select"; // ১. react-select ইমপোর্ট করা হয়েছে

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    signoutUserFunc,
    setUser,
  } = useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  // ডিস্ট্রিক্ট এবং উপজেলা এখন অবজেক্ট হিসেবে থাকবে { value, label }
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedUpazila, setSelectedUpazila] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // ডিস্ট্রিক্ট ডেটা লোড এবং ফরম্যাট
    axios.get('/district.json').then(res => {
      const formattedDistricts = res.data.districts.map(d => ({
        value: d.id,
        label: d.name
      }));
      setDistricts(formattedDistricts);
    });

    // উপজেলা ডেটা লোড
    axios.get('/upazila.json').then(res => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  // ২. সিলেক্ট করা ডিস্ট্রিক্ট আইডি অনুযায়ী উপজেলা ফিল্টার করা
  const filteredUpazilaOptions = selectedDistrict
    ? upazilas
        .filter(u => u.district_id === selectedDistrict.value)
        .map(u => ({ value: u.id, label: u.name }))
    : [];

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = photoUrl.files[0];
    const phone = e.target.phone.value;
    const blood = e.target.blood.value;

    // ভ্যালিডেশন: জেলা ও উপজেলা সিলেক্ট করা হয়েছে কিনা
    if (!selectedDistrict || !selectedUpazila) {
      toast.error("Please select both District and Upazila");
      return;
    }

    const passCheck = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passCheck.test(password)) {
      toast.error(
        "Password must be at least 6 characters and include uppercase & lowercase letters."
      );
      return;
    }

    try {
      // ইমেজ আপলোড
      const imgFormData = new FormData();
      imgFormData.append('image', file);
      
      const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=c8b6debf6280ade9dbfbce13a28e3e0d`, imgFormData);
      const mainPhotoUrl = imgRes.data.data.display_url;

      // ৩. ডাটাবেজে পাঠানোর জন্য অবজেক্ট
      const formData = {
        email,
        name,
        mainPhotoUrl,
        password,
        phone,
        blood,
        district: selectedDistrict.label, // জেলার নাম
        upazila: selectedUpazila.label,   // উপজেলার নাম
        status: "active",
        role: "donor"
      };

      console.log(formData);

      if (imgRes.data.success) {
        createUserWithEmailAndPasswordFunc(email, password)
          .then(() => {
            updateProfileFunc(name, mainPhotoUrl)
              .then(() => {
                signoutUserFunc().then(() => {
                  toast.success("Signup successful! Please login.");
                  axios.post('https://blood-donation-backend-phi.vercel.app/user', formData)
                    .then(res => {
                      console.log(res.data);
                    }).catch(err => {
                      console.log(err);
                    });
                  setUser(null);
                  navigate('/login');
                });
              })
              .catch((err) => toast.error(err.message));
          })
          .catch((err) => toast.error(err.message));
      }
    } catch (err) {
      toast.error("Image upload failed or other error.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🩸 BloodConnect</div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join our blood donation community</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="your.email@example.com" required />
          </div>

          <div className="form-group">
            <label className="form-label">Photo</label>
            <input type="file" name="photoUrl" className="form-input" required />
          </div>

          <div className="form-group relative">
            <label className="form-label">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-input"
              placeholder="Min. 6 characters"
              required
            />
            <span 
              className="absolute right-2 top-8 cursor-pointer" 
              style={{ position: 'absolute', right: '10px', top: '38px', cursor: 'pointer', fontSize: '0.8rem', color: '#666' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <div className="grid grid-cols-2" style={{ gap: "1rem" }}>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input type="tel" name="phone" className="form-input" placeholder="01XXXXXXXXX" required />
            </div>

            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select" name="blood" required defaultValue="">
                <option value="" disabled>Select Blood Group</option>
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

          {/* ৪. ডিস্ট্রিক্ট এবং উপজেলা টাইপ করে খোঁজার অংশ */}
          <div className="grid grid-cols-2" style={{ gap: "1rem", marginBottom: "1.5rem" }}>
            <div className="form-group">
              <label className="form-label">District</label>
              <Select
                options={districts}
                isSearchable={true}
                placeholder="Type District..."
                onChange={(selected) => {
                  setSelectedDistrict(selected);
                  setSelectedUpazila(null); // ডিস্ট্রিক্ট বদলালে উপজেলা ক্লিয়ার হবে
                }}
                styles={{
                  control: (base) => ({ ...base, height: '42px', borderRadius: '8px' })
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upazila</label>
              <Select
                options={filteredUpazilaOptions}
                isSearchable={true}
                placeholder="Type Upazila..."
                value={selectedUpazila}
                isDisabled={!selectedDistrict} // জেলা সিলেক্ট না করা পর্যন্ত বন্ধ থাকবে
                onChange={(selected) => setSelectedUpazila(selected)}
                styles={{
                  control: (base) => ({ ...base, height: '42px', borderRadius: '8px' })
                }}
              />
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