
























/*const container = document.getElementById('image-container');
const rows = 10; // Define o número de linhas
const cols = 30; // Define o número de colunas
const totalCells = rows * cols;
const images = Array.from({ length: 200 }, (_, i) => `/images/crocs.png`);

// Função para calcular a probabilidade de preenchimento com base na distância oval
function calculateDensity(row, col) {
  // Centro da grid
  const centerX = Math.floor(rows / 2);
  const centerY = Math.floor(cols / 2);

  // Definição do coeficiente de distorção para ovalizar (esticando mais para as laterais)
  const ovalCoefX = 1.2; // Estica mais nas laterais (colunas)
  const ovalCoefY = 1.5; // Estica mais nas linhas (linhas)

  // Fórmula para calcular a distância ao centro de forma oval
  const distanceToCenter = Math.sqrt(Math.pow((row - centerX) / ovalCoefY, 2) + Math.pow((col - centerY) / ovalCoefX, 2));

  // A maior probabilidade no centro, reduzindo conforme a distância aumenta
  let probabilidade = Math.max(0.1, 1 - distanceToCenter / Math.max(rows, cols));

  // Ajuste para evitar buracos e espalhamento excessivo
  if (distanceToCenter < 2) {
    probabilidade = Math.min(probabilidade + 0.2, 1); // Maior chance no centro
  }

  // Ajuste para as bordas e vértices
  if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
    probabilidade = Math.max(0.2, probabilidade - 0.8); // Menor chance nas bordas
  }

  if ((row === 0 && col === 0) || (row === 0 && col === cols - 1) || 
      (row === rows - 1 && col === 0) || (row === rows - 1 && col === cols - 1)) {
    probabilidade = Math.max(0.05, probabilidade - 1); // Muito baixa nas bordas e vértices
  }

  return probabilidade;
}

// Função para verificar se uma célula tem vizinhos próximos que já foram preenchidos
function hasNearbyImage(row, col) {
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],   // Células adjacentes
    [-1, -1], [-1, 1], [1, -1], [1, 1]    // Diagonais
  ];

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    // Verifica se a célula está dentro da grid
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const index = newRow * cols + newCol;
      const cell = container.children[index];
      if (cell && cell.children.length > 0) {
        return true; // Se algum vizinho tem imagem, retorna true
      }
    }
  }

  return false; // Caso contrário, não há imagem nas vizinhanças
}

function fillGridWithDensity() {
  // Garantir que o preenchimento começa pelo centro e expande para fora
  let filledCells = 0; // Para garantir que as imagens são preenchidas gradualmente

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');

    // Calcular a posição atual (linha e coluna)
    const row = Math.floor(i / cols);
    const col = i % cols;

    // Calcular a probabilidade de preenchimento com base na densidade
    let probabilidade = calculateDensity(row, col);

    // Aumenta a probabilidade se houver vizinhos preenchidos
    if (hasNearbyImage(row, col)) {
      probabilidade = Math.min(probabilidade + 0.2, .78); // Aumenta a chance de preenchimento
    }

    // Preenche a célula com imagem se a probabilidade for atingida
    if (Math.random() < probabilidade && images.length) {
      const img = document.createElement('img');
      img.src = images.shift(); // Preenche as imagens por ordem
      cell.appendChild(img);
      filledCells++;
    }

    container.appendChild(cell);
  }

  // Após preencher as células, podemos fazer um ajuste final para preencher as lacunas restantes
  if (images.length > 0) {
    fillGridWithDensity(); // Continue preenchendo as lacunas restantes
  }
}

fillGridWithDensity();




/*
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
