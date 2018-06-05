/**
 * Created by dima on 02/07/2017.
 */
export default class Gamefield {
  constructor({ width = 1024, height = 1024, canvasId = 'c' } = {}) {
    let canvas;

    this.getWidth = () => width;
    this.getHeight = () => height;
    this.getCanvasId = () => canvasId;
    this.setCanvas = (canvasField) => {
      canvas = canvasField;
    };
    this.getCanvas = () => canvas;

    this.createField();
  }

  createField() {
    const canvasId = this.getCanvasId();
    if (!document.querySelector(`#${canvasId}`)) {
      console.log('canvas doesn`t exists');
      // create canvas element if it doesn't exists;
      const canvasElement = document.createElement('canvas');
      canvasElement.id = canvasId;
      canvasElement.width = this.getWidth();
      canvasElement.height = this.getHeight();
      document.body.appendChild(canvasElement);
    }
    const canvas = new fabric.Canvas(canvasId, {
      renderOnAddRemove: false,
      backgroundColor: '#0f0',
      width: this.getWidth(),
      height: this.getHeight(),
    });
    this.setCanvas(canvas);
  }
}
