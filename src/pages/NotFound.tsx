import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

import { Button } from "../ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-xl text-center">
        {/* 404 */}
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
          Error 404
        </p>

        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          Page not found
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-7 text-gray-500">
          Sorry, we couldn't find the page you're looking for.
          It may have been moved, removed, or the URL may be
          incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home size={17} className="mr-2" />
              Back home
            </Button>
          </Link>

          <Link to="/shop">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Search size={17} className="mr-2" />
              Browse products
            </Button>
          </Link>
        </div>

        {/* Back button */}
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
        >
          <ArrowLeft size={15} />
          Go back
        </button>
      </div>
    </main>
  );
}