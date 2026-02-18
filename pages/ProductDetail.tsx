import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { ShoppingCart, Check, AlertTriangle } from 'lucide-react';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = useMemo(() => PRODUCTS.find(p => p.id === Number(id)), [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Link to="/products" className="text-red-700 hover:underline">Back to Catalog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4 px-6 border-b border-gray-200">
                <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500 uppercase tracking-wider">
                    <Link to="/" className="hover:text-red-700">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-red-700">Catalog</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-bold">{product.name}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Image */}
                <div className="bg-gray-50 border border-gray-200 p-8 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-[500px] w-auto object-contain drop-shadow-xl"
                    />
                </div>

                {/* Right Column: Details */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-tight mb-2">{product.name}</h1>
                    <div className="text-sm text-gray-500 uppercase tracking-widest mb-6">{product.category}</div>

                    <div className="text-3xl font-bold text-red-700 mb-6">
                        ${product.price.toFixed(2)}
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                        {product.description}
                    </p>

                    <div className="bg-gray-50 p-6 border border-gray-100 mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 border-b pb-2">Technical Specifications</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <div key={key} className="flex justify-between border-b border-gray-200 py-1">
                                    <span className="text-gray-500 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <span className="text-gray-900 font-bold">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        {product.stock > 0 ? (
                            <div className="flex items-center text-green-700 font-bold text-sm uppercase tracking-wider">
                                <Check size={18} className="mr-2" /> In Stock ({product.stock} Available)
                            </div>
                        ) : (
                            <div className="flex items-center text-red-600 font-bold text-sm uppercase tracking-wider">
                                <AlertTriangle size={18} className="mr-2" /> Out of Stock
                            </div>
                        )}
                        {product.stock < 5 && product.stock > 0 && (
                            <div className="text-orange-600 font-bold text-sm uppercase tracking-wider">
                                Low Stock
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            disabled={product.stock === 0}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold uppercase tracking-widest transition-colors ${product.stock > 0
                                    ? 'bg-red-700 text-white hover:bg-red-800'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                        <button className="px-6 py-4 border border-gray-300 hover:bg-gray-50 font-bold uppercase tracking-widest text-gray-700">
                            Find Dealer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
