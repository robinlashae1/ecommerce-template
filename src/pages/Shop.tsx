import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { products } from "../data/products";
import { ProductGrid } from "../ecommerce/ProductGrid";
import { Button } from "../ui/Button";

type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "name";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "all";
  const sort = (searchParams.get("sort") ??
    "featured") as SortOption;

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    );
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags?.some((tag) =>
            tag.toLowerCase().includes(query)
          )
        );
      });
    }

    // Category
    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.toLowerCase()
      );
    }

    // Sorting
    switch (sort) {
      case "newest":
        result.sort((a, b) => {
          const aIsNew = a.tags?.includes("new") ? 1 : 0;
          const bIsNew = b.tags?.includes("new") ? 1 : 0;

          return bIsNew - aIsNew;
        });
        break;

      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
      default:
        result.sort((a, b) => {
          const aFeatured = a.featured ? 1 : 0;
          const bFeatured = b.featured ? 1 : 0;

          return bFeatured - aFeatured;
        });
        break;
    }

    return result;
  }, [search, category, sort]);

  const updateSearchParam = (
    key: string,
    value: string
  ) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value === "all" || value === "") {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    setSearchParams(nextParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters =
    search !== "" ||
    category !== "all" ||
    sort !== "featured";

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Shop
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            All products
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-500">
            Explore our collection of thoughtfully designed
            products made for everyday life.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() =>
                  updateSearchParam("category", "all")
                }
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === "all"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>

              {categories.map((item) => {
                const isActive =
                  category.toLowerCase() ===
                  item.toLowerCase();

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() =>
                      updateSearchParam("category", item)
                    }
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Sort */}
            <div className="relative shrink-0">
              <label
                htmlFor="sort"
                className="sr-only"
              >
                Sort products
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(event) =>
                  updateSearchParam(
                    "sort",
                    event.target.value
                  )
                }
                className="appearance-none rounded-full border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-sm font-medium outline-none focus:border-black"
              >
                <option value="featured">
                  Featured
                </option>
                <option value="newest">
                  Newest
                </option>
                <option value="price-low">
                  Price: Low to high
                </option>
                <option value="price-high">
                  Price: High to low
                </option>
                <option value="name">
                  Name
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
        {/* Search + result count */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "product"
                : "products"}
            </p>

            {search && (
              <p className="mt-1 text-sm">
                Results for{" "}
                <span className="font-medium">
                  "{search}"
                </span>
              </p>
            )}
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-2 self-start text-sm font-medium text-gray-600 hover:text-black sm:self-auto"
            >
              <X size={15} />
              Clear filters
            </button>
          )}
        </div>

        <ProductGrid
          products={filteredProducts}
          columns={4}
          emptyMessage="No products match your current filters."
        />
      </section>

      {/* Optional mobile/filter footer */}
      <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 lg:hidden">
        <Link to="/shop">
          <Button
            variant="secondary"
            className="gap-2 rounded-full px-5 shadow-lg"
          >
            <SlidersHorizontal size={16} />
            Browse all products
          </Button>
        </Link>
      </div>
    </main>
  );
}