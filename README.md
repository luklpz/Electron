# NewsScraper - Buscador de Noticias con Web Scraping

### Finalidad del Proyecto
Este proyecto tiene como objetivo proporcionar una herramienta para buscar noticias en tiempo real desde múltiples periódicos digitales mediante web scraping. Utilizando Node.js y Cheerio, se extraen los titulares, enlaces y, cuando es posible, imágenes de las noticias publicadas en diversas fuentes.

### Estructura del Proyecto
El proyecto está estructurado de la siguiente manera:

- **src/**
  - `server.js`: Archivo principal que inicia el servidor en localhost y gestiona las rutas.
  - `scraper.js`: Contiene la lógica de web scraping, obteniendo titulares, enlaces e imágenes de las noticias.
- **views/** 
  - `index.html`: Página principal con el buscador de noticias.
  - `resultados.html`: Página donde se muestran los resultados de la búsqueda.
  - `noticia.html`: Página donde se carga el contenido de una noticia seleccionada.
  - `styles.css`: Archivo CSS para mejorar la apariencia de la aplicación.
- **main.js**: Archivo de configuración para ejecutar la aplicación en Electron.
- **package.json**: Archivo de configuración del proyecto con las dependencias utilizadas.

### Funcionamiento
1. **Inicio del servidor**  
   - Se ejecuta `server.js`, que inicia un servidor Express en `http://localhost:3000`.
   - Este servidor se encarga de procesar las solicitudes y devolver los datos obtenidos del scraping en formato JSON.

2. **Búsqueda de noticias**  
   - Desde `index.html`, el usuario ingresa un término de búsqueda.
   - La solicitud se envía a `server.js`, que llama a `scraper.js` para obtener las noticias relevantes.
   - `scraper.js` accede a los periódicos configurados, extrae los titulares y devuelve los resultados.

3. **Visualización de los resultados**  
   - `resultados.html` muestra las noticias encontradas con su título, enlace e imagen (si está disponible).
   - Al hacer clic en una noticia, se carga `noticia.html` con el contenido de la noticia extraída.

### ¿Por qué usamos un servidor en localhost?
El servidor en localhost permite:
- Servir archivos estáticos (HTML, CSS y JavaScript) de forma eficiente.
- Gestionar las solicitudes de búsqueda sin restricciones de CORS.
- Mantener la lógica de scraping y procesamiento de datos separada del frontend.
- Evitar bloqueos de navegadores al hacer peticiones a sitios externos sin intermediario.

Para ejecutar la aplicación, basta con ejecutar:

