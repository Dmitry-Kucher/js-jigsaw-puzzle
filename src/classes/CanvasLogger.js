export default class CanvasLogger {
  constructor(options) {
    const defaultOptions = {};
    this.options = {
      ...defaultOptions,
      ...options,
    };
  }

  log(message) {
    const textMessage = message.toString();
    const canvas = this.options.canvas;
    const fabricjsTextObject = new fabric.Text(textMessage, { left: canvas.width - 100, top: 10 });
    canvas.add(fabricjsTextObject);
    canvas.renderAll();
  }
}
