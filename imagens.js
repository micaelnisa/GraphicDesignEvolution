const grid = document.getElementById('grid');
const folderPath = './meggslow/'; // Caminho para a pasta de imagens
const totalImages = 1561; // Total de imagens
const extensions = ['jpg', 'png']; // Extensões suportadas
const selectedImages = new Set(); // Para armazenar imagens selecionadas

async function loadImages() {
    let loadedImages = 0;

    for (let i = 1; i <= totalImages; i++) {
        let found = false;
        for (const extension of extensions) {
            if (!found) {
                const img = new Image();
                img.src = `${folderPath}${i}.${extension}`;
                img.alt = `Imagem ${i}`;
                img.dataset.id = i; // Guardar o ID da imagem
                const loadPromise = new Promise((resolve) => {
                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(null);
                });
                const result = await loadPromise;
                if (result) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.appendChild(img);
                    grid.appendChild(cell);

                    // Evento de clique para selecionar/deselecionar
                    cell.addEventListener('click', () => {
                        cell.classList.toggle('expanded');
                        const imageId = parseInt(img.dataset.id);
                        if (cell.classList.contains('expanded')) {
                            selectedImages.add(imageId); // Adicionar à seleção
                            addThumbnail(img); // Adicionar miniatura ao painel
                        } else {
                            selectedImages.delete(imageId); // Remover da seleção
                            removeThumbnail(imageId); // Remover miniatura
                        }

                        // Atualizar visibilidade da div draggable
                        updateDraggableVisibility();
                    });
                    

                    found = true;
                }
            }
        }

        // Atualiza a tela de loading para refletir o progresso
        loadedImages++;
        const progress = Math.round((loadedImages / totalImages) * 100);
        document.querySelector('.loadingText h3').textContent = `A carregar conteúdos... ${progress}%`;
    }

    // Esconder a tela de carregamento com transição suave quando as imagens estiverem todas carregadas
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.opacity = '0'; // Inicia a transição de opacidade para 0

    // Após a transição, remover o elemento da tela
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 2000); // O tempo deve ser igual ao da transição
}

// Função para adicionar miniatura à div draggable
function addThumbnail(img) {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const thumbnail = document.createElement('img');
    thumbnail.src = img.src;
    thumbnail.alt = img.alt;
    thumbnail.className = 'thumbnail';
    thumbnail.dataset.id = img.dataset.id;

    thumbnailContainer.appendChild(thumbnail);
}

// Função para remover a miniatura da div draggable
function removeThumbnail(imageId) {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    const thumbnail = thumbnailContainer.querySelector(`img[data-id="${imageId}"]`);
    if (thumbnail) {
        thumbnailContainer.removeChild(thumbnail);
    }
}

// Função para atualizar a visibilidade da div draggable
function updateDraggableVisibility() {
    const draggableDiv = document.getElementById('draggable'); // ID da div draggable
    const expandedCells = document.querySelectorAll('.cell.expanded');
    
    if (expandedCells.length > 0) {
        draggableDiv.classList.add('show'); // Mostrar com animação
    } else {
        draggableDiv.classList.remove('show'); // Ocultar com animação
    }
}


document.getElementById('showSelected').addEventListener('click', () => {
    // Atualizar o conjunto de imagens selecionadas
    document.querySelectorAll('.cell').forEach((cell) => {
        const imageId = parseInt(cell.querySelector('img').dataset.id);
        if (!cell.classList.contains('expanded')) {
            selectedImages.delete(imageId); // Remover se não estiver expandida
        }
    });

    // Criar um array de IDs selecionados
    const selectedArray = Array.from(selectedImages);

    // Reverter todas as células ao estado normal
    document.querySelectorAll('.cell.expanded').forEach((cell) => {
        cell.classList.remove('expanded');
    });

    // Limpar o conteúdo da div draggable
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = ''; // Remove todas as miniaturas da div draggable

    // Ocultar a div draggable
    const draggableDiv = document.getElementById('draggable');
    draggableDiv.style.display = 'none';

    // Limpar o conjunto de imagens selecionadas
    selectedImages.clear();

    // Redirecionar para a nova página com os IDs no URL
    if (selectedArray.length > 0) {
        const queryString = `images=${selectedArray.join(',')}`;
        window.open(`selected.html?${queryString}`, '_blank');
    } else {
        alert('Não podes ver o mapa se não selecionaste nenhuma imagem');
    }
});

loadImages();

