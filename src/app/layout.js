import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get Me A Chai - Get your project funded",
  description: "A crowdfunding platform for getting your project funded",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=" bg-[#000000]">
        <SessionWrapper>
          <Navbar />
          <div className="text-white min-h-screen">
            <main className="w-full mx-auto p-4">{children}</main>
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
