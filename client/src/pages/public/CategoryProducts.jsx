import { useParams, useLocation } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import { useState, useEffect } from "react";

import { getProducts } from "../../services/productService";
import CategoryHeader from "../../components/products/CategoryHeader";
import SearchProduct from "../../components/common/SearchProduct";
import ProductGrid from "../../components/products/ProductGrid";

// import ScrollToTop from "../../components/common/ScrollToTop"
function CategoryProducts() {

  const [products, setProducts] = useState([]);

  const location = useLocation();
  const { categoryName } = useParams();

  const filteredProducts = products.filter((product) => {
    return (
      product.category?.name
        ?.toLowerCase()
        .replace(/\s+/g, "-") ===
      categoryName.toLowerCase()
    );
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();

        setProducts(response.data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const productId = location.state?.productId;

    if (!productId) return;

    // Wait until ProductGrid has rendered
    setTimeout(() => {
      const element = document.getElementById(`product-${productId}`);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.classList.add(
          "ring-4",
          "ring-green-500",
          "ring-offset-2"
        );

        setTimeout(() => {
          element.classList.remove(
            "ring-4",
            "ring-green-500",
            "ring-offset-2"
          );
        }, 2500);
      }
    }, 100);
  }, [location]);

  return (
    <MainLayout>
      {/* <ScrollToTop /> */}
      <section className="bg-gray-50 pt-3 pb-10 lg:py-10">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <CategoryHeader category={categoryName} products={filteredProducts} />
          <div className="mb-5 lg:mb-8">
            <SearchProduct />
          </div>


          <ProductGrid products={filteredProducts} />
        </div>

      </section>

    </MainLayout>
  );
}

export default CategoryProducts;