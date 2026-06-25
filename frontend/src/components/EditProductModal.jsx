import { useEffect, useState } from "react";
import API from "../api/axios";

export default function EditProductModal({
  open,
  onClose,
  product,
  refresh,
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
      });
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/products/${product._id}`,
        form
      );

      refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded w-[500px]"
      >
        <h2 className="text-2xl mb-4">
          Edit Product
        </h2>

        <input
          value={form.name}
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          value={form.category}
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          value={form.price}
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              price: e.target.value,
            })
          }
        />

        <input
          value={form.stock}
          className="border p-2 w-full mb-2"
          onChange={(e) =>
            setForm({
              ...form,
              stock: e.target.value,
            })
          }
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Update
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