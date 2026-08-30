import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  FaArrowLeft,
  FaArrowTrendUp,
  FaArrowTrendDown,
} from "react-icons/fa6";

import {
  MdTrendingFlat,
  MdCalendarMonth,
} from "react-icons/md";

import { useEffect, useState } from "react";
import { getProductHistory } from "../../services/priceService";

function ProductHistory() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadHistory = async () => {

      const data = await getProductHistory(productId);

      setProduct(data);

      setLoading(false);

    }

    loadHistory();


  }, [productId]);

  if (loading) {

    return (
      <MainLayout>

        <section className="min-h-screen flex items-center justify-center">

          <h2 className="text-xl font-semibold text-green-700">
            Loading price history...
          </h2>

        </section>

      </MainLayout>
    );

  }

  if (!product) {
    return (
      <MainLayout>
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600">
              Product Not Found
            </h2>

            <button
              onClick={() => navigate("/price-trends")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Back
            </button>
          </div>
        </section>
      </MainLayout>
    );
  }

  const prices = product.history.map((item) => item.price);

  const today = product.history.at(-1)?.price ?? 0;

  const yesterday = product.history.at(-2)?.price ?? today;

  const difference = today - yesterday;

  const percentage =
    yesterday === 0
      ? 0
      : ((difference / yesterday) * 100).toFixed(1);

  const highest =
    prices.length > 0 ? Math.max(...prices) : 0;

  const lowest =
    prices.length > 0 ? Math.min(...prices) : 0;

  const average =
    prices.length > 0
      ? (
        prices.reduce((sum, p) => sum + p, 0) /
        prices.length
      ).toFixed(1)
      : 0;

  const records = product.history.length;

  const trend =
    difference > 0
      ? "up"
      : difference < 0
        ? "down"
        : "stable";

  const Icon = product.icon;

  return (
    <MainLayout>
      {/* <ScrollToTop /> */}

      <section className="min-h-screen bg-gray-50 py-8 lg:py-12">

        <div className="max-w-7xl mx-auto px-4">

          {/* Hero */}

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 lg:p-10">

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">

              {/* Left */}

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-green-100 flex items-center justify-center">

                  {Icon && (
                    <Icon className="text-5xl lg:text-6xl text-green-700" />
                  )}

                </div>

                <div>

                  <h1 className="text-3xl lg:text-5xl font-bold">

                    {product.name}

                  </h1>

                  <p className="text-lg lg:text-2xl text-gray-500 mt-2">

                    {product.urdu}

                  </p>

                  <span className="inline-block mt-4 rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-semibold capitalize">

                    {product.category}

                  </span>

                </div>

              </div>

              {/* Right */}

              <div className="text-left lg:text-right">

                <p className="text-gray-500">

                  Current Price

                </p>

                <h2 className="text-4xl lg:text-5xl font-bold text-green-700 mt-2">

                  Rs {today}

                </h2>

                <p className="text-gray-500 mt-2">

                  Per {product.unit}

                </p>

                <div className="mt-5">

                  {trend === "up" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-2 font-semibold">

                      <FaArrowTrendUp />

                      +{percentage}%

                    </span>
                  )}

                  {trend === "down" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-100 text-red-700 px-4 py-2 font-semibold">

                      <FaArrowTrendDown />

                      {percentage}%

                    </span>
                  )}

                  {trend === "stable" && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 text-gray-700 px-4 py-2 font-semibold">

                      <MdTrendingFlat />

                      Stable

                    </span>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

            <div className="bg-white rounded-2xl p-5 shadow-sm border">

              <p className="text-gray-500 text-sm">

                Highest Price

              </p>

              <h3 className="text-3xl font-bold text-green-700 mt-2">

                Rs {highest}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border">

              <p className="text-gray-500 text-sm">

                Lowest Price

              </p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">

                Rs {lowest}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border">

              <p className="text-gray-500 text-sm">

                Average Price

              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-2">

                Rs {average}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border">

              <div className="flex items-center gap-2 text-gray-500">

                <MdCalendarMonth />

                <span className="text-sm">

                  Records

                </span>

              </div>

              <h3 className="text-3xl font-bold mt-2">

                {records}

              </h3>

            </div>

          </div>

          {/* ===========================
    Price Trend Chart
=========================== */}

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 p-5 lg:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Price Trend

                </h2>

                <p className="text-gray-500 mt-1">

                  Daily market price movement

                </p>

              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">

                {records} Records

              </span>

            </div>

            <div className="h-72 md:h-96">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart
                  data={product.history}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 0,
                  }}
                >

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                  />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 8 }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* ===========================
    Price History
