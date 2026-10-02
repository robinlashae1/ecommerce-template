export const siteConfig = {
  brand: {
    name: "Client Name",
    logo: "/images/logo.svg",
    favicon: "/favicon.svg",
    description: ""
  },
  social:{
    instagram: "",
    facebook: "",
    tiktok: "",
  },

  theme: {
    primary: "#111111",
    secondary: "#F5F5F5",
    accent: "#E5E5E5",
  },

  contact: {
    email: "hello@client.com",
    phone: "(555) 555-5555",
  },

  navigation: [
    {
      label: "Shop",
      href: "/shop",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "About",
      href: "/about",
    },
    { label: "New Arrivals",
       href: "/shop?sort=newest", 
    },
  ],

  features: {
    wishlist: false,
    reviews: true,
    newsletter: true,
    search: true,
  },
};