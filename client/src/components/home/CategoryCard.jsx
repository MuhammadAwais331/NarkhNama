import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CategoryCard({ title, urdu, icon, slug }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        setTimeout(() => {
          navigate(
            `/category/${slug
              .toLowerCase()
              .replace(/\s+/g, "-")}`
          );
        }, 200);
      }}
      className="
        group
        w-full
        cursor-pointer
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-green-600
        hover:shadow-lg
        
        active:scale-95
        active:bg-green-50
        active:border-green-600
        active:shadow-md

        focus:outline-none
        focus:ring-2
        focus:ring-green-500
        focus:ring-offset-2
      "
    >
      <div className="mb-4 text-5xl">
        {icon}
      </div>

      <h3 className="text-lg font-bold text-gray-800">
        {title}
      </h3>

      <p className="mt-1 text-gray-500 font-bold">
        {urdu}
      </p>

      <div className="mt-5 flex items-center gap-2 text-green-600 whitespace-nowrap text-sm">
        View Products
        <FaChevronRight className="transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
}

export default CategoryCard;