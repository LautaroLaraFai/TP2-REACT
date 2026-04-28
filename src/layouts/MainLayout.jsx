import { Footer } from "../components/Footer/Footer.jsx";
import Header from "../components/Header/Header.jsx";
// import Footer from "../components/Footer/Footer.jsx";
import "../index.css"

export default function MainLayout({ children }) {
  return (
    <>
      <Header />

      <main 
        className="
          flex flex-col min-h-[calc(100vh-24px)] rounded-xl bg-(--color-p-bg)
          mt-10 mb-2 md:mr-10 md:ml-10 max-md:mr-6 max-md:ml-6
        "
      >
        
        {/* Contenido */}
        <div className="flex-1">
          {children}
        </div>

        <Footer />
      </main>
    </>
  );
}