# Visualizador de Juegos

> Aplicación web desarrollada con **React** y **Vite** que funciona como un visualizador de juegos.

---

## Miembros del Grupo

<details>
<summary><strong>Roles TP2</strong></summary>

| Nombre | Email | Rol |
|---|---|---|
| Marcos Chavez | <marcos.chavez@est.fi.uncoma.edu.ar> | Desarrollador Lógica Principal |
| Lucas Martinez | <lucas.martinez@est.fi.uncoma.edu.ar> | Desarrollador Frontend + UI |
| Lautaro Lara | <lautaronicolas.lara@est.fi.uncoma.edu.ar> | Scrum Master |

</details>

<details>
<summary><strong>Roles TP Testing Automático</strong></summary>

| Nombre | Email | Rol |
|---|---|---|
| Marcos Chavez | <marcos.chavez@est.fi.uncoma.edu.ar> | Desarrollador |
| Lucas Martinez | <lucas.martinez@est.fi.uncoma.edu.ar> | Desarrollador |
| Lautaro Lara | <lautaronicolas.lara@est.fi.uncoma.edu.ar> | Desarrollador |

</details>

<details>
<summary><strong>Roles TP3</strong></summary>

| Nombre | Email | Rol |
|---|---|---|
| Marcos Chavez | <marcos.chavez@est.fi.uncoma.edu.ar> | Desarrollador |
| Lucas Martinez | <lucas.martinez@est.fi.uncoma.edu.ar> | Scrum Master |
| Lautaro Lara | <lautaronicolas.lara@est.fi.uncoma.edu.ar> | Desarrollador |

</details>

---

## Funcionalidades Principales

- Visualizar juegos obtenidos desde una API creada por nosotros
- Añadir y quitar juegos de favoritos
- Buscar juegos por nombre o por desarrollador
- Descargar la información del juego en formato PDF
- Visualización responsive para dispositivos móviles
- Soporte multiidioma: español, inglés y lengua negra *(idioma de El Señor de los Anillos)*

---

## Tecnologías y Librerías Utilizadas

| Tecnología | Descripción |
|---|---|
| React | Framework principal |
| React Router | Navegación entre páginas |
| React-pdf | Generación de archivos PDF |
| Tailwind CSS | Estilizado y diseño responsive |
| i18next | Internacionalización (ES/EN) |
| React Infinite Scroll | Carga infinita de juegos |
| Vercel | Plataforma de deploy |

---

## Testing

### Librerías utilizadas

| Librería | Descripción |
|---|---|
| Vitest | Framework de testing |
| React Testing Library | Testing de componentes React |
| jest-dom | Matchers adicionales para assertions en DOM |
| user-event | Simulación de interacciones del usuario |
| jsdom | Entorno DOM para ejecución de tests |
| coverage-v8 | Reportes de coverage |

### Ejecutar los tests

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar todos los tests una sola vez
npm run test:run

# Generar reporte de coverage
npm run test:coverage
```

---

## Decisiones Importantes

### Componentización

Se realizó un análisis del código y se decidió aumentar la componentización para mejorar la reutilización y mantenibilidad.

### Favoritos — Context API

Se implementó un contexto global para manejar el estado de los favoritos en toda la aplicación.

**Características:**

- Estado global de favoritos accesible desde cualquier componente
- Sincronización automática con el backend al iniciar sesión
- Funciones para verificar, agregar y eliminar favoritos

| Función | Descripción |
|---|---|
| `favorites` | Lista de juegos favoritos del usuario autenticado |
| `favoriteIds` | Array de IDs de juegos favoritos |
| `isFavorite(id)` | Devuelve `true` si el juego está en favoritos |
| `toggleFavorite(id)` | Agrega o elimina un juego de favoritos |
| `loadingState` | Estado de carga de la petición inicial |

```jsx
import { useFavorites } from "../context/FavoriteContext";

const { favorites, isFavorite, toggleFavorite } = useFavorites();

// Verificar si un juego es favorito
const isFav = isFavorite(gameId);

// Agregar o quitar de favoritos
toggleFavorite(gameId);
```

### Autenticación — Auth Context

Se implementó un contexto global para manejar la autenticación del usuario en toda la aplicación.

**Características:**

- Estado global de autenticación accesible desde cualquier componente
- Persistencia de sesión mediante `localStorage`
- Carga automática del perfil al iniciar la aplicación
- Funciones para iniciar y cerrar sesión

| Función | Descripción |
|---|---|
| `user` | Datos del usuario autenticado |
| `token` | Token JWT de autenticación |
| `loading` | Estado de carga de la autenticación inicial |
| `isAuthenticated` | `true` si el usuario está autenticado |
| `login(jwt)` | Inicia sesión con un token JWT |
| `logout()` | Cierra sesión y elimina el token |

```jsx
import { useAuth } from "../context/AuthContext";

const { user, token, login, logout, isAuthenticated } = useAuth();

// Verificar si está autenticado
if (isAuthenticated) {
  console.log("Usuario:", user.email);
}

// Iniciar sesión
login("eyJhbGciOiJIUzI1NiIs...");

// Cerrar sesión
logout();
```

### Proxy para imágenes en PDF

Se implementó un proxy mediante **API Routes** (Vercel) para resolver restricciones de CORS *(Cross-Origin Resource Sharing)* al renderizar imágenes en la generación de PDFs con React-pdf.

---

## Instalación y Guía de Uso

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (viene incluido con Node.js)

### Opción 1 — Ejecutar en local

```bash
# Clonar el repositorio
git clone https://github.com/LautaroLaraFai/TP2-REACT.git

# Entrar a la carpeta del proyecto
cd TP2-REACT

# Instalar dependencias
npm install

# Iniciar la aplicación con Vite
npm run dev
```

### Opción 2 — Despliegue en producción *(recomendado)*

Accedé a la aplicación directamente desde:

**[https://tp-2-react-nine.vercel.app/](https://tp-2-react-nine.vercel.app/)**

---

## Backend

Para el backend se creó una API REST. Podés ver más información en:

**[https://github.com/LucasLautaroMartinez/TP3-REST-API_Express](https://github.com/LucasLautaroMartinez/TP3-REST-API_Express)**
