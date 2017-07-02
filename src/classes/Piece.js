/**
 * Created by dima on 02/07/2017.
 */
export default class Piece {
  constructor({ content, position } = {}) {
    if (typeof content === 'undefined' || typeof position === 'undefined') {
      throw Error('piece required content and position');
    }
    this.getContent = () => content;
    this.getPosition = () => position;
    return this.getContent();
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
