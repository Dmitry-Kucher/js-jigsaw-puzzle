/**
 * Created by dima on 02/07/2017.
 */
import Image from './Image';
import Gamefield from './Gamefield';
import Piece from './Piece';

export default class Gameloop {
  constructor(options) {
    if (!options.imageSelector) {
      throw Error('image selector is not defined');
    }
    let canvas;
    this.getOptions = () => options;

    this.getCanvas = () => canvas;
    this.setCanvas = (internalCanvas) => {
      canvas = internalCanvas;
    };
  }

  start() {
    document.addEventListener('DOMContentLoaded', () => {
      const options = this.getOptions();
      const gamefield = new Gamefield({ canvasId: options.canvasId });
      const canvas = gamefield.getCanvas();
      this.setCanvas(canvas);
      this.drawPieces();
      canvas.on('object:modified', () => {
        const activeObject = canvas.getActiveObject();
        const activeObjectNeighbours = this.getNeighbours(activeObject);
        canvas.forEachObject((potential) => {
          if (potential === activeObject || !activeObject) {
            return;
          }

          if (!this.isClosest(activeObject, potential)) {
            return;
          }

          if (Gameloop.isNeighbour(activeObjectNeighbours, potential)) {
            Gameloop.drawGroup(activeObjectNeighbours, potential);
          }
        });
      });
    });
  }

  drawPieces() {
    const options = this.getOptions();
    const canvas = this.getCanvas();
    const image = new Image(options.imageSelector);

    image.splitImageToPieces({ colLength: options.cols, rowLength: options.rows });
    const pieces = image.getImagePieces();

    pieces.forEach((piece, piecePosition) => {
      const last = piecePosition === (pieces.length - 1);
      const drawCallback = Gameloop.drawCallback.bind(null, { canvas, last, piecePosition });
      fabric.Image.fromURL(piece.getContent(), drawCallback);
    });
  }

  static drawCallback(additionalParams, img) {
    const { canvas, last, piecePosition } = additionalParams;
    const top = fabric.util.getRandomInt(0, 600);
    const left = fabric.util.getRandomInt(0, 600);

    img.set('hasControls', false);
    img.set('top', top);
    img.set('left', left);
    img.set('piecePosition', piecePosition);

    canvas.add(img);
    if (last) {
      canvas.renderAll();
    }
  }

  getNeighbours(examObject) {
    const neighbours = [];
    if (examObject) {
      let piecePositions = [];
      if (typeof examObject.piecePosition !== 'undefined') {
        piecePositions.push(examObject.piecePosition);
      } else if (examObject.piecePositions instanceof Array) {
        piecePositions = examObject.piecePositions;
      } else {
        throw Error('examObject doesn`t contain any info about piece position');
      }
      const options = this.getOptions();
      piecePositions.forEach((piecePosition) => {
        const actualRow = Math.floor(piecePosition / options.cols);
        const actualCol = piecePosition % options.cols;
        if (actualRow !== 0) {
          neighbours.push((piecePosition - options.cols));
        }
        if (actualRow < (options.rows - 1)) {
          neighbours.push((piecePosition + options.cols));
        }

        if (actualCol !== 0) {
          neighbours.push((piecePosition - 1));
        }
        if (actualCol < (options.cols - 1)) {
          neighbours.push((piecePosition + 1));
        }
      });
    }
    return neighbours;
  }

  isClosest(current, potential) {
    const activeObjectItems = current instanceof fabric.Group ? current.getObjects() : [current];
    const potentialItems = potential instanceof fabric.Group ? potential.getObjects() : [potential];

    for (const activeItem of activeObjectItems) {
      for (const potentialItem of potentialItems) {
        if (this.isPiecesClose(activeItem, potentialItem)) {
          return true;
        }
      }
    }
    return false;
  }

  isPiecesClose(firstPiece, secondPiece) {
    const options = this.getOptions();
    const closestSensitivity = options.neighboursSensitivity;
    let xDifference = Math.abs(firstPiece.aCoords.tr.x - secondPiece.aCoords.tl.x);
    let yDifference = Math.abs(firstPiece.aCoords.tr.y - secondPiece.aCoords.tl.y);
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

  static isNeighbour(activeObjectNeighbours, potential) {
    if (potential instanceof fabric.Group) {
      for (const potentialItem of potential.getObjects()) {
        if (activeObjectNeighbours.indexOf(potentialItem.piecePosition) !== -1) {
          return true;
        }
      }
    } else if (potential.piecePosition) {
      return activeObjectNeighbours.indexOf(potential.piecePosition) !== -1;
    }
    return false;
  }

  static drawGroup(activObject, potential) {
    
  }
}
