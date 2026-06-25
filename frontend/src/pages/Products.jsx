import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../components/Layout";
import ProductModal from "../components/ProductModal";
import EditProductModal from "../components/EditProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?page=${page}&limit=5`
      );

      setProducts(data.products || []);
      setPages(data.pages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?search=${search}`
      );

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      <ProductModal
        open={open}
        onClose={() => setOpen(false)}
        refresh={fetchProducts}
      />

      <EditProductModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
        refresh={fetchProducts}
      />

      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Search Product"
          className="border p-2 w-80"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <button
          onClick={searchProducts}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>

        <button
          onClick={fetchProducts}
          className="bg-green-500 text-white px-4 rounded"
        >
          Reset
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">SKU</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className="border-t text-center"
            >
              <td className="p-2">
                {product.name}
              </td>

              <td className="p-2">
                {product.sku}
              </td>

              <td className="p-2">
                {product.category}
              </td>

              <td className="p-2">
                ₹{product.price}
              </td>

              <td className="p-2">
                {product.stock}
              </td>

              <td className="p-2">
                <button
                  onClick={() => {
                    setSelectedProduct(
                      product
                    );
                    setEditOpen(true);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(
                      product._id
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-2 mt-5">
        {[...Array(pages)].map(
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                setPage(index + 1)
              }
              className={`px-3 py-1 border ${
                page === index + 1
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </Layout>
  );
}