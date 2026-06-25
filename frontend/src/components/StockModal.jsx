import { useState } from "react";
import API from "../api/axios";

export default function StockModal({
  open,
  onClose,
  inventory,
  action,
  refresh,
}) {
  const [quantity, setQuantity] =
    useState("");

  const [note, setNote] =
    useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await API.put(
        `/inventory/${inventory._id}/stock`,
        {
          quantity: Number(quantity),
          action,
          note,
        }
      );

      refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!open || !inventory)
    return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded w-[450px]"
      >
        <h2 className="text-2xl mb-4">
          {action === "IN"
            ? "Stock IN"
            : "Stock OUT"}
        </h2>

        <p className="mb-3">
          Product:
          <strong>
            {" "}
            {
              inventory.product
                ?.name
            }
          </strong>
        </p>

        <input
          type="number"
          placeholder="Quantity"
          className="border p-2 w-full mb-3"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Note"
          className="border p-2 w-full mb-3"
          value={note}
          onChange={(e) =>
            setNote(
              e.target.value
            )
          }
        />

        <div className="flex gap-2">
          <button
            className="bg-black text-white px-4 py-2 rounded"
          >
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