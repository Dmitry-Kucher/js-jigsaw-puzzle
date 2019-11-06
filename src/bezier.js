import { Graphics } from '@pixi/graphics';

function drawBezierWithLines(
  {
    point1 = { x: 0, y: 0 },
    point2 = { x: 0, y: 0 },
    point3 = { x: 0, y: 0 },
    position = { x: 0, y: 0 },
    rotate = 0,
    debug = false,
  },
) {
  const piece = {};
  if (debug) {
    const line = new Graphics();
    line.lineStyle(5, 0xAAAAAA, 1);
    line.moveTo(0, 0);
    line.lineTo(point1.x, point1.y);
    line.lineTo(point2.x, point2.y);
    line.lineTo(point3.x, point3.y);

    line.position = position;
    line.angle = rotate;
    piece.line = line;
  }

  const bezier = new Graphics();
  bezier.beginFill(0xeeeeee, 0.5);
  bezier.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  bezier.position = position;
  bezier.angle = rotate;
  piece.bezier = bezier;

  return piece;
}

export { drawBezierWithLines };
