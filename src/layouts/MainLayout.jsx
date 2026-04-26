// import Header from "../components/Header/Header.jsx";
// import Footer from "../components/Footer/Footer.jsx";
import "../index.css"

export default function MainLayout({ children }) {
  return (
    <>
      {/* cuando esté listo Header y Footer, hay que eliminar estos divs */}
      <div className="h-14 bg-(--color-p-bg) rounded-2xl px-5 mt-5 mr-10 ml-10 mb-5" >
      {/* <Header /> */}
      Header
      </div>

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

        <footer className="h-46 px-5 bg-(--color-s-neutral) rounded-bl-xl rounded-br-xl">
        {/* <Footer /> */}
        Footer
        </footer>
      </main>
    </>
  );
}