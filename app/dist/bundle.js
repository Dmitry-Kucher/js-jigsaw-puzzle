(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Piece = require('./Piece');

var _Piece2 = _interopRequireDefault(_Piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * Created by dima on 02/07/2017.
                                                                                                                                                           */


var Composition = function Composition() {
  _classCallCheck(this, Composition);

  var pieces = [];

  this.addPiece = function (piece) {
    if (!(piece instanceof _Piece2.default)) {
      throw Error('Composition can`t store anything except except instance of Piece');
    }
    pieces.push(piece);
  };

  this.getPieces = function () {
    return pieces;
  };
};

exports.default = Composition;

},{"./Piece":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dima on 02/07/2017.
 */
var Gamefield = function () {
  function Gamefield() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$width = _ref.width,
        width = _ref$width === undefined ? 1024 : _ref$width,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 1024 : _ref$height,
        _ref$canvasId = _ref.canvasId,
        canvasId = _ref$canvasId === undefined ? 'c' : _ref$canvasId;

    _classCallCheck(this, Gamefield);

    var canvas = void 0;

    this.getWidth = function () {
      return width;
    };
    this.getHeight = function () {
      return height;
    };
    this.getCanvasId = function () {
      return canvasId;
    };
    this.setCanvas = function (canvasField) {
      canvas = canvasField;
    };
    this.getCanvas = function () {
      return canvas;
    };

    this.createField();
  }

  _createClass(Gamefield, [{
    key: 'createField',
    value: function createField() {
      var canvasId = this.getCanvasId();
      if (!document.querySelector('#' + canvasId)) {
        console.log('canvas doesn`t exists');
        // create canvas element if it doesn't exists;
        var canvasElement = document.createElement('canvas');
        canvasElement.id = canvasId;
        canvasElement.width = this.getWidth();
        canvasElement.height = this.getHeight();
        document.body.appendChild(canvasElement);
      }
      var canvas = new fabric.Canvas(canvasId, {
        renderOnAddRemove: false,
        selection: false,
        backgroundColor: '#0f0',
        width: this.getWidth(),
        height: this.getHeight()
      });
      this.setCanvas(canvas);
    }
  }]);

  return Gamefield;
}();

exports.default = Gamefield;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by dima on 02/07/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Image = require('./Image');

var _Image2 = _interopRequireDefault(_Image);

var _Gamefield = require('./Gamefield');

var _Gamefield2 = _interopRequireDefault(_Gamefield);

var _RecalculatedObjectsGroup = require('./RecalculatedObjectsGroup');

var _RecalculatedObjectsGroup2 = _interopRequireDefault(_RecalculatedObjectsGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gameloop = function () {
  function Gameloop(options) {
    _classCallCheck(this, Gameloop);

    if (!options.imageSelector) {
      throw Error('image selector is not defined');
    }
    var canvas = void 0;
    this.getOptions = function () {
      return options;
    };

    this.getCanvas = function () {
      return canvas;
    };
    this.setCanvas = function (internalCanvas) {
      canvas = internalCanvas;
    };
  }

  _createClass(Gameloop, [{
    key: 'start',
    value: function start() {
      var _this = this;

      window.addEventListener('load', function () {
        var options = _this.getOptions();
        var gameField = new _Gamefield2.default({
          width: 1420,
          height: 2048,
          canvasId: options.canvasId
        });
        var canvas = gameField.getCanvas();
        _this.setCanvas(canvas);
        _this.drawPieces(options.scale);
        canvas.on('object:selected', function () {
          if (window.debugApp) {
            var activeObject = canvas.getActiveObject();
            console.log(activeObject);
          }
        });
        canvas.on('object:modified', function () {
          var activeObject = canvas.getActiveObject();
          if (activeObject instanceof fabric.Path) {
            return;
          }
          activeObject.trigger('recalculate');
          var activeObjectNeighbours = _this.getNeighbours(activeObject);
          var isMerged = false;
          canvas.forEachObject(function (potential) {
            if (isMerged) {
              return;
            }
            if (potential === activeObject || !activeObject) {
              return;
            }

            if (Gameloop.isNeighbour(activeObjectNeighbours, potential)) {
              if (_this.isClosest(activeObject, potential)) {
                isMerged = true;
                _this.drawGroup(activeObject, potential);
                canvas.remove(activeObject);
                canvas.remove(potential);
              }
            }
          });
        });
      });
    }
  }, {
    key: 'drawSvg',
    value: function drawSvg(img) {
      var canvas = this.getCanvas();
      var path = new fabric.Path('M85.446,52.284c-3.901,0-5.223-2.17-5.773-3.058c-1.146-1.85-3.291-3.455-5.469-4.268c-1.049-0.251-2.159,0.377-2.165,2.342  v24.737h-0.001v0.001H46.287c-1.978,0.002-2.604,1.122-2.347,2.177c0.815,2.173,2.418,4.312,4.264,5.457  c0.889,0.551,3.058,1.872,3.058,5.772c0,5.277-5.934,9.555-13.253,9.555c-7.32,0-13.254-4.277-13.254-9.555  c0-3.901,2.17-5.222,3.059-5.772c1.848-1.147,3.453-3.291,4.268-5.469c0.249-1.049-0.379-2.159-2.342-2.165H5V47.314  c0-1.977,1.114-2.606,2.166-2.355c2.178,0.812,4.322,2.418,5.47,4.268c0.551,0.888,1.871,3.058,5.772,3.058  c5.278,0,9.556-5.934,9.556-13.254c0-7.319-4.277-13.253-9.556-13.253c-3.901,0-5.222,2.17-5.772,3.059  c-1.146,1.845-3.284,3.447-5.458,4.263C6.122,33.356,5,32.727,5,30.745V5h67.038v0.001L72.039,5v25.759  c0.006,1.97,1.124,2.597,2.177,2.34c2.173-0.815,4.312-2.418,5.457-4.263c0.551-0.889,1.872-3.059,5.773-3.059  c5.276,0,9.554,5.934,9.554,13.253C95,46.351,90.723,52.284,85.446,52.284z', {
        fill: new fabric.Pattern({
          source: img
        })
      });
      path.set({ top: 150, left: 150 });
      canvas.add(path);
      canvas.renderAll();
    }
  }, {
    key: 'drawPieces',
    value: function drawPieces() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var options = this.getOptions();
      var canvas = this.getCanvas();
      var image = new _Image2.default(options.imageSelector);

      image.splitImageToPieces({ colLength: options.cols, rowLength: options.rows });
      var pieces = image.getImagePieces();

      pieces.forEach(function (piece, piecePosition) {
        var last = piecePosition === pieces.length - 1;
        var drawCallback = Gameloop.drawCallback.bind(null, { canvas: canvas, last: last, piecePosition: piecePosition, scale: scale });
        // const drawSvg = this.drawSvg.bind(this);
        fabric.Image.fromURL(piece.getContent(), drawCallback);
        // fabric.util.loadImage(piece.getContent(), drawSvg);
      });
    }
  }, {
    key: 'getNeighbours',
    value: function getNeighbours(examObject) {
      var neighbours = [];
      if (examObject) {
        var piecePositions = [];
        if (typeof examObject.piecePosition !== 'undefined') {
          piecePositions.push(examObject.piecePosition);
        } else if (examObject.piecePositions instanceof Array) {
          piecePositions = examObject.piecePositions;
        } else {
          throw Error('examObject doesn`t contain any info about piece position');
        }
        var options = this.getOptions();
        piecePositions.forEach(function (piecePosition) {
          var actualRow = Math.floor(piecePosition / options.cols);
          var actualCol = piecePosition % options.cols;
          if (actualRow !== 0) {
            neighbours.push(piecePosition - options.cols);
          }
          if (actualRow < options.rows - 1) {
            neighbours.push(piecePosition + options.cols);
          }

          if (actualCol !== 0) {
            neighbours.push(piecePosition - 1);
          }
          if (actualCol < options.cols - 1) {
            neighbours.push(piecePosition + 1);
          }
        });
      }
      return neighbours;
    }
  }, {
    key: 'isClosest',
    value: function isClosest(current, potential) {
      var activeObjectItems = current instanceof fabric.Group ? current.getObjects() : [current];
      var potentialItems = potential instanceof fabric.Group ? potential.getObjects() : [potential];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = activeObjectItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var activeItem = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = potentialItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var potentialItem = _step2.value;

              if (this.isPiecesClose(activeItem, potentialItem)) {
                return true;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }, {
    key: 'isPiecesClose',
    value: function isPiecesClose(firstPiece, secondPiece) {
      var options = this.getOptions();
      var closestSensitivity = options.neighboursSensitivity;
      var xDifference = Math.abs(firstPiece.aCoords.tr.x - secondPiece.aCoords.tl.x);
      var yDifference = Math.abs(firstPiece.aCoords.tr.y - secondPiece.aCoords.tl.y);
      if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
        return true;
      }

      xDifference = Math.abs(firstPiece.aCoords.tl.x - secondPiece.aCoords.tr.x);
      yDifference = Math.abs(firstPiece.aCoords.tl.y - secondPiece.aCoords.tr.y);
      if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
        return true;
      }

      xDifference = Math.abs(firstPiece.aCoords.bl.x - secondPiece.aCoords.tl.x);
      yDifference = Math.abs(firstPiece.aCoords.bl.y - secondPiece.aCoords.tl.y);
      if (xDifference < closestSensitivity && yDifference < closestSensitivity) {
        return true;
      }

      xDifference = Math.abs(firstPiece.aCoords.tl.x - secondPiece.aCoords.bl.x);
      yDifference = Math.abs(firstPiece.aCoords.tl.y - secondPiece.aCoords.bl.y);
      return xDifference < closestSensitivity && yDifference < closestSensitivity;
    }
  }, {
    key: 'drawGroup',
    value: function drawGroup(activeObject, potential) {
      var _this2 = this;

      var canvas = this.getCanvas();
      var groupItems = [];
      var piecePositions = [];
      var options = this.getOptions();
      var baseElements = potential instanceof fabric.Group ? potential.getObjects() : [potential];
      var activeObjects = activeObject instanceof fabric.Group ? activeObject.getObjects() : [activeObject];

      // baseElement is the potential element itself or first element from group;
      var baseElement = baseElements[0];

      var _Gameloop$extractCoor = Gameloop.extractCoordinates(baseElement, options.cols),
          col = _Gameloop$extractCoor.col,
          row = _Gameloop$extractCoor.row;

      var zeroDisplacementX = col * baseElement.getWidth();
      var zeroDisplacementY = row * baseElement.getHeight();
      var xDisplacement = baseElement.left - zeroDisplacementX;
      var yDisplacement = baseElement.top - zeroDisplacementY;

      var itemDecompose = function itemDecompose(activePiece) {
        _this2.recalculatePiecePositions({
          obj: activePiece,
          xDisplacement: xDisplacement,
          yDisplacement: yDisplacement
        });
        piecePositions.push(activePiece.piecePosition);
        groupItems.push(activePiece);
      };

      activeObjects.forEach(itemDecompose);
      baseElements.forEach(itemDecompose);

      var itemsRecalculableGroup = new _RecalculatedObjectsGroup2.default(groupItems, {
        hasControls: false,
        hasBorders: false
      });
      itemsRecalculableGroup.set('piecePositions', piecePositions);
      canvas.add(itemsRecalculableGroup);
      canvas.renderAll();

      // recalculated group objects coordinates
      // it prevents to disappearing group object after merge
      itemsRecalculableGroup.trigger('selected');
      itemsRecalculableGroup.trigger('recalculate');
    }
  }, {
    key: 'recalculatePiecePositions',
    value: function recalculatePiecePositions(_ref) {
      var obj = _ref.obj,
          xDisplacement = _ref.xDisplacement,
          yDisplacement = _ref.yDisplacement;

      var options = this.getOptions();

      var _Gameloop$extractCoor2 = Gameloop.extractCoordinates(obj, options.cols),
          col = _Gameloop$extractCoor2.col,
          row = _Gameloop$extractCoor2.row;

      var zeroDisplacementTop = row * obj.getHeight();
      var zeroDisplacementLeft = col * obj.getWidth();
      var recalculatedTop = zeroDisplacementTop + yDisplacement;
      var recalculatedLeft = zeroDisplacementLeft + xDisplacement;
      obj.setTop(recalculatedTop);
      obj.setLeft(recalculatedLeft);
      obj.setCoords();
    }
  }], [{
    key: 'drawCallback',
    value: function drawCallback(additionalParams, img) {
      var canvas = additionalParams.canvas,
          last = additionalParams.last,
          piecePosition = additionalParams.piecePosition,
          scale = additionalParams.scale;

      var top = fabric.util.getRandomInt(0, 300);
      var left = fabric.util.getRandomInt(0, 300);

      img.set('hasControls', false);
      img.set('hasBorders', false);
      img.set('top', top);
      img.set('left', left);
      img.set('piecePosition', piecePosition);
      img.scale(scale);

      canvas.add(img);
      if (last) {
        canvas.renderAll();
      }
    }
  }, {
    key: 'isNeighbour',
    value: function isNeighbour(activeObjectNeighbours, potential) {
      if (potential instanceof fabric.Group) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = potential.getObjects()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var potentialItem = _step3.value;

            if (activeObjectNeighbours.indexOf(potentialItem.piecePosition) !== -1) {
              return true;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      } else if (typeof potential.piecePosition !== 'undefined') {
        return activeObjectNeighbours.indexOf(potential.piecePosition) !== -1;
      }
      return false;
    }
  }, {
    key: 'extractCoordinates',
    value: function extractCoordinates(obj, cols) {
      var col = obj.piecePosition % cols;
      var row = Math.floor(obj.piecePosition / cols);
      return { col: col, row: row };
    }
  }]);

  return Gameloop;
}();

exports.default = Gameloop;

},{"./Gamefield":2,"./Image":4,"./RecalculatedObjectsGroup":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by dima on 09/06/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Piece = require('./Piece');

var _Piece2 = _interopRequireDefault(_Piece);

var _Composition = require('./Composition');

var _Composition2 = _interopRequireDefault(_Composition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  function Image(selector) {
    _classCallCheck(this, Image);

    var imageSelector = 'img' + selector;
    this.imageElement = document.querySelector(imageSelector);
    if (!this.imageElement) {
      throw Error('There is no img element with provided selector ' + imageSelector);
    }

    this.imageInstance = this.getFabricImageInstance();
    this.imagePieces = new _Composition2.default();
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

      var colSize = this.imageInstance.getWidth() / colLength;
      var rowSize = this.imageInstance.getHeight() / rowLength;
      for (var row = 0; row < rowLength; row += 1) {
        for (var col = 0; col < colLength; col += 1) {
          var dataUrl = this.imageInstance.toDataURL({
            left: colSize * col,
            top: rowSize * row,
            width: colSize,
            height: rowSize
          });
          var pieceOptions = {
            content: dataUrl,
            position: row * col
          };
          var piece = new _Piece2.default(pieceOptions);
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

},{"./Composition":1,"./Piece":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dima on 02/07/2017.
 */
var Piece = function () {
  function Piece() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        content = _ref.content,
        position = _ref.position;

    _classCallCheck(this, Piece);

    if (typeof content === 'undefined' || typeof position === 'undefined') {
      throw Error('piece required content and position');
    }
    this.getContent = function () {
      return content;
    };
    this.getPosition = function () {
      return position;
    };
    return this.getContent();
  }

  _createClass(Piece, [{
    key: 'getRow',
    value: function getRow(cols) {
      return Math.floor(this.getPosition() / cols);
    }
  }, {
    key: 'getCol',
    value: function getCol(cols) {
      return this.getPosition() % cols;
    }
  }]);

  return Piece;
}();

exports.default = Piece;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by dima on 07/07/2017.
 */
var RecalculatedObjectsGroup = function () {
  function RecalculatedObjectsGroup(groupItems) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RecalculatedObjectsGroup);

    if (!Array.isArray(groupItems)) {
      throw Error('Group Items must be an array');
    }
    var group = new fabric.Group(groupItems, options);
    group.on('selected', this.onSelected);
    group.on('recalculate', this.onModified);

    group.recalculateACoords = this.recalculateACoords;
    group.onModified = this.onModified;
    return group;
  }

  _createClass(RecalculatedObjectsGroup, [{
    key: 'onSelected',
    value: function onSelected() {
      this.selectedTop = this.top;
      this.selectedLeft = this.left;
    }
  }, {
    key: 'onModified',
    value: function onModified() {
      var _this = this;

      var groupObjects = this.getObjects();
      groupObjects.forEach(function (groupItem) {
        _this.recalculateACoords(groupItem);
      });
    }
  }, {
    key: 'recalculateACoords',
    value: function recalculateACoords(item) {
      var coords = {};
      var itemCoords = item.aCoords;
      var x = this.left - this.selectedLeft;
      var y = this.top - this.selectedTop;
      var offset = { x: x, y: y };

      coords.tr = new fabric.Point(itemCoords.tr.x + offset.x, itemCoords.tr.y + offset.y);
      coords.tl = new fabric.Point(itemCoords.tl.x + offset.x, itemCoords.tl.y + offset.y);
      coords.br = new fabric.Point(itemCoords.br.x + offset.x, itemCoords.br.y + offset.y);
      coords.bl = new fabric.Point(itemCoords.bl.x + offset.x, itemCoords.bl.y + offset.y);
      item.aCoords = coords;
      item.top = coords.tl.y;
      item.left = coords.tl.x;
    }
  }]);

  return RecalculatedObjectsGroup;
}();

exports.default = RecalculatedObjectsGroup;

},{}],7:[function(require,module,exports){
'use strict';

var _Gameloop = require('./classes/Gameloop');

var _Gameloop2 = _interopRequireDefault(_Gameloop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  canvasId: 'c',
  rows: 6,
  cols: 6,
  scale: 0.8,
  imageSelector: '[jjp-image]',
  neighboursSensitivity: 20
}; /**
    * Created by dima on 18/05/2017.
    */

var gameLoop = new _Gameloop2.default(options);

gameLoop.start();

},{"./classes/Gameloop":3}]},{},[7])

//# sourceMappingURL=bundle.js.map
