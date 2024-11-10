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

    

