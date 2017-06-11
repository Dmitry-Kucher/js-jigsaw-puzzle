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

  static drawCallback(additionalParams, img) {
    const { canvas, last } = additionalParams;
    const top = fabric.util.getRandomInt(0, 600);
    const left = fabric.util.getRandomInt(0, 600);

    img.set('hasControls', false);
    img.set('top', top);
    img.set('left', left);
    img.on('modified', ()=>{console.log('test')});

    canvas.add(img);
    if (last) {
      canvas.renderAll();
    }
  }
}
