'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by dima on 09/06/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Piece = require('./Piece');

var _Piece2 = _interopRequireDefault(_Piece);

var _Pieces = require('./Pieces');

var _Pieces2 = _interopRequireDefault(_Pieces);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  function Image(selector) {
    _classCallCheck(this, Image);

    var imageSelector = 'img' + selector;
    this.imageElement = document.querySelector(imageSelector);
    if (!this.imageElement) {
      throw new Error('There is no img element with provided selector ' + imageSelector);
    }

    this.imageInstance = this.getFabricImageInstance();
    this.imagePieces = new _Pieces2.default();
  }

  _createClass(Image, [{
    key: 'getFabricImageInstance',
    value: function getFabricImageInstance() {
      return this.imageInstance || new fabric.Image(this.imageElement);
    }
  }, {
    key: 'splitImageToPieces',
    value: function splitImageToPieces() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$colLength = _ref.colLength,
          colLength = _ref$colLength === undefined ? 6 : _ref$colLength,
          _ref$rowLength = _ref.rowLength,
          rowLength = _ref$rowLength === undefined ? 6 : _ref$rowLength;

      var numberOfCols = colLength;
      var numberOfRows = rowLength;
      var colSize = this.imageInstance.getWidth() / numberOfCols;
      var rowSize = this.imageInstance.getHeight() / numberOfRows;
      for (var rows = 0; rows < numberOfRows; rows += 1) {
        for (var cols = 0; cols < numberOfCols; cols += 1) {
          var dataUrl = this.imageInstance.toDataURL({
            left: colSize * cols,
            top: rowSize * rows,
            width: colSize,
            height: rowSize
          });
          var piece = new _Piece2.default(dataUrl);
          piece.setSteps({ colLength: colLength, rowLength: rowLength });
          this.imagePieces.addPiece(piece);
        }
      }
    }
  }, {
    key: 'getImagePieces',
    value: function getImagePieces() {
      return this.imagePieces.getPieces();
    }
  }, {
    key: 'getImageElement',
    value: function getImageElement() {
      return this.imageElement;
    }
  }]);

  return Image;
}();

exports.default = Image;
//# sourceMappingURL=Image.js.map
