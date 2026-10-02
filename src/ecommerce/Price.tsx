interface PriceProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  showSaleBadge?: boolean;
  className?: string;
}

export function Price({
  price,
  compareAtPrice,
  size = "md",
  showSaleBadge = false,
  className = "",
}: PriceProps) {
  const isOnSale =
    compareAtPrice !== undefined &&
    compareAtPrice > price;

  const discountPercentage = isOnSale
    ? Math.round(
        ((compareAtPrice - price) / compareAtPrice) * 100
      )
    : 0;

  const sizeStyles = {
    sm: {
      current: "text-sm",
      compare: "text-xs",
      badge: "text-[10px]",
    },
    md: {
      current: "text-base",
      compare: "text-sm",
      badge: "text-xs",
    },
    lg: {
      current: "text-xl font-semibold",
      compare: "text-base",
      badge: "text-xs",
    },
  };

  const styles = sizeStyles[size];

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className}`}
    >
      {/* Current price */}
      <span
        className={`font-medium ${styles.current} ${
          isOnSale ? "text-red-600" : "text-black"
        }`}
      >
        ${price.toFixed(2)}
      </span>

      {/* Original price */}
      {isOnSale && (
        <span
          className={`text-gray-400 line-through ${styles.compare}`}
        >
          ${compareAtPrice.toFixed(2)}
        </span>
      )}

      {/* Sale percentage */}
      {isOnSale && showSaleBadge && (
        <span
          className={`rounded-full bg-red-100 px-2 py-1 font-medium text-red-700 ${styles.badge}`}
        >
          -{discountPercentage}%
        </span>
      )}
    </div>
  );
}