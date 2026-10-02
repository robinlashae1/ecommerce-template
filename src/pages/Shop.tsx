import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "../ui/Button";
import { ProductGrid } from "../ecommerce/ProductGrid";
import { products } from "../data/products";

type SortOption =
  | "featured"
  | "newest"
  | "price-low"
  | "price-high"
  | "name";

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort =
    (searchParams.get("sort") as SortOption) ?? "featured";

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category))
    ).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.trim().toLowerCase();

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

    if (category) {
      result = result.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.toLowerCase()
      );
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => {
          const aNew = a.tags?.includes("new") ? 1 : 0;
          const bNew = b.tags?.includes("new") ? 1 : 0;
          return bNew - aNew;
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

  const hasFilters = Boolean(search || category);

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  const updateCategory = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const updateSort = (value: SortOption) => {
    const params = new URLSearchParams(searchParams);

    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <main>
      {/* Page header */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            Shop
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            All products
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
            Explore our complete collection of thoughtfully
            designed products.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  updateSearch(event.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-black"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-black"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <SlidersHorizontal
                size={17}
                className="text-gray-400"
              />

              <label
                htmlFor="sort"
                className="text-sm text-gray-500"
              >
                Sort by
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(event) =>
                  updateSort(
                    event.target.value as SortOption
                  )
                }
                className="rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => updateCategory("")}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                  !category
                    ? "border-black bg-black text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black",
                ].join(" ")}
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
                    onClick={() => updateCategory(item)}
                    className={[
                      "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black",
                    ].join(" ")}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "product"
              : "products"}
          </p>

          {hasFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500"
            >
              Clear filters
              <X size={15} className="ml-2" />
            </Button>
          )}
        </div>

        <ProductGrid
          products={filteredProducts}
          columns={4}
          showQuickAdd
          emptyMessage="No products match your current filters."
        />
      </section>
    </main>
  );
}