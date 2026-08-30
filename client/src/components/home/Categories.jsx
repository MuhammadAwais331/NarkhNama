import {
  FaCarrot,
  FaAppleAlt,
  FaSeedling,
  FaDrumstickBite,
} from "react-icons/fa";

import CategoryCard from "./CategoryCard";
import { useEffect, useState } from "react";
import { getSiteSettings } from "../../data/SiteSettings";
import { getCategories } from "../../services/categoryService";

function Categories() {

  const [categories, setCategories] = useState([]);

  const [siteSettings, setSiteSettings] = useState({
    lastUpdated: "",
    verified: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [settings, categoriesData] = await Promise.all([
          getSiteSettings(),
          getCategories(),
        ]);

        setSiteSettings(settings);

        // Only show active categories
        setCategories(
          categoriesData.filter(
            (category) => category.status === "Active"
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <section
      id="categories"
      className="bg-gray-50 py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">

          <div className="flex items-center justify-between mb-10">
            {/* Government Badge */}
            <div className="rounded-full bg-green-100 px-2 py-2 text-xs font-semibold text-green-700 lg:text-sm">
              ✓ Govt Verified
            </div>

            {/* Last Updated */}
            <div className="text-xs bg-green-100 text-green-600 px-2 py-2 rounded-full font-bold lg:text-sm ">
              <p className="animate-bounce">
                📅{" "}
                {siteSettings.lastUpdated
                  ? new Date(siteSettings.lastUpdated).toLocaleDateString()
                  : "Loading..."}
              </p>
            </div>
          </div>


          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
            آج کے سرکاری نرخ
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-600 sm:text-base">
            Choose a category to view today's official prices.
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-5
            lg:grid-cols-4
          "
        >
          {categories.map((category) => (
            <CategoryCard
              key={category._id}
              title={category.name}
              urdu={category.urdu}
              icon={category.icon}
              slug={category.name.toLowerCase()}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;