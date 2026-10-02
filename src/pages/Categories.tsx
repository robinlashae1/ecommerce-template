import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { categories } from "../data/categories";

export default function Categories() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Collections
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Shop by category
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
            Explore our collections and find products made
            for your everyday life.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {categories.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center rounded-2xl bg-gray-50">
            <p className="text-sm text-gray-500">
              No categories available.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${encodeURIComponent(
                  category.name
                )}`}
                className="group"
              >
                <article>
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="text-sm text-gray-400">
                          {category.name}
                        </span>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                    {/* Arrow */}
                    <div className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                      <ArrowRight size={18} />
                    </div>
                  </div>

                  {/* Category name */}
                  <div className="mt-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium">
                      {category.name}
                    </h2>

                    <span className="text-sm text-gray-500 transition-colors group-hover:text-black">
                      Shop now
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}