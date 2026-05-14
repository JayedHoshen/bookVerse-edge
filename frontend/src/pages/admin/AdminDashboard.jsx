import { Package, ShoppingBag, Users, BarChart3, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchOrderStats,
  fetchCustomerStats,
  fetchOrders,
  logoutUser,
} from "../../api/api";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: orderStatsData, isLoading: orderStatsLoading } = useQuery({
    queryKey: ["orderStats"],
    queryFn: fetchOrderStats,
  });

  const { data: customerStatsData, isLoading: customerStatsLoading } = useQuery(
    {
      queryKey: ["customerStats"],
      queryFn: fetchCustomerStats,
    },
  );

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      logout();
      navigate("/auth/login");
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  const products = Array.isArray(productsData)
    ? productsData
    : productsData?.data || [];
  const orders = ordersData?.data || [];
  const orderStats = orderStatsData?.data || {};
  const customerStats = customerStatsData?.data || {};

  const recentOrders = orders.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex font-sans">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-8 py-8">
          <h2 className="text-3xl font-semibold text-[#1f1f1f]">BookVerse</h2>
          <p className="mt-1 text-sm text-gray-500">Admin Dashboard</p>
        </div>

        <div className="px-8 pb-4">
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#f3ebe1] px-4 py-3 text-sm font-semibold text-[#9f5d16] hover:bg-[#e8dccf] transition"
          >
            <LogOut className="w-4 h-4" />
            {logoutMutation.isLoading ? "Signing out..." : "Sign Out"}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 bg-[#f3ebe1] text-[#9f5d16] font-semibold shadow-sm"
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </Link>
          <Link
            to="/admin/inventory"
            className="flex items-center gap-3 rounded-3xl px-5 py-4 text-gray-700 hover:bg-gray-100 transition"
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
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-10">
            <div>
              <p className="uppercase tracking-[0.35em] text-xs text-[#9f5d16] mb-3">
                Management Overview
              </p>
              <h1 className="text-5xl font-semibold text-[#1f1f1f]">
                Welcome back, admin.
              </h1>
              <p className="text-gray-600 mt-3 max-w-2xl">
                Curate the collection, monitor user engagement, and oversee the
                library flow of the BookVerse ecosystem.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/inventory")}
              className="inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-black transition"
            >
              + Add New Book
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Total Books
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                {productsLoading ? "..." : products.length}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Fresh titles in inventory.
              </p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Active Users
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                {customerStatsLoading
                  ? "..."
                  : customerStats.activeCustomers || 0}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Currently active library members.
              </p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Revenue (MTD)
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                {orderStatsLoading
                  ? "..."
                  : `$${(orderStats.totalRevenue || 0).toLocaleString()}`}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Library sales this month.
              </p>
            </div>
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                Pending Orders
              </p>
              <p className="mt-6 text-4xl font-semibold text-[#1f1f1f]">
                {orderStatsLoading ? "..." : orderStats.pendingOrders || 0}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Orders waiting to be fulfilled.
              </p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1f1f1f]">
                    Manage Catalog
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Review and update the current library inventory.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/admin/inventory")}
                  className="rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition"
                >
                  View Full Inventory
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-sm text-gray-500">
                      <th className="pb-3 px-4">Book Title</th>
                      <th className="pb-3 px-4">Category</th>
                      <th className="pb-3 px-4">Price</th>
                      <th className="pb-3 px-4">Stock</th>
                      <th className="pb-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsLoading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          Loading inventory...
                        </td>
                      </tr>
                    ) : (
                      products.slice(0, 5).map((product) => (
                        <tr
                          key={product._id}
                          className="bg-[#fcfbf8] rounded-3xl shadow-sm"
                        >
                          <td className="px-4 py-4 font-medium text-[#1f1f1f]">
                            {product.name}
                          </td>
                          <td className="px-4 py-4 text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-4 py-4 font-semibold text-[#1f1f1f]">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                                product.stock === 0
                                  ? "bg-red-100 text-red-700"
                                  : product.stock <= 10
                                    ? "bg-orange-100 text-orange-700"
                                    : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {product.stock === 0
                                ? "Out of stock"
                                : `${product.stock} in stock`}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() => navigate("/admin/inventory")}
                              className="rounded-full bg-[#1f1f1f] px-4 py-2 text-xs font-semibold text-white hover:bg-black transition"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-[#1f1f1f]">
                      Order Management
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Monitor and fulfill recent customer requests.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f3ebe1] px-3 py-1 text-xs font-semibold text-[#9f5d16]">
                    Live
                  </span>
                </div>

                {ordersLoading ? (
                  <div className="py-10 text-center text-gray-500">
                    Loading orders...
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="rounded-3xl bg-[#fcfbf8] p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                              {order.orderNumber}
                            </p>
                            <p className="mt-2 font-semibold text-[#1f1f1f]">
                              {order.customerName}
                            </p>
                          </div>
                          <span className="rounded-full bg-[#e9f6ff] px-3 py-1 text-xs font-semibold text-[#1570ff]">
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                          <span>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span>${order.totalAmount.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => navigate("/admin/orders")}
                          className="mt-5 w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#1f1f1f] hover:bg-gray-50 transition"
                        >
                          Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No recent orders to display.
                  </p>
                )}
              </div>

              <div className="rounded-4xl border border-gray-200 bg-[#fff8ed] p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#1f1f1f]">
                  Quick Insights
                </h3>
                <p className="mt-3 text-gray-600">
                  Inventory levels are stable. Focus on replenishing low stock
                  products and keep the latest launches featured.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1f1f1f]" />{" "}
                    Reorder top-selling titles weekly.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1f1f1f]" />{" "}
                    Review pending delivery issues daily.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1f1f1f]" />{" "}
                    Launch promotional bundles for loyal users.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
