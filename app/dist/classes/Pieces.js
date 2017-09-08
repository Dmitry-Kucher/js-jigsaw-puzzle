'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by dima on 27/05/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Piece = require('./Piece');

var _Piece2 = _interopRequireDefault(_Piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pieces = function () {
  function Pieces() {
    _classCallCheck(this, Pieces);

    this.pieces = Object.create(null); // collection of pieces
  }

  _createClass(Pieces, [{
    key: 'addPiece',
    value: function addPiece(piece) {
      if (piece instanceof _Piece2.default) {
        var piecePosition = Object.keys(this.pieces).length;
        piece.setPosition(piecePosition);
        this.pieces[piecePosition] = piece;
      } else {
        throw new Error('Piece isn\'t instance of Piece');
      }
    }
  }, {
    key: 'getPieces',
    value: function getPieces() {
      return this.pieces;
    }
  }], [{
    key: 'isNeighbours',
    value: function isNeighbours(_ref) {
      var colLength = _ref.colLength,
          currentElementPosition = _ref.currentElementPosition,
          targetElementPosition = _ref.targetElementPosition;

      var params = {
        colLength: colLength,
        currentElementPosition: currentElementPosition,
        targetElementPosition: targetElementPosition
      };
      return Pieces.isVerticalNeighbours(params) || Pieces.isHorizontalNeighbours(params);
    }
  }, {
    key: 'isVerticalNeighbours',
    value: function isVerticalNeighbours(_ref2) {
      var colLength = _ref2.colLength,
          currentElementPosition = _ref2.currentElementPosition,
          targetElementPosition = _ref2.targetElementPosition;

      var positionsDiff = Math.abs(currentElementPosition - targetElementPosition);

      return positionsDiff === colLength;
    }
  }, {
    key: 'isHorizontalNeighbours',
    value: function isHorizontalNeighbours(_ref3) {
      var colLength = _ref3.colLength,
          currentElementPosition = _ref3.currentElementPosition,
          targetElementPosition = _ref3.targetElementPosition;

      var positionsDiff = Math.abs(currentElementPosition - targetElementPosition);

      if (positionsDiff === 1) {
        if (currentElementPosition - targetElementPosition > 0) {
          var currentElementPositionRemainder = currentElementPosition % colLength;
          return currentElementPositionRemainder !== 0;
        }

        var targetElementPositionRemainder = targetElementPosition % colLength;
        return targetElementPositionRemainder !== 0;
      }

      return false;
    }
  }]);

  return Pieces;
}();

exports.default = Pieces;
//# sourceMappingURL=Pieces.js.map
