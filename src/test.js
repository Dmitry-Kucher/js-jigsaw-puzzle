/**
 * Created by dima on 18/05/2017.
 */
import Image from './classes/Image';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0',
  });

  const imageSelector = '[jjp-2image]';
  const image = new Image(imageSelector);

  let i = 0;
  const pieces = image.getPieces();
  const piecesLength = Object.keys(pieces).length;
  for (const pieceIdentifier in pieces) {
    const last = (i === (piecesLength - 1));
    i += 1;

    fabric.Image.fromURL(pieces[pieceIdentifier].piece, (img) => {
      img.set('hasControls', false);
      canvas.add(img);
      if (last) {
        canvas.renderAll();
      }
    });
  }
});
