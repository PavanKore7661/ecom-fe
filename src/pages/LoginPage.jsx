import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import { loginUser } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email,
        password,
      });

      console.log("login response", response);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      localStorage.setItem("email",response.email);
      console.log(localStorage.getItem("token"));
      //alert(localStorage.getItem("token"));
      //navigate("/");
      window.location.href = "/";
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-[80vh]">
        <form onSubmit={handleLogin} className="border p-8 rounded w-96 shadow">
          <h1 className="text-3xl font-bold mb-6">Login</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button className="bg-black text-white w-full py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
