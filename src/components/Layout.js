import "./globals.css";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
export default function RootLayout({ children }) {
  return (
    <div>
      <Header />

      <div>{children}</div>
      <Footer />
    </div>
  );
}
