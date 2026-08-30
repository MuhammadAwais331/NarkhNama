import { useState, useRef, useEffect } from "react";
import { getProducts } from "../../services/productService";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

function SearchProduct() {
  const [search, setSearch] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);
  // ==========================
  // Search Function
  // ==========================
  const searchProduct = (value = search) => {
    const keyword = value.trim().toLowerCase();

    if (!keyword) return;

    // First search product
    const product = products.find((item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.urdu?.includes(value.trim())
    );

    if (product) {
      navigate(
        `/category/${product.category.name.toLowerCase()}`,
        {
          replace: location.pathname.startsWith("/category"),
          state: {
            productId: product._id,
          },
        }
      );

      setSearch("");
      return;
    }

    // If product not found, search category
    const category = products.find((item) =>
      item.category.name.toLowerCase().includes(keyword)
    );

    if (category) {
      navigate(
        `/category/${category.category.name.toLowerCase()}`
      );

      setSearch("");
      return;
    }

    toast.error(`موجود نہیں ہے "${value}"`);
    setSearch("");
  };

  // ==========================
  // Voice Search
  // ==========================
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setSearch(transcript);

      searchProduct(transcript);
    };

    recognition.onerror = (event) => {
      alert("Speech Error: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="
          flex
          items-center
          rounded-2xl
          border
          bg-white
          px-4
          py-2
          shadow-lg
          transition-all
          duration-300
          focus-within:border-green-600
        "
      >
        {/* Search Button */}
        <button
          onClick={() => searchProduct()}
          className="mr-3 text-lg text-gray-400 transition hover:text-green-600 active:scale-90"
        >
          <FaSearch />
        </button>

        {/* Search Input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchProduct();
            }
          }}
          placeholder="Search product..."
          className="
            w-full
            bg-transparent
            text-gray-700
            placeholder:text-gray-400
            focus:outline-none
          "
        />

        {/* Voice Button */}
        <button
          onClick={startListening}
          className={`
            ml-2
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            ${listening
              ? "animate-pulse bg-red-500 text-white"
              : "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
            }
          `}
        >
          {listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
    </div>
  );
}

export default SearchProduct;