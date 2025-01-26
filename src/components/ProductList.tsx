import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "../data/products";
import { ArrowUpDown } from "lucide-react";
import { Product } from "../types";

// Get unique categories from products
const categories = Array.from(
  new Set(products.map((product) => product.category))
);

const ITEMS_PER_PAGE = 10;

export function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory
    )
    .sort((a, b) => {
      const priceA = parseFloat(a.price.replace("$", ""));
      const priceB = parseFloat(b.price.replace("$", ""));
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Number of visible pages around the current page
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfVisiblePages);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-end">
        {/* Category Select */}
        <div className="w-full sm:flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1); // Reset to first page when filter changes
            }}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-sm sm:text-base"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Button */}
        <button
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Price {sortOrder === "asc" ? "Low to High" : "High to Low"}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.details["Product#"]}
            product={product as Product}
            productId={product.details["Product#"]}
          />
        ))}
      </div>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {generatePageNumbers().map((page, index) =>
              page === "..." ? (
                <span key={index} className="px-4 py-2 text-gray-700">
                  ...
                </span>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page as number)}
                  className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    currentPage === page
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
