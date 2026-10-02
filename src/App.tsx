import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./layout/Header";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";
import  NotFound  from "./pages/NotFound";
import Categories from "./pages/Categories";
import { Success } from "./pages/Success";
import { Footer } from "./layout/Footer";
import { AnnouncementBar } from "./layout/AnnouncementBar";

function App() {
  return (
    <BrowserRouter>
     <AnnouncementBar />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<Success />} />
        <Route path="/collections" element={<Categories />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;