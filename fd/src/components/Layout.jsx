import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Outlet for dynamic content */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
