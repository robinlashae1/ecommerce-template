import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import { useCart } from "../hooks/useCart";
import { siteConfig } from "../config/site";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { itemCount } = useCart();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) =>
    [
      "text-sm transition-colors",
      isActive
        ? "font-medium text-black"
        : "text-gray-600 hover:text-black",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-lg font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Link
            to="/shop"
            aria-label="Search products"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <Search size={19} />
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Cart with ${itemCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          >
            <ShoppingBag size={19} />

            {itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-medium text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 md:hidden"
          >
            {isMenuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {siteConfig.navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "border-b border-gray-100 px-2 py-4 text-sm",
                    isActive
                      ? "font-medium text-black"
                      : "text-gray-600",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-between px-2 py-4 text-sm"
            >
              <span>Cart</span>

              {itemCount > 0 && (
                <span className="rounded-full bg-black px-2 py-1 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}