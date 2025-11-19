import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerService, loginService } from "../../redux/service/AuthService";
import parseError from "../../../utils/parseError";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
    addresses: {
      home: { street: "", city: "", state: "", pincode: "" },
      office: { street: "", city: "", state: "", pincode: "" },
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);

  const update = (path, value) => {
    setForm((prev) => {
      const clone = structuredClone(prev);
      const parts = path.split(".");
      let cursor = clone;
      for (let i = 0; i < parts.length - 1; i++) cursor = cursor[parts[i]];
      cursor[parts[parts.length - 1]] = value;
      return clone;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerService(form);
      // auto-login for convenience
      await loginService({ email: form.email, password: form.password });
      const redirect = localStorage.getItem("postLoginRedirect");
      if (redirect) {
        localStorage.removeItem("postLoginRedirect");
        navigate(redirect, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(parseError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl p-6 space-y-6">
        <div className="flex items-center justify-center gap-8 mb-2">
          <button type="button" onClick={() => navigate('/login')} className="text-lg">Login</button>
          <button type="button" className="text-lg font-semibold underline underline-offset-8">Create Account</button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="space-y-4 max-w-2xl mx-auto">
          <input placeholder="Name" className="w-full border rounded px-3 py-3" value={form.name} onChange={(e)=>update('name', e.target.value)} required />
          <input placeholder="Email" type="email" className="w-full border rounded px-3 py-3" value={form.email} onChange={(e)=>update('email', e.target.value)} required />
          <input placeholder="Phone Number (Optional)" className="w-full border rounded px-3 py-3" value={form.mobile} onChange={(e)=>update('mobile', e.target.value)} />
          <div className="relative">
            <input placeholder="Password" type={showPassword ? 'text' : 'password'} className="w-full border rounded px-3 py-3 pr-10" value={form.password} onChange={(e)=>update('password', e.target.value)} required />
            <button type="button" onClick={()=>setShowPassword(p=>!p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">{showPassword ? '🙈' : '👁'}</button>
            <div className="text-xs text-gray-500 mt-1">Password is required</div>
          </div>
        </div>

        {/* <div className="max-w-2xl mx-auto">
          <button type="button" onClick={()=>setShowAddresses(s=>!s)} className="text-sm underline mt-2">
            {showAddresses ? 'Hide address (optional)' : 'Add address (optional)'}
          </button>
          {showAddresses && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1">
                <div className="font-medium">Home Address</div>
                <input className="w-full border rounded px-3 py-2" placeholder="Street" value={form.addresses.home.street} onChange={(e)=>update('addresses.home.street', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="City" value={form.addresses.home.city} onChange={(e)=>update('addresses.home.city', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="State" value={form.addresses.home.state} onChange={(e)=>update('addresses.home.state', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="Pincode" value={form.addresses.home.pincode} onChange={(e)=>update('addresses.home.pincode', e.target.value)} />
              </div>
              <div className="space-y-1">
                <div className="font-medium">Office Address</div>
                <input className="w-full border rounded px-3 py-2" placeholder="Street" value={form.addresses.office.street} onChange={(e)=>update('addresses.office.street', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="City" value={form.addresses.office.city} onChange={(e)=>update('addresses.office.city', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="State" value={form.addresses.office.state} onChange={(e)=>update('addresses.office.state', e.target.value)} />
                <input className="w-full border rounded px-3 py-2" placeholder="Pincode" value={form.addresses.office.pincode} onChange={(e)=>update('addresses.office.pincode', e.target.value)} />
              </div>
            </div>
          )}
        </div> */}

        <div className="max-w-2xl mx-auto">
          <button type="submit" disabled={loading} className="w-full bg-[#062a4d] text-white rounded px-4 py-3 disabled:opacity-60">
            {loading ? "Creating account..." : "CREATE ACCOUNT"}
          </button>
        </div>
        {/* <button type="button" onClick={()=>navigate('/login')} className="w-full mt-2 border rounded px-4 py-2">
          Already have an account? Login
        </button> */}
      </form>
    </div>
  );
};

export default Register;


