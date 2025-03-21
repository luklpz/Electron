const path = require('path');
const express = require('express');
const scraper = require('./scraper'); // Importación en CommonJS

const app = express();
app.use(express.static(path.join(__dirname, 'views')));

// Servir index.html en la raíz "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para buscar noticias
app.get('/buscar', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.status(400).send('Escribe una búsqueda.');

    try {
        const noticias = await scraper.buscarNoticias(query);
        res.json(noticias);
    } catch (error) {
        console.error('Error al buscar noticias:', error);
        res.status(500).send('Error interno del servidor.');
    }
});

// Ruta para mostrar el contenido de una noticia
app.get('/noticia', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('Falta URL.');

    try {
        const contenido = await scraper.obtenerNoticia(url);
        res.send(`<html><body>${contenido}</body></html>`);
    } catch (error) {
        console.error('Error al obtener la noticia:', error);
        res.status(500).send('Error al cargar la noticia.');
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));
