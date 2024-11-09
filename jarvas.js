document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('.navbar');
    const classes = {
        prehistoria: 'epoca1',
        'idade-media': 'epoca2',
        'idade-moderna': 'epoca3',
        movimentos: 'epoca4',
        informacao: 'epoca5',
        'pos-modernismo': 'epoca6',
        digital: 'epoca7'
    };
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            // Desmarca todas as outras checkboxes ao marcar uma nova
            if (this.checked) {
                checkboxes.forEach(cb => {
                    if (cb !== this) cb.checked = false;
                });
            }

            // Esconde todas as classes antes de mostrar a selecionada
            Object.values(classes).forEach(className => {
                document.querySelectorAll(`.${className}`).forEach(el => {
                    el.style.display = 'none';
                });
            });

            // Mostra a classe correspondente à checkbox selecionada
            if (this.checked) {
                const classToShow = classes[this.id];
                document.querySelectorAll(`.${classToShow}`).forEach(el => {
                    el.style.display = 'block';
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    function setupExclusiveCheckboxes(classNames) {
        classNames.forEach(className => {
            const checkboxes = document.querySelectorAll(`.${className}`);
            
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('click', function() {
                    // Desmarca todas as outras checkboxes da mesma classe ao marcar uma nova
                    if (this.checked) {
                        checkboxes.forEach(cb => {
                            if (cb !== this) cb.checked = false;
                        });
                    }

                    // Alterar o background do <ul> para transparente ou branco
                    const ulElement = this.closest('nav').querySelector('ul');
                    const corText = this.closest('nav').querySelectorAll('.epocas span')
                    const corText2 = this.closest('nav').querySelectorAll('.epocas input[type="checkbox"]:checked+label span');
                    
                    // Se alguma checkbox estiver marcada, fundo transparente
                    if (Array.from(checkboxes).some(cb => cb.checked)) {
                        ulElement.style.backgroundColor = 'transparent';
                        corText2.style.color="black"
                        corText.style.color="white"
                        
                    } else {
                        // Caso contrário, fundo branco
                        ulElement.style.backgroundColor = 'white';
                          corText.style.color='white';
                            corText2.style.color="white"
                    }
                });
            });
        });
    }

    // Chame a função com as classes desejadas
    setupExclusiveCheckboxes(['epocas1', 'epocas2', 'epocas3']);
});

    

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
