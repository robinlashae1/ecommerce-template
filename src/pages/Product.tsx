import {
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { AddToCart } from "../ecommerce/AddToCart";
import { Price } from "../ecommerce/Price";
import { ProductGallery } from "../ecommerce/ProductGallery";
import { ProductGrid } from "../ecommerce/ProductGrid";
import { useProducts } from "../hooks/useProducts";

export function Product() {
  const { slug } = useParams<{ slug: string }>();
  const { getProductBySlug, getProductsByCategory } =
    useProducts();

  const product = slug
    ? getProductBySlug(slug)
    : undefined;

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
            404
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Product not found
          </h1>

          <p className="mt-4 text-gray-500">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = getProductsByCategory(
    product.category
  ).filter((item) => item.id !== product.id);

  return (
    <main>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-gray-500"
        >
          <Link
            to="/shop"
            className="transition-colors hover:text-black"
          >
            Shop
          </Link>

          <span>/</span>

          <Link
            to={`/shop?category=${encodeURIComponent(
              product.category
            )}`}
            className="transition-colors hover:text-black"
          >
            {product.category}
          </Link>

          <span>/</span>

          <span className="truncate text-gray-900">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Product information */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-wrap gap-2">
              {product.tags?.includes("new") && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  New
                </span>
              )}

              {product.tags?.includes("bestseller") && (
                <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                  Bestseller
                </span>
              )}

              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    Sale
                  </span>
                )}
            </div>

            <p className="mt-5 text-sm uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5">
              <Price
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                size="lg"
                showSaleBadge
              />
            </div>

            <p className="mt-6 text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2">
              {product.inStock ? (
                <>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                    <Check
                      size={13}
                      className="text-green-700"
                    />
                  </span>

                  <span className="text-sm font-medium text-green-700">
                    In stock and ready to ship
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500" />

                  <span className="text-sm font-medium text-red-600">
                    Currently out of stock
                  </span>
                </>
              )}
            </div>

            {/* Add to cart */}
            <div className="mt-8">
              <AddToCart product={product} />
            </div>

            {/* Benefits */}
            <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
              <div className="flex gap-4 py-5">
                <Truck
                  size={20}
                  className="mt-0.5 shrink-0 text-gray-500"
                />

                <div>
                  <p className="text-sm font-medium">
                    Fast shipping
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Orders typically ship within 1–3 business
                    days.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 py-5">
                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-gray-500"
                />

                <div>
                  <p className="text-sm font-medium">
                    Secure checkout
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your payment and personal information are
                    protected.
                  </p>
                </div>
              </div>
            </div>

            {/* Product details */}
            <div className="mt-8">
              <details
                open
                className="group border-b border-gray-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium">
                  Product Details

                  <ChevronDown
                    size={18}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>

                <div className="pb-5 text-sm leading-7 text-gray-600">
                  <p>{product.description}</p>

                  {product.tags &&
                    product.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </div>
              </details>

              <details className="group border-b border-gray-200">
                <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-sm font-medium">
                  Shipping & Returns

                  <ChevronDown
                    size={18}
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>

                <div className="pb-5 text-sm leading-7 text-gray-600">
                  <p>
                    Free shipping is available on qualifying
                    orders. Returns are accepted according to
                    the store's return policy.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
                You may also like
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                More from {product.category}
              </h2>
            </div>

            <ProductGrid
              products={relatedProducts.slice(0, 4)}
              columns={4}
            />
          </div>
        </section>
      )}
    </main>
  );
}