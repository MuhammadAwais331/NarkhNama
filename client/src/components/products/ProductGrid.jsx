import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          No Products Found
        </h2>

        <p className="mt-2 text-gray-500">
          No products are available in this category.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-2
        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;