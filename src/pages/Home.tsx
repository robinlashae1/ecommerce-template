import { Link } from "react-router-dom";

import { Button } from "../ui/Button";
import { ProductGrid } from "../ecommerce/ProductGrid";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { featuredProducts } = useProducts();

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center bg-gray-100 px-6 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.2em]">
            New Collection
          </p>

          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Designed for everyday life.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-gray-600">
            Discover our latest collection of timeless,
            thoughtfully designed products.
          </p>

          <div className="mt-8">
            <Link to="/shop">
              <Button size="lg">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-semibold">
              Popular products
            </h2>
          </div>

          <Link
            to="/shop"
            className="text-sm underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          columns={4}
          showQuickAdd
        />
      </section>
    </main>
  );
}