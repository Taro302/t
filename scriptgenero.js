document.addEventListener('DOMContentLoaded', () => {
    const catalogItems = [
        { id: 22, imgSrc: '../img/id22.jpg', title: 'Covers de Vtubers 1', filter: 'VTuber'},
        { id: 21, imgSrc: '../img/id21.jpg', title: 'Música original de V-tubers con mas suscriptores (YouTube)', filter: 'VTuber'},
        { id: 20, imgSrc: '../img/id20.jpg', title: 'Musica J-pop (THE FIRST TAKE) - parte 2', filter: 'Pop'},
        { id: 19, imgSrc: '../img/id19.jpg', title: 'Musica J-pop (THE FIRST TAKE) - parte 1', filter: 'Pop' },
        { id: 18, imgSrc: '../img/id18.jpg', title: 'Músicas de Perú', filter: 'Latino' },
        { id: 17, imgSrc: '../img/id17.jpg', title: 'Música Salsa y Merengue', filter: 'Latino' },
        { id: 16, imgSrc: '../img/id16.jpg', title: 'Música de Donghuas', filter: 'Asia' },
        { id: 15, imgSrc: '../img/id15.jpg', title: 'Kpop old school parte 2', filter: 'K-Pop' },
        { id: 14, imgSrc: '../img/id14.jpg', title: 'Kpop old school parte 1', filter: 'K-Pop' },
        { id: 13, imgSrc: '../img/id13.jpg', title: 'Musica Japonesa - parte 1', filter: 'Pop' },
        { id: 12, imgSrc: '../img/id12.jpg', title: 'Naruto', filter: 'Anime' },
        { id: 11, imgSrc: '../img/id11.jpg', title: 'Musica Electrónica 3', filter: 'Electrónica' },
        { id: 10, imgSrc: '../img/id10.jpg', title: 'Musica Electrónica 2', filter: 'Electrónica' },
        { id: 9, imgSrc: '../img/id9.webp', title: 'Musica Electrónica 1', filter: 'Electrónica' },
        { id: 8, imgSrc: '../img/id8.jpg', title: 'Ado', filter: 'Pop' },
        { id: 7, imgSrc: '../img/id7.jpg', title: 'BABYMETAL', filter: 'Metal' },
        { id: 6, imgSrc: '../img/id6.jpg', title: 'Hits del J-POP', filter: 'Anime' },
        { id: 5, imgSrc: '../img/id5.jpg', title: 'OP de Animes Parte 2', filter: 'VTuber' },
        { id: 4, imgSrc: '../img/indu1.jpg', title: 'Musica Indu - Peliculas', filter: 'Indu' },
        { id: 3, imgSrc: '../img/id3.jpg', title: 'OP de Animes Parte 1', filter: 'Anime' },
        { id: 2, imgSrc: '../img/anime.webp', title: 'Anime Infancia', filter: 'Anime' },
        { id: 1, imgSrc: '../img/hololive.webp', title: 'HOLOLIVE', filter: 'VTuber' },
        
    ];

    const itemsPerPage = 16;
    let currentPage = 1;

    const catalog = document.getElementById('catalog');
    const pageNum = document.getElementById('pageNum');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const searchInput = document.getElementById('searchInput');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    function getSelectedFilters() {
        const selectedFilters = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedFilters.push(checkbox.value);
            }
        });
        return selectedFilters;
    }

    function filterItems(items, filters, searchText) {
        return items.filter(item => {
            const matchesFilter = filters.length === 0 || filters.includes(item.filter);
            const matchesSearch = searchText === '' || item.title.toLowerCase().includes(searchText.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }

    function renderCatalog(page, searchText = '') {
        catalog.innerHTML = '';
        const filters = getSelectedFilters();
        const filteredItems = filterItems(catalogItems, filters, searchText);

        const start = (page - 1) * itemsPerPage;
        const end = page * itemsPerPage;
        const itemsToShow = filteredItems.slice(start, end);

        itemsToShow.forEach(item => {
            const catalogItem = document.createElement('div');
            catalogItem.classList.add('catalog-item');
            const linkHref = getVotacionLink(item.id);
            catalogItem.innerHTML = `
                <a href="${linkHref}">
                    <img src="${item.imgSrc}" alt="Imagen de ejemplo">
                    <div class="catalog-item-title">${item.title}</div>
                </a>
            `;
            catalog.appendChild(catalogItem);
        });

        pageNum.textContent = page;
        checkButtons(filteredItems.length);
    }
    //esta funcion nos servira si queremos crear mas paginas de votacion para otras plataformas , tiktok, imagenes, etc, cuestion que se puedan utilizar iframes

function getVotacionLink(itemId) {
    switch (itemId) {
        case 666:
            return `../votaciontoktok.html?id=${itemId}`;

        default:
            return `../votacion.html?id=${itemId}`;
    }
}



    function changePage(direction) {
        currentPage += direction;
        renderCatalog(currentPage, searchInput.value);
    }

    function checkButtons(totalItems) {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage * itemsPerPage >= totalItems;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            currentPage = 1; // Reiniciar a la primera página cuando cambian los filtros
            renderCatalog(currentPage, searchInput.value);
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            changePage(-1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage * itemsPerPage < catalogItems.length) {
            changePage(1);
        }
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reiniciar a la primera página al realizar una búsqueda
        renderCatalog(currentPage, searchInput.value);
    });

    renderCatalog(currentPage);
});
document.addEventListener('DOMContentLoaded', function() {
    const filtersToggle = document.getElementById('filters-toggle');
    const filters = document.getElementById('filters');

    filtersToggle.addEventListener('click', function() {
        if (filters.style.display === 'block') {
            filters.style.display = 'none';
            filtersToggle.textContent = 'FILTROS';
        } else {
            filters.style.display = 'block';
            filtersToggle.textContent = 'OCULTAR FILTROS';
        }
    });
});


function showGenre(genre) {
    var content = document.getElementById('content');
    content.innerHTML = ''; // Limpiar el contenido actual

    // Aquí puedes añadir el contenido específico del género basado en el valor de `genre`
    content.innerHTML = '<h2>Género: ' + genre + '</h2>';

    // Si tienes datos específicos para cada género, puedes cargarlo aquí
    // Por ejemplo, cargar contenido desde un archivo JSON o una API
}

function toggleNav() {
    var navOverlay = document.getElementById('navOverlay');
    navOverlay.classList.toggle('open');
}

