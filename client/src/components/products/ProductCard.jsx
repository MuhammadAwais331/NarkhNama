
function ProductCard({ product }) {

  return (
    <div  id={`product-${product._id}`}
      className="
        group
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-3
        sm:p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-green-600
        hover:shadow-lg
        active:scale-95
      "
    >
      {/* Top */}
      <div className="flex items-center justify-between">
        <div className="text-1xl text-green-600 sm:text-2xl font-bold">
          {product.icon || "📦"}          
        </div>

        <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700 sm:px-3 sm:text-xs">
          ✓ Govt
        </span>
      </div>

      {/* Name */}
      <div className="mt-4 flex gap-2 items-center">
        <h3 className="text-sm font-bold text-gray-900 sm:text-lg">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500 sm:text-base font-bold">
          {product.urdu}
        </p>
      </div>

      {/* Price */}
      <div className="mt-3">
        <p className="text-[11px] text-gray-500 sm:text-sm">
          Government Price
        </p>

        <h2 className="mt-1 text-xl font-extrabold text-green-700 sm:text-3xl">
          Rs {product.price}
        </h2>
      </div>

      {/* Unit */}
      <div className="mt-3 flex justify-end">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          ⚖ {product.unit}
        </span>
      </div>
    </div>
  );
}

export default ProductCard;