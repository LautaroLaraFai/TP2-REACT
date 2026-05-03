import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Utilización:
 * import ScrollToTop from "./ScrollToTop";
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <ScrollToTop />
 *       {/* tus rutas */

 /**
  * o
  * <Link to="/pagina" onClick={() => window.scrollTo(0, 0)}>
  */