import { generateCategoryPDF } from "../../utils/pdfGenerator";

function ProductActions({ products, category }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => generateCategoryPDF(products, category)}
        className="
          cursor-pointer
          rounded-xl
          bg-green-600
          px-3
          py-1
          text-sm
          text-white
          transition
          hover:bg-green-700
          active:scale-95
          lg:px-5
          lg:py-2
        "
      >
        Print PDF
      </button>
    </div>
  );
}

export default ProductActions;