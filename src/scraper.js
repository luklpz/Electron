const axios = require('axios');
const cheerio = require('cheerio');

const newspapers = [
  {
    name: 'El País',
    baseUrl: 'https://elpais.com',
    sections: {
      politica: '/espana/politica/',
      economia: '/economia/',
      deportes: '/deportes/',
      tecnologia: '/tecnologia/',
      cultura: '/cultura/',
      sociedad: '/espana/sociedad/'
    },
    articleSelector: 'article h2 a, article h3 a',
    fallback: '/'
  },
  {
    name: 'ABC',
    baseUrl: 'https://www.abc.es',
    sections: {
      politica: '/espana/politica/',
      economia: '/economia/',
      deportes: '/deportes/',
      tecnologia: '/tecnologia/',
      cultura: '/cultura/',
      sociedad: '/espana/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'La Vanguardia',
    baseUrl: 'https://www.lavanguardia.com',
    sections: {
      politica: '/politica',
      economia: '/economia',
      deportes: '/deportes',
      tecnologia: '/tecnologia',
      cultura: '/cultura',
      sociedad: '/vida'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'El Mundo',
    baseUrl: 'https://www.elmundo.es',
    sections: {
      politica: '/espana/politica.html',
      economia: '/economia.html',
      deportes: '/deportes.html',
      tecnologia: '/tecnologia.html',
      cultura: '/cultura.html',
      sociedad: '/espana/sociedad.html'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'El Periódico',
    baseUrl: 'https://www.elperiodico.com',
    sections: {
      politica: '/es/politica/',
      economia: '/es/economia/',
      deportes: '/es/deportes/',
      tecnologia: '/es/tecnologia/',
      cultura: '/es/ocio-y-cultura/',
      sociedad: '/es/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'La Razón',
    baseUrl: 'https://www.larazon.es',
    sections: {
      politica: '/espana/politica/',
      economia: '/economia/',
      deportes: '/deportes/',
      tecnologia: '/tecnologia/',
      cultura: '/cultura/',
      sociedad: '/espana/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'El Periódico de España',
    baseUrl: 'https://www.epe.es',
    sections: {
      politica: '/es/politica/',
      economia: '/es/economia/',
      deportes: '/es/deportes/',
      tecnologia: '/es/tecnologia/',
      cultura: '/es/cultura/',
      sociedad: '/es/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'Público',
    baseUrl: 'https://www.publico.es',
    sections: {
      politica: '/politica/',
      economia: '/economia/',
      deportes: '/deportes/',
      tecnologia: '/tecnologia/',
      cultura: '/cultura/',
      sociedad: '/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  },
  {
    name: 'Libertad Digital',
    baseUrl: 'https://www.libertaddigital.com',
    sections: {
      politica: '/nacional/',
      economia: '/economia/',
      deportes: '/deportes/',
      tecnologia: '/tecnologia/',
      cultura: '/cultura/',
      sociedad: '/sociedad/'
    },
    articleSelector: 'h2 a, h3 a',
    fallback: '/'
  }
];

// Normaliza el texto para la búsqueda
function normalizeText(str) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Filtrado flexible de búsqueda
function matchesSearch(text, query) {
  if (!query) return true;
  const textNorm = normalizeText(text);
  const queryNorm = normalizeText(query);
  return queryNorm.split(/\s+/).some(word => textNorm.includes(word));
}

// Configuración de headers para evitar bloqueos
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  'Referer': 'https://www.google.com/'
};

// Función para obtener noticias de una URL
async function fetchNews(paper, section, url) {
  try {
    const response = await axios.get(url, { headers: HEADERS });
    if (response.status !== 200) throw new Error(`HTTP ${response.status}`);
    
    const $ = cheerio.load(response.data);
    let results = [];

    $(paper.articleSelector).each((_, elem) => {
      const title = $(elem).text().trim();
      let link = $(elem).attr('href');
      if (!title || !link) return;

      if (link.startsWith('/')) link = paper.baseUrl + link;
      results.push({ fuente: paper.name, seccion: section, titulo: title, enlace: link });
    });

    return results;
  } catch (error) {
    console.error(`⚠️ Error en ${paper.name} - ${section}: ${error.message}`);
    return null;
  }
}

// Scraper con fallback a la portada si una sección falla
async function scrapeNews(searchTerm) {
  let allResults = [];

  for (const paper of newspapers) {
    console.log(`📰 Buscando en: ${paper.name}`);
    
    for (const [sectionName, sectionPath] of Object.entries(paper.sections)) {
      const url = paper.baseUrl + sectionPath;
      let results = await fetchNews(paper, sectionName, url);

      if (!results || results.length === 0) {
        console.warn(`⚠️ Sección ${sectionName} falló, intentando portada...`);
        results = await fetchNews(paper, 'portada', paper.baseUrl + paper.fallback);
      }

      if (results) {
        results = results.filter(n => matchesSearch(n.titulo, searchTerm));
        allResults.push(...results);
      }
    }
  }

  console.log(`🔎 Noticias encontradas: ${allResults.length}`);
  return allResults.length ? allResults : [{ titulo: "No se encontraron noticias relevantes." }];
}

// Exportar funciones
module.exports = { buscarNoticias: scrapeNews };
