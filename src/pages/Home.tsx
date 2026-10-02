import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/Button";
import { ProductGrid } from "../ecommerce/ProductGrid";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { featuredProducts } = useProducts();

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-100">
        <div className="mx-auto grid min-h-[70vh] max-w-7xl items-center px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <Sparkles size={14} />
              New collection
            </div>

            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl">
              Designed for everyday life.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Discover our latest collection of timeless,
              thoughtfully designed products made for the way
              you live.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Shop Collection
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>

              <Link to="/collections">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero visual placeholder */}
          <div className="mt-12 lg:mt-0 lg:pl-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300" />

              <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-500">
                    Your brand
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-800">
                    Hero Image
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Replace this area with your campaign image.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Popular products
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
              A selection of customer favorites from our
              collection.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-black"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          columns={4}
        />
      </section>

      {/* Brand statement */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Made with intention
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple products. Thoughtful details.
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600">
            We believe everyday products should be useful,
            beautiful, and built to last. Explore a collection
            designed around quality, simplicity, and everyday
            living.
          </p>

          <div className="mt-8">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Explore our collections
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-3xl bg-black px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
            Start exploring
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Find something you'll love.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
            Browse the complete collection and discover your
            next everyday favorite.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Shop All Products
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}