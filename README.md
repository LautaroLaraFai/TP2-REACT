# Visualizador de Juegos

## Miembros del Grupo

| Nombre         | Email                                      | Rol                            |
| -------------- | ------------------------------------------ | ------------------------------ |
| Marcos Chavez  | <marcos.chavez@est.fi.uncoma.edu.ar>       | Desarrollador Logica Principal |
| Lucas Martinez | <lucas.martinez@est.fi.uncoma.edu.ar>      | Desarrollador Frontend + UI    |
| Lautaro Lara   | <lautaronicolas.lara@est.fi.uncoma.edu.ar> | Scrum Master                   |

---

## Descripcion de la Aplicacion

Aplicacion web desarrollada con React y Vite que funciona como un visualizador de juegos.

### Funcionalidades Principales

- Visualizar juegos obtenidos desde una API creada en mockAPI
- Añadir juegos a favoritos
- Quitar juegos de favoritos
- Buscar juegos por nombre
- Buscar juegos por desarrollador
- Descargar la informacion del juego en formato PDF
- Visualizar la pagina en dispositivos moviles (responsive)
- Visualizar la pagina en ingles y espanol (solo la informacion que no viene de la API)

---

## Tecnologias y Librerias Utilizadas

| Tecnologia            | Descripcion                    |
| --------------------- | ------------------------------ |
| React                 | Framework principal            |
| React Router          | Navegacion entre paginas       |
| React-pdf             | Generacion de archivos PDF     |
| Tailwind CSS          | Estilizado y diseno responsive |
| i18next               | Internacionalizacion (ES/EN)   |
| React Infinite Scroll | Carga infinita de juegos       |
| Vercel                | Plataforma de deploy           |

---

## Decisiones importantes tomadas

- Realizamos un analisis del codigo y decidimos aumentar la componentizacion para mejorar la reutilizacion y mantenibilidad
  -> Se implemento un hook personalizado (`useFavorite`) para centralizar la logica de favoritos y evitar duplicacion de codigo entre paginas

- Se implemento un proxy mediante *API Routes* (Vercel) para resolver restricciones de CORS (***Cross-Origin Resource Sharing***) al renderizar imagenes en la generacion de PDFs con React-pdf.

---

## Instalacion y Guia de Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Pasos para Instalar y Ejecutar la Aplicacion

La aplicacion puede verse de 2 formas:

**Forma 1 - Local:**

```bash
# Clonar el repositorio
git clone https://github.com/LautaroLaraFai/TP2-REACT.git

# Entrar a la carpeta del proyecto
cd TP2-REACT

# Instalar dependencias
npm install

# Iniciar la aplicacion con Vite
npm run dev
```

**Despliegue en produccion (recomendado):**

**Accede a la aplicacion desde:**  
[https://tp-2-react-nine.vercel.app/](https://tp-2-react-nine.vercel.app/)
