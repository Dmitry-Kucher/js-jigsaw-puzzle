'use strict';

var _Image = require('./classes/Image');

var _Image2 = _interopRequireDefault(_Image);

var _Piece = require('./classes/Piece');

var _Piece2 = _interopRequireDefault(_Piece);

var _Pieces = require('./classes/Pieces');

var _Pieces2 = _interopRequireDefault(_Pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var collisionValue = 48;
  var canvas = new fabric.Canvas('c', {
    renderOnAddRemove: false,
    backgroundColor: '#0f0'
  });

  var imageSelector = '[jjp-image]';
  var image = new _Image2.default(imageSelector);
  var colLength = 8;
  var rowLength = 8;

  var i = 0;
  image.splitImageToPieces({ colLength: colLength, rowLength: rowLength });
  var pieces = image.getImagePieces();
  var piecesLength = Object.keys(pieces).length;
  for (var piecePosition in pieces) {
    var piece = pieces[piecePosition];
    var last = i === piecesLength - 1;
    i += 1;

    var drawCallback = _Piece2.default.drawCallback.bind(null, { canvas: canvas, last: last, piecePosition: piecePosition });

    fabric.Image.fromURL(piece.getContent(), drawCallback);
  }

  canvas.on('object:modified', function () {
    canvas.forEachObject(function (targ) {
      var activeObject = canvas.getActiveObject();
      if (targ === activeObject || !activeObject) {
        return;
      }
      var positionsData = {
        colLength: colLength,
        currentElementPosition: activeObject.piecePosition,
        targetElementPosition: targ.piecePosition
      };

      var left = void 0;
      var top = void 0;
      var groupLeft = void 0;
      var groupTop = void 0;
      if (_Pieces2.default.isHorizontalNeighbours(positionsData)) {
        var verticalDiff = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.tl.y);
        var verticalPercent = 50;

        if (verticalDiff < verticalPercent / 100 * activeObject.height) {
          var fromLeft = Math.abs(activeObject.aCoords.tr.x - targ.aCoords.tl.x);
          var fromRight = Math.abs(activeObject.aCoords.tl.x - targ.aCoords.tr.x);

          if (fromLeft < collisionValue) {
            left = targ.aCoords.tl.x - activeObject.width;
            top = targ.aCoords.tl.y;
            groupLeft = left;
            groupTop = top;
          } else if (fromRight < collisionValue) {
            left = targ.aCoords.tr.x;
            top = targ.aCoords.tl.y;
            groupLeft = targ.aCoords.tl.x;
            groupTop = top;
          }
        }
      }
      if (_Pieces2.default.isVerticalNeighbours(positionsData)) {
        var horizontalDiff = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.tl.y);
        var horizontalPercent = 50;

        if (horizontalDiff < horizontalPercent / 100 * activeObject.width) {
          var fromTop = Math.abs(activeObject.aCoords.bl.y - targ.aCoords.tl.y);
          var fromBottom = Math.abs(activeObject.aCoords.tl.y - targ.aCoords.bl.y);

          if (fromTop < collisionValue) {
            left = targ.aCoords.bl.x;
            top = targ.aCoords.tl.y - activeObject.height;
            groupLeft = left;
            groupTop = top;
          } else if (fromBottom < collisionValue) {
            left = targ.aCoords.bl.x;
            top = targ.aCoords.bl.y;
            groupLeft = left;
            groupTop = targ.aCoords.tl.y;
          }
        }
      }

      if (left || top) {
        activeObject.left = left;
        activeObject.top = top;
      }

      if (groupLeft || groupTop) {
        var testGroup = new fabric.Group([activeObject, targ], {
          left: groupLeft,
          top: groupTop,
          hasControls: false
        });

        canvas.add(testGroup);
        canvas.remove(activeObject);
        canvas.remove(targ);
      }
    });
  });
}); /**
     * Created by dima on 18/05/2017.
     */
//# sourceMappingURL=test.js.map
