import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <div className="flex h-full items-center justify-center">
          <span className="text-sm text-gray-400">
            No image available
          </span>
        </div>
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={activeImage}
          alt={`${productName} - image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${productName} image ${index + 1}`}
                aria-pressed={isActive}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                  isActive
                    ? "ring-2 ring-black ring-offset-2"
                    : "opacity-70 transition-opacity hover:opacity-100"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}