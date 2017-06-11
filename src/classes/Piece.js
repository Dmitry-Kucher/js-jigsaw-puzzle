/**
 * Created by dima on 27/05/2017.
 */
export default class Piece {
  constructor(piece) {
    this.pieceContent = piece;
  }

  getContent() {
    return this.pieceContent;
  }

  setPosition(position) {
    this.position = position;
  }

  getPosition() {
    return this.position;
  }

  setSteps({ colNumbers, rowNumbers }) {
    if (!colNumbers || !rowNumbers) {
      throw new Error('Numbers of columns or rows is not defined');
    }
    this.horizontalStep = colNumbers;
    this.verticalSter = rowNumbers;
  }

  static drawCallback(additionalParams, img) {
    const { canvas, last, piecePosition } = additionalParams;
    const top = fabric.util.getRandomInt(0, 600);
    const left = fabric.util.getRandomInt(0, 600);

    img.set('hasControls', false);
    img.set('top', top);
    img.set('left', left);
    img.set('piecePosition', piecePosition);

    img.on('modified', () => {console.log(img.piecePosition)});

    canvas.add(img);
    if (last) {
      canvas.renderAll();
    }
  }
}
