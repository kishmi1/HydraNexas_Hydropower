import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import ChatBot from "../components/common/ChatBot/ChatBot";
export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
      <ChatBot/>

      <Footer />
    </>
  );
}
