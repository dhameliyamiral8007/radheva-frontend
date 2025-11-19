import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../redux/service/AuthService";
import parseError from "../../../utils/parseError";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginService({ email, password });
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
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-xl p-6 space-y-4">
        <div className="flex items-center justify-center gap-8 mb-2">
          <button type="button" className="text-lg font-semibold underline underline-offset-8">Login</button>
          <button type="button" onClick={() => navigate('/register')} className="text-lg">Create Account</button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          placeholder="Email"
          type="email"
          className="w-full max-w-2xl mx-auto border rounded px-3 py-3 block"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative max-w-2xl mx-auto">
          <input
            placeholder="Password"
            type="password"
            className="w-full border rounded px-3 py-3 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">👁</span>
        </div>
        <button type="submit" disabled={loading} className="w-full max-w-2xl mx-auto bg-[#062a4d] text-white rounded px-4 py-3 disabled:opacity-60 block">
          {loading ? "Signing in..." : "SIGN IN"}
        </button>
        <div className="text-center text-sm opacity-70">Forgot your password?</div>
      </form>
    </div>
  );
};

export default Login;


