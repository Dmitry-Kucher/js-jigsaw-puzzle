/**
 * Created by dima on 18/05/2017.
 */
import Image from './classes/Image';
import Piece from './classes/Piece';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0',
  });

  const imageSelector = '[jjp-image]';
  const image = new Image(imageSelector);

  let i = 0;
  image.splitImageToPieces({ colNumbers: 8, rowNumbers: 8 });
  const pieces = image.getImagePieces();
  const piecesLength = Object.keys(pieces).length;
  for (const piecePosition in pieces) {
    const piece = pieces[piecePosition];
    const last = (i === (piecesLength - 1));
    i += 1;

    const drawCallback = Piece.drawCallback.bind(null, { canvas, last});

    fabric.Image.fromURL(piece.getContent(), drawCallback);
  }
});
