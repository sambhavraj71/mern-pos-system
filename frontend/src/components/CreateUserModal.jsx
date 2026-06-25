import { useState } from "react";
import API from "../api/axios";

export default function CreateUserModal({
  open,
  onClose,
  refresh,
}) {
  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "cashier",
    });

  const submitHandler =
    async (e) => {
      e.preventDefault();

      try {
        await API.post(
          "/users",
          form
        );

        refresh();

        onClose();
      } catch (error) {
        console.log(error);
      }
    };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={
          submitHandler
        }
        className="bg-white p-6 rounded w-[450px]"
      >
        <h2 className="text-2xl mb-4">
          Create User
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
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
          className="border p-2 w-full mb-3"
          value={
            form.password
          }
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target.value,
            })
          }
        >
          <option value="manager">
            Manager
          </option>

          <option value="cashier">
            Cashier
          </option>
        </select>

        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded">
            Create
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}