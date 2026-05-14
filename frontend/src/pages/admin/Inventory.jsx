import React, { useState } from "react";
import {
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  logoutUser,
} from "../../api/api";
import { useAuth } from "../../context/AuthContext";

const CATEGORIES = [
  "FICTION",
  "NON_FICTION",
  "MYSTERY",
  "ROMANCE",
  "SCIENCE_FICTION",
  "BIOGRAPHY",
  "HISTORY",
  "SELF_HELP",
  "CHILDREN",
  "POETRY",
];

export default function Inventory() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "FICTION",
    stock: 10,
    price: 45,
    image: "",
    description: "",
    additionalImages: "", // Comma separated
    author: "", // Book author
    isbn: "", // ISBN number
    publisher: "", // Publisher name
    publicationYear: "", // Year of publication
  });

  // Mutations
  const addMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      alert("✅ Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
    onError: (err) =>
      alert("❌ " + (err.response?.data?.message || err.message)),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      alert("✅ Product updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      alert("✅ Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) =>
      alert("❌ " + (err.response?.data?.message || err.message)),
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      navigate("/auth/login");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const resetForm = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "FICTION",
      stock: 10,
      price: 45,
      image: "",
      description: "",
      additionalImages: "",
      author: "",
      isbn: "",
      publisher: "",
      publicationYear: "",
    });
  };

  // Filter products based on search and status
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "In Stock" && product.stock > 20) ||
      (filterStatus === "Low Stock" &&
        product.stock > 0 &&
        product.stock <= 20) ||
      (filterStatus === "Out of Stock" && product.stock === 0);
    return matchesSearch && matchesStatus;
  });

  // Get stock status
  const getStockStatus = (stock) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock <= 20)
      return { label: "Low Stock", color: "bg-orange-100 text-orange-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-700" };
  };

  // Handle delete
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(productId);
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "FICTION",
      stock: product.stock || 0,
      price: product.price || 0,
      image: product.image || "",
      description: product.description || "",
      additionalImages: product.additionalImages
        ? product.additionalImages.join(", ")
        : "",
      author: product.author || "",
      isbn: product.isbn || "",
      publisher: product.publisher || "",
      publicationYear: product.publicationYear || "",
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name) return alert("Book title is required!");

    const payload = {
      name: formData.name,
      category: formData.category,
      stock: Number(formData.stock),
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
      author: formData.author,
      isbn: formData.isbn,
      publisher: formData.publisher,
      publicationYear: formData.publicationYear
        ? Number(formData.publicationYear)
        : null,

      additionalImages: formData.additionalImages
        ? formData.additionalImages
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean)
        : [],
    };

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct._id, data: payload });
    } else {
      addMutation.mutate(payload);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex font-sans">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-8 py-8">
          <h2 className="text-3xl font-semibold text-[#1f1f1f]">BookVerse</h2>
          <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <div className="px-8 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
          >
            <LogOut className="w-4 h-4" />
            {logoutMutation.isLoading ? "Signing out..." : "Sign Out"}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 text-gray-700 hover:bg-gray-100 transition"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
          <Link
            to="/admin/inventory"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 bg-[#f3ebe1] text-[#9f5d16] font-semibold shadow-sm"
          >
            <Package className="w-5 h-5" />
            Inventory
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 text-gray-700 hover:bg-gray-100 transition"
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 text-gray-700 hover:bg-gray-100 transition"
          >
            <Users className="w-5 h-5" />
            Customers
          </Link>
        </nav>

        <div className="px-8 py-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-[#f4ebe0] flex items-center justify-center text-xl">
              👩‍💼
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Administrator</p>
              <p className="text-xs text-gray-500">BookVerse Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-10">
            <div>
              <p className="uppercase tracking-[0.35em] text-xs text-[#9f5d16] mb-3">
                Book Management
              </p>
              <h1 className="text-5xl font-semibold text-[#1f1f1f]">
                Inventory Control
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Manage your book collection, track stock levels, and organize
                your literary inventory.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black transition"
            >
              <Plus className="w-5 h-5" />
              Add New Book
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Total Books
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                {isLoading ? "..." : products.length}
              </p>
              <p className="mt-4 text-sm text-gray-500">Titles in collection</p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Low Stock
              </p>
              <p className="mt-6 text-4xl font-semibold text-orange-600">
                {isLoading
                  ? "..."
                  : products.filter((p) => p.stock > 0 && p.stock <= 20).length}
              </p>
              <p className="mt-4 text-sm text-gray-500">Need restocking soon</p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Out of Stock
              </p>
              <p className="mt-6 text-4xl font-semibold text-red-600">
                {isLoading
                  ? "..."
                  : products.filter((p) => p.stock === 0).length}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Currently unavailable
              </p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Total Value
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                $
                {isLoading
                  ? "..."
                  : products
                      .reduce((sum, p) => sum + p.price * (p.stock || 0), 0)
                      .toLocaleString()}
              </p>
              <p className="mt-4 text-sm text-gray-500">Inventory worth</p>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b flex flex-col md:flex-row gap-4 justify-between">
              <h2 className="text-xl font-semibold">All Books</h2>
              <div className="flex gap-4">
                <div className="relative w-80">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-300"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-gray-500">
                    <th className="px-6 py-5 font-medium">PRODUCT</th>
                    <th className="px-6 py-5 font-medium">CATEGORY</th>
                    <th className="px-6 py-5 font-medium">STOCK</th>
                    <th className="px-6 py-5 font-medium">PRICE</th>
                    <th className="px-6 py-5 font-medium">STATUS</th>
                    <th className="px-6 py-5 font-medium text-center">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        Loading products...
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((item) => {
                      const status = getStockStatus(item.stock);
                      return (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-12 rounded-2xl object-cover"
                                />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-gray-600">
                            {item.category}
                          </td>
                          <td className="px-6 py-5 font-semibold">
                            {item.stock} units
                          </td>
                          <td className="px-6 py-5 font-semibold">
                            ${item.price}
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-block px-4 py-1 text-xs font-medium rounded-full ${status.color}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <div className="flex justify-center gap-4">
                              <button
                                onClick={() => openEditModal(item)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-semibold">
                {editingProduct ? "Edit Book" : "Add New Book"}
              </h2>
              <button onClick={resetForm}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Images (comma separated)
                </label>
                <textarea
                  value={formData.additionalImages}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalImages: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter book author"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) =>
                      setFormData({ ...formData, isbn: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="978-0-123456-78-9"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    value={formData.publicationYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publicationYear: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Publisher
                </label>
                <input
                  type="text"
                  value={formData.publisher}
                  onChange={(e) =>
                    setFormData({ ...formData, publisher: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter publisher name"
                />
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <button
                onClick={resetForm}
                className="flex-1 py-3.5 border rounded-2xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3.5 bg-[#1f1f1f] text-white rounded-2xl hover:bg-black transition"
              >
                {editingProduct ? "Update Book" : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
