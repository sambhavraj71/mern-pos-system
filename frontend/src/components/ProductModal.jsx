import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

export default function ProductModal({
  open,
  onClose,
  refresh,
}) {
  const [stores, setStores] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      sku: "",
      category: "",
      price: "",
      stock: "",
      store: "",
    });

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores =
    async () => {
      const { data } =
        await API.get(
          "/stores"
        );

      setStores(data);
    };

  const submitHandler =
    async (e) => {
      e.preventDefault();

      await API.post(
        "/products",
        form
      );

      refresh();

      onClose();
    };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={
          submitHandler
        }
        className="bg-white p-6 rounded w-[500px]"
      >
        <h2 className="text-2xl mb-4">
          Add Product
        </h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <input
          placeholder="SKU"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              sku:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              category:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Price"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Stock"
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              stock:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              store:
                e.target.value,
            })
          }
        >
          <option>
            Select Store
          </option>

          {stores.map(
            (store) => (
              <option
                key={
                  store._id
                }
                value={
                  store._id
                }
              >
                {store.name}
              </option>
            )
          )}
        </select>

        <div className="flex gap-2">
          <button className="bg-black text-white px-4 py-2 rounded">
            Save
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