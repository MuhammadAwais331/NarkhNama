import { useMemo, useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

import {
    FaArrowTrendUp,
    FaArrowTrendDown,
} from "react-icons/fa6";

import {
    MdTrendingFlat,
    MdSearch,
} from "react-icons/md";
// import ScrollToTop from "../../components/common/ScrollToTop";
import { getPriceTrends } from "../../services/priceService";

function PriceTrends() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPrices = async () => {

            try {

                const data = await getPriceTrends();

                setProducts(data);

            }
            catch (error) {

                console.log(error);

            }
            finally {

                setLoading(false);

            }

        };


        fetchPrices();

    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "all"
                    ? true
                    : product.category === category;

            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    const summary = useMemo(() => {
        let increased = 0;
        let decreased = 0;
        let stable = 0;

        filteredProducts.forEach((product) => {
            const history = product.history || [];

            const today =
                history.length > 0
                    ? history.at(-1).price
                    : product.price;

            const yesterday =
                history.length > 1
                    ? history.at(-2).price
                    : product.price;

            if (today > yesterday) increased++;
            else if (today < yesterday) decreased++;
            else stable++;
        });

        if (loading) {

            return (
                <MainLayout>

                    <div className="min-h-screen flex items-center justify-center">

                        <h2 className="text-xl font-semibold text-green-700">
                            Loading prices...
                        </h2>

                    </div>

                </MainLayout>
            );

        }

        return {
            increased,
            decreased,
            stable,
        };
    }, [filteredProducts]);

    const categories = useMemo(() => {
        return [
            "all",
            ...new Set(products.map(product => product.category))
        ];
    }, [products]);

    return (
        <MainLayout>
            {/* <ScrollToTop /> */}
            <section className="min-h-screen bg-gray-50">

                <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">

                    {/* Hero */}

                    <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 md:p-10 shadow-xl mb-8">

                        <h1 className="text-3xl md:text-5xl font-bold">

                            Market Price Trends

                        </h1>

                        <p className="mt-3 text-green-100 max-w-3xl">

                            Monitor daily market prices, compare today's and yesterday's
                            prices, and quickly identify products with increasing,
                            decreasing, or stable prices.

                        </p>

                    </div>

                    {/* Summary */}

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">

                        {/* Increased */}

                        <div className="rounded-2xl bg-gradient-to-r from-green-500 to-green-700 text-white p-4 md:p-6 shadow-lg">

                            <FaArrowTrendUp className="text-3xl md:text-4xl mb-3" />

                            <h2 className="text-3xl md:text-4xl font-bold">

                                {summary.increased}

                            </h2>

                            <p className="mt-2 text-xs md:text-base">

                                Items Increased

                            </p>

                        </div>

                        {/* Decreased */}

                        <div className="rounded-2xl bg-gradient-to-r from-red-500 to-red-700 text-white p-4 md:p-6 shadow-lg">

                            <FaArrowTrendDown className="text-3xl md:text-4xl mb-3" />

                            <h2 className="text-3xl md:text-4xl font-bold">

                                {summary.decreased}

                            </h2>

                            <p className="mt-2 text-xs md:text-base">

                                Items Decreased

                            </p>

                        </div>

                        {/* Stable */}

                        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 md:p-6 shadow-lg">

                            <MdTrendingFlat className="text-3xl md:text-4xl mb-3" />

                            <h2 className="text-3xl md:text-4xl font-bold">

                                {summary.stable}

                            </h2>

                            <p className="mt-2 text-xs md:text-base">

                                Stable Items

                            </p>

                        </div>

                    </div>

                    {/* Search + Filter */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">

                        <div className="flex flex-col lg:flex-row gap-4">

                            <div className="relative flex-1">

                                <MdSearch
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                                />

                                <input
                                    type="text"
                                    placeholder="Search product..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 bg-white pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                                />

                            </div>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="rounded-xl border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === "all"
                                            ? "All Categories"
                                            : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </option>
                                ))}
                            </select>

                        </div>

                    </div>

                    {/* Product Count */}

                    <div className="flex justify-between items-center mb-6">

                        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">

                            Product Trends

                        </h2>

                        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">

                            {filteredProducts.length} Products

                        </span>

                    </div>

                    {/* Product Grid */}

                    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">

                        {filteredProducts.map((product) => {
                            const history = product.history || [];

                            const today = history.at(-1)?.price ?? product.price ?? 0;

                            const yesterday =
                                history.length > 1
                                    ? history[history.length - 2].price
                                    : today;

                            const difference = today - yesterday;

                            const percentage =
                                yesterday === 0
                                    ? 0
                                    : ((difference / yesterday) * 100).toFixed(1);


                            const trend =
                                difference > 0
                                    ? "up"
                                    : difference < 0
                                        ? "down"
                                        : "same";

                            return (
                                <div
                                    key={product._id}
                                    className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      p-3
      sm:p-4
      lg:p-6"
                                >
                                    {/* Header */}

                                    <div className="flex flex-col gap-3">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="
            w-10 h-10
            sm:w-12 sm:h-12
            lg:w-14 lg:h-14
            rounded-full
            bg-green-100
            flex
            items-center
            justify-center
            flex-shrink-0"
                                            >
                                                {product.icon}
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <h2
                                                    className="
              font-bold
              text-xs
              sm:text-sm
              lg:text-lg
              truncate"
                                                >
                                                    {product.name}
                                                </h2>

                                                <p
                                                    className="
              text-gray-500
              text-[11px]
              sm:text-xs
              lg:text-base
              truncate"
                                                >
                                                    {product.urdu}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Trend Badge */}

                                        <div>

                                            {trend === "up" && (
                                                <span
                                                    className="
              inline-flex
              items-center
              bg-green-100
              text-green-700
              px-2
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold"
                                                >
                                                    ▲ +{percentage}%
                                                </span>
                                            )}

                                            {trend === "down" && (
                                                <span
                                                    className="
              inline-flex
              items-center
              bg-red-100
              text-red-700
              px-2
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold"
                                                >
                                                    ▼ {percentage}%
                                                </span>
                                            )}

                                            {trend === "same" && (
                                                <span
                                                    className="
              inline-flex
              items-center
              bg-gray-100
              text-gray-700
              px-2
              py-1
              rounded-full
              text-[10px]
              sm:text-xs
              font-semibold"
                                                >
                                                    Stable
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                    {/* Divider */}

                                    <div className="border-t my-3 lg:my-5"></div>

                                    {/* Price Details */}

                                    <div className="space-y-3">

                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                                            <span className="text-gray-500 text-xs">
                                                Today's Price
                                            </span>

                                            <span className="font-semibold text-xs sm:text-sm lg:text-base">
                                                Rs {today}/{product.unit}
                                            </span>

                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                                            <span className="text-gray-500 text-xs">
                                                Yesterday
                                            </span>

                                            <span className="text-xs sm:text-sm lg:text-base">
                                                Rs {yesterday}/{product.unit}
                                            </span>

                                        </div>

                                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">

                                            <span className="text-gray-500 text-xs">
                                                Difference
                                            </span>

                                            <span
                                                className={`font-semibold text-xs sm:text-sm ${difference > 0
                                                    ? "text-green-600"
                                                    : difference < 0
                                                        ? "text-red-600"
                                                        : "text-gray-600"
                                                    }`}
                                            >
                                                {difference > 0 && "+"}
                                                Rs {difference}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Button */}

                                    <button onClick={() =>
                                        setTimeout(() => {
                                            navigate(`/price-trends/${product._id}`)
                                        }, 100)

                                    }
                                        className="
        mt-5
        w-full
        rounded-xl
        bg-green-600
        hover:bg-green-700
        text-white
        py-2
        lg:py-3
        text-xs
        sm:text-sm
        lg:text-base
        font-semibold
        transition
        active:scale-95"
                                    >
                                        View History
                                    </button>

                                </div>
                            );
                        })}

                    </div>

                </div>

            </section>
        </MainLayout>
    );
}
export default PriceTrends