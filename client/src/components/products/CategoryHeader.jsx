import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaCarrot,
    FaAppleAlt,
    FaSeedling,
    FaDrumstickBite,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSiteSettings } from "../../data/SiteSettings";
import ProductActions from "./ProductActions";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryService";

function CategoryHeader({ category, products }) {
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);

    const [siteSettings, setSiteSettings] = useState({
        lastUpdated: "",
        verified: false,
    });

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const categories = await getCategories();

                const currentCategory = categories.find(
                    (cat) =>
                        cat.name.toLowerCase().replace(/\s+/g, "-") ===
                        category.toLowerCase()
                );

                setInfo(currentCategory);
            } catch (error) {
                console.error(error);
            }
        };

        loadCategory();
    }, [category]);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await getSiteSettings();
                setSiteSettings(data);
            } catch (error) {
                console.error("Failed to load site settings:", error);
            }
        };

        loadSettings();
    }, []);

    if (!info) {
        return null;
    }

    return (

        <div className="mb-8">
            <div className="w-full flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm cursor-pointer rounded-xl bg-green-600 px-3 py-1 lg:py-2 text-white transition hover:bg-green-700 active:scale-95 lg:px-5"
                >
                    <FaArrowLeft />
                    Back
                </button>
                <ProductActions
                    products={products}
                    category={category}
                />
            </div>


            <div className="flex flex-col w-full items-center">
                <div className="my-6 flex items-center gap-4">

                    <div className="md:text-5xl text-green-600 text-3xl">
                        {info.icon}
                    </div>

                    <div className="flex flex-nowrap gap-4 justify-center items-center">

                        <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                            {info.name}
                        </h1>

                        <p className="text-gray-500 font-bold text-xl">
                            {info.urdu}
                        </p>

                    </div>
                </div>
                <div className="my-3 animate-bounce">
                    <p className="text-sm font-medium text-gray-500">
                        📅 Last Updated<span className="ml-2 font-bold text-green-700">{" "}
                            {siteSettings.lastUpdated
                                ? new Date(siteSettings.lastUpdated).toLocaleDateString()
                                : "Loading..."}</span>
                    </p>
                </div>
            </div>

        </div>

    );
}

export default CategoryHeader;