import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfileService, updateUserProfileService } from "../../redux/service/AuthService";
import { useTheme } from "../../config/hooks/useTheme";

const Profile = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    addresses: { home: { street: "", city: "", state: "", pincode: "" } },
    _id: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("uuid") || localStorage.getItem("token") || localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await getUserProfileService();
        const data = res?.Data || {};
        setUser({
          _id: data._id || "",
          name: data.name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          password: "",
          addresses: data.addresses || { home: { street: "", city: "", state: "", pincode: "" } },
        });
      } catch (e) {
        setError(e?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setUser((prev) => ({
      ...prev,
      addresses: {
        ...prev.addresses,
        home: { ...prev.addresses.home, [field]: value },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        password: user.password || undefined,
        role: "user",
        addresses: { home: user.addresses?.home || {} },
      };
      await updateUserProfileService(user._id, payload);
    //   navigate("/Profile");
    } catch (e) {
      setError(e?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full p-6`}>Loading profile...</div>
    );
  }

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}> 
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
        {error && <div className="text-red-500 mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input className="w-full border p-2 rounded text-black" value={user.name} onChange={(e)=>handleChange('name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input type="email" className="w-full border p-2 rounded text-black" value={user.email} onChange={(e)=>handleChange('email', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Mobile</label>
            <input className="w-full border p-2 rounded text-black" value={user.mobile} onChange={(e)=>handleChange('mobile', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" className="w-full border p-2 rounded text-black" value={user.password} onChange={(e)=>handleChange('password', e.target.value)} placeholder="Enter to update" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Street</label>
              <input className="w-full border p-2 rounded text-black" value={user.addresses?.home?.street || ''} onChange={(e)=>handleAddressChange('street', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">City</label>
              <input className="w-full border p-2 rounded text-black" value={user.addresses?.home?.city || ''} onChange={(e)=>handleAddressChange('city', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">State</label>
              <input className="w-full border p-2 rounded text-black" value={user.addresses?.home?.state || ''} onChange={(e)=>handleAddressChange('state', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">Pincode</label>
              <input className="w-full border p-2 rounded text-black" value={user.addresses?.home?.pincode || ''} onChange={(e)=>handleAddressChange('pincode', e.target.value)} />
            </div>
          </div>
          <div className="pt-2">
            <button type="submit" className="bg-[#C79954] text-white px-6 py-2 rounded">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;


