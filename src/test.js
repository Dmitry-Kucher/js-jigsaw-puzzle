/**
 * Created by dima on 18/05/2017.
 */
// import Image from ''

/* const image = new Image();

image.src = 'img/memory.jpg';

function cutImageUp({ numOfCols = 20, numOfRows = 20 }) {
  const imagePieces = [];
  const widthOfOnePiece = 50;
  const heightOfOnePiece = 50;

  for (let x = 0; x < numOfCols; x += 1) {
    for (let y = 0; y < numOfRows; y += 1) {
      const canvas = document.createElement('canvas');
      canvas.width = widthOfOnePiece;
      canvas.height = heightOfOnePiece;
      const context = canvas.getContext('2d');
      context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
      imagePieces.push(canvas.toDataURL());
    }
  }
  return imagePieces;

  // imagePieces now contains data urls of all the pieces of the image

  // load one piece onto the page
  const anImageElement = document.getElementById('myImageElementInTheDom');
  anImageElement.src = imagePieces[0];
}

image.onload = cutImageUp;*/

document.addEventListener('DOMContentLoaded', (event) => {
  const canvas = new fabric.Canvas('c');

  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20,
    hasControls: false
  });

  fabric.Image.fromURL('img/memory.jpg', function(img) {
    img.set({
      clipTo: function(ctx) {
        ctx.rect(-512, -100, 200, 200);
        ctx.rect(0, -100, 200, 200);
      }
    });
    canvas.add(img);
  });
  // canvas.add(rect);
});
