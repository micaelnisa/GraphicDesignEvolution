


document.querySelectorAll('.grids-imagens > div').forEach(div => {
    // Define tamanhos aleatórios (ou outro critério)
    const sizes = ['size-1x1', 'size-2x2', 'size-2x1', 'size-1x2'];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    // Adiciona a classe de tamanho ao div
    div.classList.add(randomSize);
});












/*document.addEventListener("DOMContentLoaded",function() {
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
