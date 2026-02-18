import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="group relative bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-red-600">
            {/* Image Container */}
            <Link to={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {product.stock < 5 && product.stock > 0 && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
                        Low Stock
                    </div>
                )}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white font-bold text-xl uppercase tracking-widest border-2 border-white px-4 py-2">Out of Stock</span>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="p-4 text-center">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight mb-2 group-hover:text-red-700 transition-colors">
                    <Link to={`/products/${product.id}`}>
                        {product.name}
                    </Link>
                </h3>
                <div className="text-gray-600 font-medium mb-4">
                    ${product.price.toFixed(2)}
                </div>

                {/* Actions */}
                <div className="flex justify-center gap-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <Link
                        to={`/products/${product.id}`}
                        className="p-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                        title="View Details"
                    >
                        <Eye size={20} />
                    </Link>
                    {product.stock > 0 && onAddToCart && (
                        <button
                            onClick={() => onAddToCart(product)}
                            className="p-2 bg-red-700 text-white hover:bg-red-800 transition-colors"
                            title="Add to Cart"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
