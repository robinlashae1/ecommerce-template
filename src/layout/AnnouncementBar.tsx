import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({
  message = "Free shipping on orders over $100",
  linkText = "Shop now",
  linkHref = "/shop",
  dismissible = true,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-black text-white">
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center px-10 py-2 sm:px-12">
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs sm:text-sm">
          <span>{message}</span>

          {linkText && linkHref && (
            <a
              href={linkHref}
              className="inline-flex items-center gap-1 font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              {linkText}
              <ArrowRight size={13} />
            </a>
          )}
        </div>
      </div>

      {dismissible && (
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-white/10 sm:right-6"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}