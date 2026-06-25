import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const submitHandler = async (
    e
  ) => {
    e.preventDefault();

    try {
      const { data } =
        await API.post(
          "/auth/login",
          form
        );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data
          ?.message
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="border p-6 rounded w-96"
      >
        <h2 className="text-2xl font-bold mb-4">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button className="bg-black text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}