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

  setSteps({ colLength, rowLength }) {
    if (!colLength || !rowLength) {
      throw new Error('Numbers of columns or rows is not defined');
    }
    this.horizontalStep = colLength;
    this.verticalSter = rowLength;
  }

  static drawCallback(additionalParams, img) {
    const { canvas, last, piecePositions } = additionalParams;
    const top = fabric.util.getRandomInt(0, 600);
    const left = fabric.util.getRandomInt(0, 600);

    img.set('hasControls', false);
    img.set('top', top);
    img.set('left', left);
    img.set('piecePositions', piecePositions);

    /*
    img.on('moving', () => {
      canvas.forEachObject((targ) => {
        const activeObject = canvas.getActiveObject();
        if (targ === activeObject || !activeObject) {
          return;
        }
        const diffLeft = activeObject.left - window.selectedObjectPositions.left;
        const diffTop = activeObject.top - window.selectedObjectPositions.top;
        // window.selectedObjectPositions = { left: activeObject.left, top: activeObject.top };
        console.log(diffLeft, diffTop);
        targ.set({ left: targ.left + diffLeft, top: targ.top + diffTop });
        // targ.setCoords();
        // canvas.renderAll();
      });
    });
    */

    canvas.add(img);
    if (last) {
      canvas.renderAll();
    }
  }
}
