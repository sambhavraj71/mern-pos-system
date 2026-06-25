import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import CreateUserModal from "../components/CreateUserModal";

export default function Users() {
  const [users, setUsers] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const { data } =
          await API.get(
            "/users"
          );

        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

  const deleteUser =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete User?"
        );

      if (!confirmDelete)
        return;

      try {
        await API.delete(
          `/users/${id}`
        );

        fetchUsers();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Layout>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user) => (
              <tr
                key={user._id}
                className="border-t text-center"
              >
                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  <button
                    onClick={() =>
                      deleteUser(
                        user._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <CreateUserModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        refresh={
          fetchUsers
        }
      />
    </Layout>
  );
}