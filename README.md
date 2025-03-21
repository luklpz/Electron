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
      - `stylesIndex.css`: Archivo CSS para mejorar la apariencia de index.html.
      - `resultados.html`: Página donde se muestran los resultados de la búsqueda.
      - `stylesResultados.css`: Archivo CSS para mejorar la apariencia de resultados.html.
      - `noticia.html`: Página donde se carga el contenido de una noticia seleccionada.
      - `stylesNoticia.css`: Archivo CSS para mejorar la apariencia de noticia.html.
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


Para ejecutar la aplicación, basta con seguir los siguientes pasos:
 1. Primero necesitamos iniciar el servidor en el terminal con el comando "node src/server.js"
 2. Por último queda ejecutar en una terminal diferente el comando "npm start"

 **Nota aclarativa ->** En la raiz de este proyecto falta la carpeta node_modules, la cual almacena todas las dependencias y paquetes que el proyecto necesita para funcionar. Esto se debe a que github solo permite subir 100 archivos a la vez como máximo y dicha carpeta contiene 2715, por lo que no he podido subirla.

 ### Autoevaluación
 El desarrollo de este proyecto ha sido un desafío interesante que me ha permitido aplicar y mejorar mis conocimientos en web scraping, Node.js y Express. Durante el proceso, he encontrado varias dificultades, como la necesidad de adaptar los selectores de scraping a la estructura específica de cada periódico y gestionar errores en las peticiones. También ha sido un reto implementar un filtro de búsqueda eficiente que permita encontrar noticias realmente relevantes ya que en numerosas ocasiones los filtros aplicados eran demasiado restrictivos o no funcionaban correctamente.
 
 A pesar de estas dificultades, el resultado final es muy satisfactorio para el tiempo que ha tomado desarrollarlo. La aplicación funciona correctamente, permitiendo obtener noticias de múltiples fuentes y las muestra con una interfaz clara y bien organizada. 
 
 En general, considero que he hecho un buen trabajo, superando los obstáculos técnicos y logrando un resultado, que aunque presente algún altibajo debido a la complejidad del scrapping en periodicos web, es muy positivo; y que, por la calidad del trabajo realizado, la resolución de problemas enfrentados y el resultado final obtenido, este proyecto merece una calificación de 9 o 10.
 
