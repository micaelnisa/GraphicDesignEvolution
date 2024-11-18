

// Parâmetros
const gridSize = 100; // Grid 10x10
const images = [...Array(100)].map(() => "./images/crocs.png"); // Array de imagens

// Função para calcular a probabilidade com base na distância ao centro
function calculateProbability(x, y, centerX, centerY) {
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  return 1 - distance / Math.max(centerX, centerY); // Maior probabilidade no centro
}

// Preenchimento da grid
function populateGrid() {
  const gridContainer = document.querySelector(".grid-container");
  const centerX = (gridSize - 1) / 2;
  const centerY = (gridSize - 1) / 2;
  let imageIndex = 0;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const probability = calculateProbability(x, y, centerX, centerY);
      const randomValue = Math.random();
      
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");

      if (randomValue < probability && imageIndex < images.length) {
        const img = document.createElement("img");
        img.src = images[imageIndex];
        img.alt = `Imagem ${imageIndex + 1}`;
        gridItem.appendChild(img);
        imageIndex++;
      }

      gridContainer.appendChild(gridItem);
    }
  }
}

populateGrid();




/*
cena da grid 

document.addEventListener("DOMContentLoaded",function() {
    const container = document.getElementById('image-container');
    const images = container.querySelectorAll('.image');
    
    let currentImage = 0;
    const totalImages = images.length;
    
    const minImagesPerColumn = 2;
    const maxImagesPerColumn = 8; // Limite máximo de imagens será 3, garantindo que seja ímpar

    while (currentImage < totalImages) {
        // Gera um número aleatório de imagens para a nova coluna, entre 1 e 3
        let numberOfImagesInColumn = Math.floor(Math.random() * (maxImagesPerColumn - minImagesPerColumn + 1)) + minImagesPerColumn;

        // Garantir que o número de imagens seja ímpar
        if (numberOfImagesInColumn % 2 === 0) {
            numberOfImagesInColumn++;  // Se for par, adicionar 1 para torná-lo ímpar
        }

        // Criar um novo container para a coluna
        const column = document.createElement('div');
        column.classList.add('column');

        // Adicionar o número aleatório de imagens à nova coluna
        for (let i = 0; i < numberOfImagesInColumn && currentImage < totalImages; i++) {
            column.appendChild(images[currentImage]);
            currentImage++;
        }

        // Adicionar a nova coluna ao container
        container.appendChild(column);
    }
});
