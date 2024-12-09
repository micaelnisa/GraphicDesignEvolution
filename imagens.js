
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
                                } else {
                                    selectedImages.delete(imageId); // Remover da seleção
                                }
                            });

                            found = true;
                        }
                    }
                }

                // Atualiza a tela de loading para refletir o progresso
                loadedImages++;
                const progress = Math.round((loadedImages / totalImages) * 100);
                document.querySelector('.loadingText h3').textContent = `A carregar conteúdos ${progress}%`;
            }

            // Esconder a tela de carregamento quando as imagens estiverem todas carregadas
            document.getElementById('loadingScreen').style.display = 'none';
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
            document.querySelectorAll('.expanded').forEach((cell) => {
                cell.classList.remove('expanded');
            });

            // Redirecionar para a nova página com os IDs no URL
            if (selectedArray.length > 0) {
                const queryString = `images=${selectedArray.join(',')}`;
                window.open(`selected.html?${queryString}`, '_blank');
            } else {
                alert('Não podes ver o mapa se não selecionaste nenhuma imagem');
            }
        });

        loadImages();
    