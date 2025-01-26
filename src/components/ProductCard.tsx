import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  productId: string;
}

export function ProductCard({ product, productId }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${productId}`} className="block">
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
            {product.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">{Math.round(Number(product.price.split('$')[1])) * 100} EGP</span>
          </div>
        </div>
      </Link>
    </div>
  );
}