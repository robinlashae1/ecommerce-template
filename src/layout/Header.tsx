import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu } from "lucide-react";
import { siteConfig } from "../config/site";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        
        <button
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <Link
          to="/"
          className="text-xl font-bold tracking-tight"
        >
          {siteConfig.brand.name}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm hover:opacity-60"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search">
            <Search size={20} />
          </button>

          <Link
            to="/cart"
            aria-label="Shopping cart"
          >
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}