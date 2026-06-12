// src/pages/ErrorPage.jsx
import { useNavigate } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();

    const handleRetry = () => {
        sessionStorage.removeItem('redirected');
        window.location.href = '/';
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-red-500 mb-4">Error de Conexión</h1>
        <p className="text-gray-400 mb-8">
          No se pudo conectar con el servidor
        </p>
       <button
            onClick={handleRetry}
            className="px-6 py-3 bg-a-amber text-gray-900 rounded-lg cursor-pointer transition-colors"
            >
            Reintentar
        </button>
      </div>
    </div>
  );
}