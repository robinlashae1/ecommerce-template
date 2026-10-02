import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { siteConfig } from "../config/site";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      {/* Newsletter */}
      <section className="border-b border-gray-200">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Stay in the loop
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Get updates from {siteConfig.brand.name}.
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
              Sign up for product launches, special offers,
              and occasional updates.
            </p>
          </div>

          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              id="footer-email"
              name="email"
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              required
              className="sm:flex-1"
            />

            <Button
              type="submit"
              size="md"
              className="shrink-0"
            >
              Subscribe
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </div>
      </section>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight"
            >
              {siteConfig.brand.name}
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              {siteConfig.brand.description}
            </p>

                <div className="mt-6 flex items-center gap-2">
                <a
                    href={siteConfig.social.instagram}
                    aria-label="Instagram"
                    className="flex h-9 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-black"
                >
                    Instagram
                </a>

                <a
                    href={siteConfig.social.facebook}
                    aria-label="Facebook"
                    className="flex h-9 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-black"
                >
                    Facebook
                </a>

                <a
                    href={siteConfig.social.tiktok}
                    aria-label="TikTok"
                    className="flex h-9 items-center justify-center rounded-full border border-gray-200 bg-white px-4 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-black"
                >
                    TikTok
                </a>
                </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold">
              Shop
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/shop"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                All Products
              </Link>

              <Link
                to="/shop?sort=newest"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                New Arrivals
              </Link>

              <Link
                to="/collections"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Collections
              </Link>
            </nav>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-sm font-semibold">
              Customer Care
            </h3>

            <nav className="mt-4 flex flex-col gap-3">
              <Link
                to="/cart"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Cart
              </Link>

              <Link
                to="/checkout"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Checkout
              </Link>

              <Link
                to="/"
                className="text-sm text-gray-500 transition-colors hover:text-black"
              >
                Shipping & Returns
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-500">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block transition-colors hover:text-black"
              >
                {siteConfig.contact.email}
              </a>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="block transition-colors hover:text-black"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-gray-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {currentYear} {siteConfig.brand.name}. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link
              to="/"
              className="transition-colors hover:text-black"
            >
              Privacy
            </Link>

            <Link
              to="/"
              className="transition-colors hover:text-black"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}