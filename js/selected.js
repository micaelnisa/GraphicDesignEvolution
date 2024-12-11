const params = new URLSearchParams(window.location.search);
const images = params.get('images') ?.split(',') || [];
const folderPath = './meggslow/'; // Caminho para as imagens

// Ordena os IDs das imagens numericamente crescente
images.sort((a, b) => {
  return parseInt(a) - parseInt(b); // Ordena como números
});

const grid = document.getElementById('selectedGrid');
images.forEach((id) => {
  const cell = document.createElement('div');
  cell.className = 'cell';
  const img = document.createElement('img');
  img.src = `${folderPath}${id}.jpg`;
  img.alt = `Imagem ${id}`;
  cell.appendChild(img);
  grid.appendChild(cell);
});

function capturePage() {
  const gridElement = document.getElementById('selectedGrid'); // Captura apenas a div desejada
  htmlToImage.toPng(gridElement)
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'page-screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(function (error) {
      console.error('erro', error);
    });
}