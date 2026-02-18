import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import ProductCard from '../components/ProductCard';

const Catalog: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            {/* Header */}
            <div className="bg-neutral-900 text-white py-12 mb-10">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl font-bold uppercase tracking-widest mb-4">Product Catalog</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Browse our extensive collection of precision firearms and tactical equipment.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-white p-6 border border-gray-200 sticky top-24">
                        <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Categories</h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map(category => (
                                <li key={category}>
                                    <button
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left py-2 px-3 transition-colors ${selectedCategory === category
                                                ? 'bg-red-700 text-white font-bold'
                                                : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold uppercase tracking-wider mb-4 border-b pb-2">Search</h3>
                            <input
                                type="text"
                                placeholder="Search models..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 focus:border-red-700 focus:outline-none"
                            />
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-500 font-medium">Showing {filteredProducts.length} results</span>
                        {/* Sorting could go here */}
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white border border-gray-200">
                            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                            <button
                                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                                className="mt-4 text-red-700 font-bold hover:underline"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Catalog;
