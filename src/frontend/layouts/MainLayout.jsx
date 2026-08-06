import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import ChatBot from "../components/common/ChatBot/ChatBot";
import { useEffect } from "react";

export default function MainLayout() {
  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      <Navbar />

      <main>
        <Outlet />
      </main>
      <ChatBot/>

      <Footer />
    </>
  );
}
