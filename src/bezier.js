
var app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x2c3e50
});
document.body.appendChild(app.view);

const line = new PIXI.Graphics();
line.lineStyle(5, 0xAAAAAA, 1);
line.moveTo(0,0);
line.lineTo(-200, 200);
line.lineTo(300, 200);
line.lineTo(100, 0);

line.position.x = 200;
line.position.y = 200;

const bezier = new PIXI.Graphics();

bezier.lineStyle(5, 0xAA0000, 1);
bezier.beginFill(0xeeeeee);
bezier.bezierCurveTo(-200, 200, 300, 200, 100, 400);
bezier.bezierCurveTo(-200, 200, 300, 200, 0, 0);
bezier.lineTo(100,400);

bezier.position.x = 200;
bezier.position.y = 200;

function drawBezierWithLines(point1, point2, point3, position = {x: 0, y: 0}, rotate = 0){
  const line = new PIXI.Graphics();
  line.lineStyle(5, 0xAAAAAA, 1);
  line.moveTo(0,0);
  line.lineTo(point1.x, point1.y);
  line.lineTo(point2.x, point2.y);
  line.lineTo(point3.x, point3.y);

  line.position = position;
  line.angle = rotate;

  const bezier = new PIXI.Graphics();

  // bezier.lineStyle(5, 0xAA0000, 1);
  bezier.beginFill(0xeeeeee, 0.5);
  bezier.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);

  bezier.position = position;
  bezier.angle = rotate;

  app.stage.addChild(line);
  app.stage.addChild(bezier);
}

let point1 = {x: -200, y: 200};
let point2 = {x: 300, y: 200};
let point3 = {x: 100, y: 0};
let position = {x: 250, y: 250}
drawBezierWithLines(point1, point2, point3, position);
drawBezierWithLines(point1, point2, point3, {x: 550, y: 550}, 90);
drawBezierWithLines(point1, point2, point3, {x: 550, y: 550}, -90);
drawBezierWithLines(point1, point2, point3, {x: 550, y: 250}, 180);

