'use strict';

/**
 * Created by dima on 18/05/2017.
 */
// import Image from ''

var image = new Image();

image.src = 'img/memory.jpg';

function cutImageUp(_ref) {
  var _ref$numOfCols = _ref.numOfCols,
      numOfCols = _ref$numOfCols === undefined ? 20 : _ref$numOfCols,
      _ref$numOfRows = _ref.numOfRows,
      numOfRows = _ref$numOfRows === undefined ? 20 : _ref$numOfRows;

  var imagePieces = [];
  var widthOfOnePiece = 50;
  var heightOfOnePiece = 50;

  for (var x = 0; x < numOfCols; x += 1) {
    for (var y = 0; y < numOfRows; y += 1) {
      var canvas = document.createElement('canvas');
      canvas.width = widthOfOnePiece;
      canvas.height = heightOfOnePiece;
      var context = canvas.getContext('2d');
      context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
      imagePieces.push(canvas.toDataURL());
    }
  }
  return imagePieces;

  // imagePieces now contains data urls of all the pieces of the image

  // load one piece onto the page
  var anImageElement = document.getElementById('myImageElementInTheDom');
  anImageElement.src = imagePieces[0];
}

image.onload = cutImageUp;