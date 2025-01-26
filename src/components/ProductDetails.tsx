import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";

export function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((p) => p.details["Product#"] === productId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Return to products
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.details.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.details.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Carousel */}
        <div className="relative">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img
              src={product.details.images[currentImageIndex]}
              alt={`${product.name} - View ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {product.details.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          {product.details.images.length > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              {product.details.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                    currentImageIndex === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.details.name}
            </h1>
            <div className="flex items-center mb-4">
              {/* Enhanced Price Handling */}
              <span className="text-2xl font-bold text-blue-600">
                {Math.round(
                  Number(
                    product.details.price
                      .replace("$", "") // Remove the dollar sign
                      .replace(",", "") // Remove commas
                  ) * 100
                )}{" "}
                EGP
              </span>
            </div>
            <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {/* <div className="prose max-w-none mb-8">
    <h2 className="text-xl font-semibold mb-2">Description</h2>
    <p className="text-gray-700 whitespace-pre-line">{product.details.description}</p>
  </div> */}

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Specifications</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {product.details.Brand && (
                <div>
                  <dt className="text-gray-600">Brand</dt>
                  <dd className="font-medium text-gray-900">
                    {product.details.Brand}
                  </dd>
                </div>
              )}
              {product.details["Product#"] && (
                <div>
                  <dt className="text-gray-600">Product #</dt>
                  <dd className="font-medium text-gray-900">
                    {product.details["Product#"]}
                  </dd>
                </div>
              )}
              {product.details["Volts:"] && (
                <div>
                  <dt className="text-gray-600">Volts</dt>
                  <dd className="font-medium text-gray-900">
                    {product.details["Volts:"]}
                  </dd>
                </div>
              )}
              {product.details["Amps:"] && (
                <div>
                  <dt className="text-gray-600">Amps</dt>
                  <dd className="font-medium text-gray-900">
                    {product.details["Amps:"]}
                  </dd>
                </div>
              )}
              {product.details["Regulator:"] && (
                <div>
                  <dt className="text-gray-600">Regulator</dt>
                  <dd className="font-medium text-gray-900">
                    {product.details["Regulator:"]}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
