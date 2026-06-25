import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";

export default function POS() {
  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [customerName,
    setCustomerName] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("cash");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const { data } =
          await API.get(
            "/products"
          );

        setProducts(
          data.products || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const addToCart = (
    product
  ) => {
    const existing =
      cart.find(
        (item) =>
          item._id ===
          product._id
      );

    if (existing) {
      setCart(
        cart.map((item) =>
          item._id ===
          product._id
            ? {
                ...item,
                quantity:
                  item.quantity +
                  1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (
    id,
    quantity
  ) => {
    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                Number(
                  quantity
                ),
            }
          : item
      )
    );
  };

  const removeItem = (
    id
  ) => {
    setCart(
      cart.filter(
        (item) =>
          item._id !== id
      )
    );
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  const checkout =
    async () => {
      try {
        const items =
  cart.map((item) => ({
    product: item._id,
    quantity: item.quantity,
  }));

await API.post("/orders", {
  customerName,
  paymentMethod,
  items,
});

        alert(
          "Order Created Successfully"
        );

        setCart([]);
        setCustomerName(
          ""
        );

        fetchProducts();
      } catch (error) {
  console.log("FULL ERROR:");

  console.log(error);

  console.log(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );
}
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-5">
        POS Billing
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-3">
            Products
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {products.map(
              (product) => (
                <div
                  key={
                    product._id
                  }
                  className="border p-3 rounded"
                >
                  <h3 className="font-bold">
                    {
                      product.name
                    }
                  </h3>

                  <p>
                    ₹
                    {
                      product.price
                    }
                  </p>

                  <p>
                    Stock:
                    {
                      product.stock
                    }
                  </p>

                  <button
                    onClick={() =>
                      addToCart(
                        product
                      )
                    }
                    className="bg-black text-white px-3 py-1 rounded mt-2"
                  >
                    Add
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">
            Cart
          </h2>

          <input
            type="text"
            placeholder="Customer Name"
            className="border p-2 w-full mb-3"
            value={
              customerName
            }
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
          />

          <select
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(
      e.target.value
    )
  }
>
  <option value="cash">
    Cash
  </option>

  <option value="card">
    Card
  </option>

  <option value="upi">
    UPI
  </option>
</select>

          {cart.map(
            (item) => (
              <div
                key={
                  item._id
                }
                className="border p-2 mb-2"
              >
                <div className="flex justify-between">
                  <strong>
                    {
                      item.name
                    }
                  </strong>

                  <button
                    onClick={() =>
                      removeItem(
                        item._id
                      )
                    }
                    className="text-red-500"
                  >
                    X
                  </button>
                </div>

                <input
                  type="number"
                  min="1"
                  value={
                    item.quantity
                  }
                  onChange={(
                    e
                  ) =>
                    updateQuantity(
                      item._id,
                      e.target
                        .value
                    )
                  }
                  className="border p-1 w-20 mt-2"
                />
              </div>
            )
          )}

          <h2 className="text-2xl font-bold mt-4">
            Total: ₹{total}
          </h2>

          <button
            onClick={
              checkout
            }
            disabled={
              cart.length ===
              0
            }
            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
}