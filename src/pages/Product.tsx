import { Link, useParams } from "react-router-dom";

import { Button } from "../ui/Button";
import { Price } from "../ecommerce/Price";
import { ProductGallery } from "../ecommerce/ProductGallery";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

export function Product() {
  const { slug } = useParams<{ slug: string }>();

  const { getProductBySlug } = useProducts();
  const { addToCart } = useCart();

  const product = slug
    ? getProductBySlug(slug)
    : undefined;

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            404
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Product not found
          </h1>

          <p className="mt-4 text-gray-600">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block text-sm underline underline-offset-4"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    if (!product.inStock) return;

    addToCart(product);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Product images */}
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        {/* Product information */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="text-sm uppercase tracking-wide text-gray-500">
            {product.category}
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
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

          <p className="mt-8 leading-7 text-gray-600">
            {product.description}
          </p>

          {/* Stock status */}
          <div className="mt-6">
            {product.inStock ? (
              <p className="text-sm font-medium text-green-700">
                In stock
              </p>
            ) : (
              <p className="text-sm font-medium text-red-600">
                Out of stock
              </p>
            )}
          </div>

          {/* Add to cart */}
          <div className="mt-8">
            <Button
              type="button"
              size="lg"
              className="w-full"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              {product.inStock
                ? "Add to Cart"
                : "Out of Stock"}
            </Button>
          </div>

          {/* Product details */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-sm font-medium">
                Tags
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}