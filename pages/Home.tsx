import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, SLIDES } from '../constants';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
    return (
        <div className="bg-neutral-900 text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={SLIDES[0].image}
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 drop-shadow-lg">
                        {SLIDES[0].title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
                        {SLIDES[0].subtitle}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/products"
                            className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-bold uppercase tracking-widest transition-colors duration-300"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">New Arrivals</h2>
                    <div className="w-24 h-1 bg-red-700 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.slice(0, 3).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* News / Info Section */}
            <section className="bg-neutral-800 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold uppercase tracking-widest text-white mb-6">Precision Engineering</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            TİSAŞ Trabzon Gun Industry Corp. has been producing light weaponry since 1993.
                            With NATO standard production capabilities and exports to over 60 countries,
                            we set the standard for reliability and performance.
                        </p>
                        <Link
                            to="/about"
                            className="text-red-500 font-bold uppercase tracking-wider hover:text-red-400 transition-colors"
                        >
                            Read Our Story &rarr;
                        </Link>
                    </div>
                    <div className="relative h-80 rounded-sm overflow-hidden border border-neutral-700 group">
                        <img
                            src="https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop"
                            alt="Factory"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
