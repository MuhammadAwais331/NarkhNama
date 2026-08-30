import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import HeroSlider from "../../components/home/HeroSlider";
import SearchProduct from "../../components/common/SearchProduct";
import Categories from "../../components/home/Categories";
import { scrollToSection } from "../../components/common/ScrollToSection";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.section) {
      setTimeout(() => {
        scrollToSection(location.state.section);

        navigate(location.pathname, {
          replace: true,
          state: {},
        });
      }, 100);
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <MainLayout>
      <section
        id="hero"
        className="relative min-h-[90vh] overflow-hidden text-white px-3"
      >
        {/* Background Slider */}
        <HeroSlider />

        {/* Content */}
        <div className="relative z-10 flex min-h-[78vh] flex-col">

          {/* Top Notice */}
          <div className="pt-6 mt-5 text-center text-xs font-bold tracking-wide text-green-200">
            <span className="mr-2 inline-block animate-phone">
              <FaPhoneAlt className="inline text-sm text-white" />
            </span>

            Found overpricing? Call:
            <span className="text-white"> 09XX-XXXXXXX</span>
          </div>

          {/* Hero Content */}
          <div className="mx-auto flex flex-1 max-w-7xl flex-col items-center justify-center text-center sm:px-6 lg:px-8">

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Welcome to Narkh Nama
            </h1>

            <p className="mt-5 max-w-3xl text-base text-white sm:text-lg lg:text-xl">
              <span className="font-bold">نرخ نامہ</span> آپ کو روزانہ کی بنیاد پر
              ضروری اشیاء کے سرکاری نرخ فراہم کرتا ہے تاکہ آپ شفاف، درست اور
              قابلِ اعتماد معلومات تک آسانی سے رسائی حاصل کر سکیں۔
            </p>

            <div className="mt-8 flex  gap-10 sm:flex-row">
              <button
                onClick={() => scrollToSection("categories")}
                className="cursor-pointer rounded-lg bg-green-300/50 px-2 py-2 font-semibold text-white transition hover:bg-green-400 active:scale-95"
              >
                Today's Prices
              </button>

              <button
                onClick={() => navigate("/price-trends")}
                className="cursor-pointer rounded-lg bg-green-300/50 px-2 py-2 font-semibold text-white transition hover:bg-green-400 active:scale-95"
              >
                Price Trends
              </button>
            </div>
            <div className="relative mt-15">
              <SearchProduct />
            </div>
          </div>

          {/* Search */}


        </div>
      </section>

      <Categories />
    </MainLayout>
  );
}

export default Home;