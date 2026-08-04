import "./frontend.css";
import Navbar from "../frontend/components/layout/Navbar/Navbar";
import Footer from "../frontend/components/layout/Footer/Footer";
import I18nProvider from "../frontend/components/I18nProvider";

export default function FrontendLayout({ children }) {
  return (
    <I18nProvider>
      <Navbar />
      {children}
      <Footer />
    </I18nProvider>
  );
}