=========================== */}

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 overflow-hidden">

            <div className="px-5 lg:px-8 py-5 border-b">

              <h2 className="text-2xl font-bold">

                Price History

              </h2>

              <p className="text-gray-500 mt-1">

                Complete historical prices

              </p>

            </div>

            {/* Desktop Table */}

            <div className="hidden md:block overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="text-left px-6 py-4">

                      Date

                    </th>

                    <th className="text-left px-6 py-4">

                      Price

                    </th>

                    <th className="text-left px-6 py-4">

                      Change

                    </th>

                    <th className="text-left px-6 py-4">

                      Status

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {product.history.map((item, index) => {

                    const previous =
                      product.history[index - 1]?.price ?? item.price;

                    const diff =
                      item.price - previous;

                    return (

                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50 transition"
                      >

                        <td className="px-6 py-4">

                          {item.date}

                        </td>

                        <td className="px-6 py-4 font-semibold">

                          Rs {item.price}

                        </td>

                        <td
                          className={`px-6 py-4 font-semibold ${diff > 0
                            ? "text-green-600"
                            : diff < 0
                              ? "text-red-600"
                              : "text-gray-500"
                            }`}
                        >

                          {diff > 0 && "+"}

                          {diff}

                        </td>

                        <td className="px-6 py-4">

                          {diff > 0 && "🟢 Increased"}

                          {diff < 0 && "🔴 Decreased"}

                          {diff === 0 && "⚪ Stable"}

                        </td>

                      </tr>

                    );

                  })}

                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}

            <div className="md:hidden p-4 space-y-4">

              {product.history.map((item, index) => {

                const previous =
                  history[index - 1]?.price ?? item.price;

                const diff =
                  item.price - previous;

                return (

                  <div
                    key={index}
                    className="rounded-2xl border p-4"
                  >

                    <div className="flex justify-between items-center">

                      <h3 className="font-semibold">

                        {item.date}

                      </h3>

                      <span className="font-bold text-green-700">

                        Rs {item.price}

                      </span>

                    </div>

                    <div className="mt-3">

                      {diff > 0 && (

                        <span className="text-green-600 font-semibold">

                          ▲ +{diff}

                        </span>

                      )}

                      {diff < 0 && (

                        <span className="text-red-600 font-semibold">

                          ▼ {diff}

                        </span>

                      )}

                      {diff === 0 && (

                        <span className="text-gray-600 font-semibold">

                          ● Stable

                        </span>

                      )}

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* ===========================
    Price Analysis
=========================== */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Price Analysis
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              {/* Today's Price */}

              <div className="bg-white rounded-2xl border shadow-sm p-5">

                <p className="text-sm text-gray-500">
                  Today's Price
                </p>

                <h3 className="text-3xl font-bold text-green-700 mt-2">
                  Rs {today}
                </h3>

              </div>

              {/* Yesterday */}

              <div className="bg-white rounded-2xl border shadow-sm p-5">

                <p className="text-sm text-gray-500">
                  Yesterday
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  Rs {yesterday}
                </h3>

              </div>

              {/* Difference */}

              <div className="bg-white rounded-2xl border shadow-sm p-5">

                <p className="text-sm text-gray-500">
                  Difference
                </p>

                <h3
                  className={`text-3xl font-bold mt-2 ${difference > 0
                    ? "text-green-600"
                    : difference < 0
                      ? "text-red-600"
                      : "text-gray-700"
                    }`}
                >
                  {difference > 0 && "+"}
                  Rs {difference}
                </h3>

              </div>

              {/* Percentage */}

              <div className="bg-white rounded-2xl border shadow-sm p-5">

                <p className="text-sm text-gray-500">
                  Percentage Change
                </p>

                <h3
                  className={`text-3xl font-bold mt-2 ${difference > 0
                    ? "text-green-600"
                    : difference < 0
                      ? "text-red-600"
                      : "text-gray-700"
                    }`}
                >
                  {difference > 0 && "+"}
                  {percentage}%
                </h3>

              </div>

            </div>

          </div>

          {/* ===========================
    Market Status
=========================== */}

          <div
            className={`mt-8 rounded-3xl p-6 lg:p-8 text-white shadow-lg ${trend === "up"
              ? "bg-gradient-to-r from-green-600 to-emerald-700"
              : trend === "down"
                ? "bg-gradient-to-r from-red-600 to-rose-700"
                : "bg-gradient-to-r from-gray-600 to-gray-800"
              }`}
          >

            <h2 className="text-2xl lg:text-3xl font-bold">

              Market Status

            </h2>

            <p className="mt-4 text-lg">

              {trend === "up" &&
                `${product.name} has increased by ${percentage}% compared to yesterday.`}

              {trend === "down" &&
                `${product.name} has decreased by ${Math.abs(Number(percentage))}% compared to yesterday.`}

              {trend === "stable" &&
                `${product.name} price has remained stable compared to yesterday.`}

            </p>

          </div>

          {/* ===========================
    Quick Insights
=========================== */}

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 mt-8 p-6 lg:p-8">

            <h2 className="text-2xl font-bold mb-6">
              Quick Insights
            </h2>

            <div className="space-y-4 text-gray-700">

              <p>
                • Current market price is <strong>Rs {today}</strong> per{" "}
                {product.unit}.
              </p>

              <p>
                • Highest recorded price is{" "}
                <strong>Rs {highest}</strong>.
              </p>

              <p>
                • Lowest recorded price is{" "}
                <strong>Rs {lowest}</strong>.
              </p>

              <p>
                • Average price across all available records is{" "}
                <strong>Rs {average}</strong>.
              </p>

              <p>
                • Based on <strong>{records}</strong> historical price
                record{records !== 1 ? "s" : ""}.
              </p>

            </div>

          </div>

          {/* Bottom Navigation */}

          <div className="flex justify-center mt-10">

            <button
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/price-trends", { replace: true });
                }
              }}
              className="bg-green-600 hover:bg-green-700 active:scale-95 transition text-white px-8 py-3 rounded-xl font-semibold"
            >
              ← Back to Price Trends
            </button>

          </div>

        </div>

      </section>

    </MainLayout>

  );

}

export default ProductHistory;