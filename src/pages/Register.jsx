import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/authentication.service";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  // ถ้า login แล้ว ให้เด้งไปหน้า home
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  // เก็บค่าจาก input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกัน reload หน้า

    if (!user.username || !user.password || !user.email) {
      Swal.fire({
        title: "Error",
        text: "กรุณากรอก Username, Email และ Password ให้ครบ",
        icon: "error",
      });
      return;
    }

    try {
      const response = await AuthService.register(
        user.username,
        user.email,
        user.password
      );

      if (response?.status === 201 || response?.status === 200) {
        Swal.fire({
          title: "Success",
          text: "สมัครสมาชิกเรียบร้อยแล้ว!",
          icon: "success",
        }).then(() => {
          navigate("/login"); // เด้งไปหน้า login
        });
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "สมัครสมาชิกไม่สำเร็จ",
        icon: "error",
      });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm mx-auto mt-20">
      <div className="card-body space-y-4">
        <h2 className="card-title text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="input input-bordered flex items-center gap-2">
            Username
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              value={user.username}
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Email
            <input
              type="email"
              className="grow"
              placeholder="email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            Password
            <input
              type="password"
              className="grow"
              placeholder="*****"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="btn btn-success w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
