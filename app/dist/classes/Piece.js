'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dima on 27/05/2017.
 */
var Piece = function () {
  function Piece(piece) {
    _classCallCheck(this, Piece);

    this.pieceContent = piece;
  }

  _createClass(Piece, [{
    key: 'getContent',
    value: function getContent() {
      return this.pieceContent;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(position) {
      this.position = position;
    }
  }, {
    key: 'getPosition',
    value: function getPosition() {
      return this.position;
    }
  }, {
    key: 'setSteps',
    value: function setSteps(_ref) {
      var colLength = _ref.colLength,
          rowLength = _ref.rowLength;

      if (!colLength || !rowLength) {
        throw new Error('Numbers of columns or rows is not defined');
      }
      this.horizontalStep = colLength;
      this.verticalSter = rowLength;
    }
  }], [{
    key: 'drawCallback',
    value: function drawCallback(additionalParams, img) {
      var canvas = additionalParams.canvas,
          last = additionalParams.last,
          piecePosition = additionalParams.piecePosition;

      var top = fabric.util.getRandomInt(0, 600);
      var left = fabric.util.getRandomInt(0, 600);

      img.set('hasControls', false);
      img.set('top', top);
      img.set('left', left);
      img.set('piecePosition', piecePosition);

      img.on('modified', function () {
        console.log(img.piecePosition);
      });

      canvas.add(img);
      if (last) {
        canvas.renderAll();
      }
    }
  }]);

  return Piece;
}();

exports.default = Piece;
//# sourceMappingURL=Piece.js.map
