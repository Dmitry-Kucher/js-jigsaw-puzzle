'use strict';

var _Pieces = require('./classes/Pieces');

var _Pieces2 = _interopRequireDefault(_Pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {

  document.addEventListener('DOMContentLoaded', function () {
    var canvas = new fabric.Canvas('c', {
      renderOnAddRemove: false,
      backgroundColor: '#0f0'
    });

    var imageHTMLElement = document.querySelector('[jjp-image]');
    var imgInstance = new fabric.Image(imageHTMLElement);

    var pieces = new _Pieces2.default();
    var numberOfCols = 6;
    var numberOfRows = 6;
    var colSize = imgInstance.getWidth() / numberOfCols;
    var rowSize = imgInstance.getHeight() / numberOfRows;
    for (var cols = 0; cols < numberOfCols; cols += 1) {
      for (var rows = 0; rows < numberOfRows; rows += 1) {
        var dataUrl = imgInstance.toDataURL({
          left: colSize * cols,
          top: rowSize * rows,
          width: colSize,
          height: rowSize
        });
        var piece = new Piece(dataUrl);
        pieces.addPiece(piece);
      }
    }

    pieces.forEach(function (item) {
      console.log(item);
    });

    /*  for (let piece of pieces) {
     const last = (i === (pieces.length - 1));
      fabric.Image.fromURL(pieces[i], (img) => {
     img.set('hasControls', false);
     canvas.add(img);
     if (last) {
     canvas.renderAll();
     }
     });
     }*/
  });
} /**
   * Created by dima on 18/05/2017.
   */
// import Piece from './classes/Piece';
// import Pieces from './classes/Pieces';
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiY2FudmFzIiwiZmFicmljIiwiQ2FudmFzIiwicmVuZGVyT25BZGRSZW1vdmUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJpbWFnZUhUTUxFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImltZ0luc3RhbmNlIiwiSW1hZ2UiLCJwaWVjZXMiLCJudW1iZXJPZkNvbHMiLCJudW1iZXJPZlJvd3MiLCJjb2xTaXplIiwiZ2V0V2lkdGgiLCJyb3dTaXplIiwiZ2V0SGVpZ2h0IiwiY29scyIsInJvd3MiLCJkYXRhVXJsIiwidG9EYXRhVVJMIiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwicGllY2UiLCJQaWVjZSIsImFkZFBpZWNlIiwiZm9yRWFjaCIsIml0ZW0iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQSxJQUFHLEtBQUgsRUFBVTs7QUFFUkEsV0FBU0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsUUFBTUMsU0FBUyxJQUFJQyxPQUFPQyxNQUFYLENBQWtCLEdBQWxCLEVBQXVCO0FBQ3BDQyx5QkFBbUIsS0FEaUI7QUFFcENDLHVCQUFpQjtBQUZtQixLQUF2QixDQUFmOztBQUtBLFFBQU1DLG1CQUFtQlAsU0FBU1EsYUFBVCxDQUF1QixhQUF2QixDQUF6QjtBQUNBLFFBQU1DLGNBQWMsSUFBSU4sT0FBT08sS0FBWCxDQUFpQkgsZ0JBQWpCLENBQXBCOztBQUVBLFFBQU1JLFNBQVMsc0JBQWY7QUFDQSxRQUFNQyxlQUFlLENBQXJCO0FBQ0EsUUFBTUMsZUFBZSxDQUFyQjtBQUNBLFFBQU1DLFVBQVVMLFlBQVlNLFFBQVosS0FBeUJILFlBQXpDO0FBQ0EsUUFBTUksVUFBVVAsWUFBWVEsU0FBWixLQUEwQkosWUFBMUM7QUFDQSxTQUFLLElBQUlLLE9BQU8sQ0FBaEIsRUFBbUJBLE9BQU9OLFlBQTFCLEVBQXdDTSxRQUFRLENBQWhELEVBQW1EO0FBQ2pELFdBQUssSUFBSUMsT0FBTyxDQUFoQixFQUFtQkEsT0FBT04sWUFBMUIsRUFBd0NNLFFBQVEsQ0FBaEQsRUFBbUQ7QUFDakQsWUFBTUMsVUFBVVgsWUFBWVksU0FBWixDQUFzQjtBQUNwQ0MsZ0JBQU1SLFVBQVVJLElBRG9CO0FBRXBDSyxlQUFLUCxVQUFVRyxJQUZxQjtBQUdwQ0ssaUJBQU9WLE9BSDZCO0FBSXBDVyxrQkFBUVQ7QUFKNEIsU0FBdEIsQ0FBaEI7QUFNQSxZQUFNVSxRQUFRLElBQUlDLEtBQUosQ0FBVVAsT0FBVixDQUFkO0FBQ0FULGVBQU9pQixRQUFQLENBQWdCRixLQUFoQjtBQUNEO0FBQ0Y7O0FBRURmLFdBQU9rQixPQUFQLENBQWUsVUFBQ0MsSUFBRCxFQUFVO0FBQ3ZCQyxjQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDRCxLQUZEOztBQUlBOzs7Ozs7Ozs7O0FBV0QsR0ExQ0Q7QUEyQ0QsQyxDQXBERDs7O0FBR0E7QUFDQSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGRpbWEgb24gMTgvMDUvMjAxNy5cbiAqL1xuLy8gaW1wb3J0IFBpZWNlIGZyb20gJy4vY2xhc3Nlcy9QaWVjZSc7XG4vLyBpbXBvcnQgUGllY2VzIGZyb20gJy4vY2xhc3Nlcy9QaWVjZXMnO1xuaW1wb3J0IFBpZWNlcyBmcm9tICcuL2NsYXNzZXMvUGllY2VzJztcblxuaWYoZmFsc2UpIHtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IG5ldyBmYWJyaWMuQ2FudmFzKCdjJywge1xuICAgICAgcmVuZGVyT25BZGRSZW1vdmU6IGZhbHNlLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzBmMCcsXG4gICAgfSk7XG5cbiAgICBjb25zdCBpbWFnZUhUTUxFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2pqcC1pbWFnZV0nKTtcbiAgICBjb25zdCBpbWdJbnN0YW5jZSA9IG5ldyBmYWJyaWMuSW1hZ2UoaW1hZ2VIVE1MRWxlbWVudCk7XG5cbiAgICBjb25zdCBwaWVjZXMgPSBuZXcgUGllY2VzKCk7XG4gICAgY29uc3QgbnVtYmVyT2ZDb2xzID0gNjtcbiAgICBjb25zdCBudW1iZXJPZlJvd3MgPSA2O1xuICAgIGNvbnN0IGNvbFNpemUgPSBpbWdJbnN0YW5jZS5nZXRXaWR0aCgpIC8gbnVtYmVyT2ZDb2xzO1xuICAgIGNvbnN0IHJvd1NpemUgPSBpbWdJbnN0YW5jZS5nZXRIZWlnaHQoKSAvIG51bWJlck9mUm93cztcbiAgICBmb3IgKGxldCBjb2xzID0gMDsgY29scyA8IG51bWJlck9mQ29sczsgY29scyArPSAxKSB7XG4gICAgICBmb3IgKGxldCByb3dzID0gMDsgcm93cyA8IG51bWJlck9mUm93czsgcm93cyArPSAxKSB7XG4gICAgICAgIGNvbnN0IGRhdGFVcmwgPSBpbWdJbnN0YW5jZS50b0RhdGFVUkwoe1xuICAgICAgICAgIGxlZnQ6IGNvbFNpemUgKiBjb2xzLFxuICAgICAgICAgIHRvcDogcm93U2l6ZSAqIHJvd3MsXG4gICAgICAgICAgd2lkdGg6IGNvbFNpemUsXG4gICAgICAgICAgaGVpZ2h0OiByb3dTaXplLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcGllY2UgPSBuZXcgUGllY2UoZGF0YVVybCk7XG4gICAgICAgIHBpZWNlcy5hZGRQaWVjZShwaWVjZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGllY2VzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgIH0pO1xuXG4gICAgLyogIGZvciAobGV0IHBpZWNlIG9mIHBpZWNlcykge1xuICAgICBjb25zdCBsYXN0ID0gKGkgPT09IChwaWVjZXMubGVuZ3RoIC0gMSkpO1xuXG4gICAgIGZhYnJpYy5JbWFnZS5mcm9tVVJMKHBpZWNlc1tpXSwgKGltZykgPT4ge1xuICAgICBpbWcuc2V0KCdoYXNDb250cm9scycsIGZhbHNlKTtcbiAgICAgY2FudmFzLmFkZChpbWcpO1xuICAgICBpZiAobGFzdCkge1xuICAgICBjYW52YXMucmVuZGVyQWxsKCk7XG4gICAgIH1cbiAgICAgfSk7XG4gICAgIH0qL1xuICB9KTtcbn1cbiJdfQ==
