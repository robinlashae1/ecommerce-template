export const siteConfig = {
  name: "Your Store",

  description:
    "A modern ecommerce store built for everyday life.",

  url: "https://example.com",

  branding: {
    logo: "/images/logo.svg",
    favicon: "/favicon.svg",
  },

  contact: {
    email: "hello@example.com",
    phone: "(555) 555-5555",
  },

  announcement: {
    enabled: true,
    message: "Free shipping on orders over $100",
    linkText: "Shop now",
    linkHref: "/shop",
    dismissible: true,
  },
  newsletter: {
  enabled: false,
  eyebrow: "Stay in the loop",
  title: "Get updates from Your Store.",
  description:
    "Sign up for product launches, special offers, and occasional updates.",
},

  social: {
    instagram: "#",
    facebook: "",
    tiktok: "#",
  },

  navigation: [
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "New Arrivals",
      href: "/shop?sort=newest",
    },
    {
      label: "Collections",
      href: "/collections",
    },
  ],
};