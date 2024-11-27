const draggable = document.getElementById('draggable');
const buttonContainer = document.getElementById('buttonContainer');

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// Arrastar a div
draggable.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - draggable.offsetLeft;
    offsetY = e.clientY - draggable.offsetTop;
    draggable.style.cursor = 'grabbing';
    buttonContainer.classList.add('hidden'); // Esconde os botões ao arrastar
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        draggable.style.left = `${e.clientX - offsetX}px`;
        draggable.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    draggable.style.cursor = 'grab';
});

// Mostrar os botões ao clicar
draggable.addEventListener('click', (e) => {
    if (!isDragging) {
        buttonContainer.classList.remove('hidden');
        buttonContainer.style.left = `${draggable.offsetLeft + draggable.offsetWidth + 10}px`;
        buttonContainer.style.top = `${draggable.offsetTop}px`;
    }
});
