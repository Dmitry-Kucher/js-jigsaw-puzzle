import { Application } from '@pixi/app';
import { InteractionManager } from '@pixi/interaction';
import { Renderer, BatchRenderer, Texture } from '@pixi/core';
import { Graphics } from '@pixi/graphics';
import { SCALE_MODES } from '@pixi/constants';
import { TickerPlugin } from '@pixi/ticker';
import { AppLoaderPlugin } from '@pixi/loaders';
import { Sprite } from '@pixi/sprite';
import { drawBezierWithLines } from './bezier';

Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('interaction', InteractionManager);

Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);

const app = new Application();
document.body.appendChild(app.view); // Create Canvas tag in the body

// app.loader.add('logo', './assets/logo.png');
app.loader.add('puzzle', './assets/memory.jpg');
function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}

app.loader.load(() => {
  // const sprite = Sprite.from('puzzle');
  // // sprite.interactive = true;
  // // sprite.buttonMode = true;
  // sprite.anchor.set(0.5);
  // // sprite.scale.set(0.5);
  // sprite.x = app.screen.width * 0.5;
  // sprite.y = app.screen.height * 0.5;
  //
  // const mask = new Graphics();
  // app.stage.addChild(mask);
  // mask.beginFill(0xDE3249);
  // mask.drawRect(50, 50, 100, 100);
  // mask.endFill();
  //
  // sprite.mask = mask;
  // mask.interactive = true;
  // mask.buttonMode = true;
  //
  // mask
  //   .on('pointerdown', onDragStart)
  //   .on('pointerup', onDragEnd)
  //   .on('pointerupoutside', onDragEnd)
  //   .on('pointermove', onDragMove);
  //
  // app.stage.addChild(sprite);
  // app.ticker.add((delta) => {
  //   // sprite.rotation += 0.02 * delta;
  // });


  const point1 = {
    x: -200,
    y: 200,
  };
  const point2 = {
    x: 300,
    y: 200,
  };
  const point3 = {
    x: 100,
    y: 0,
  };
  const position = {
    x: 250,
    y: 250,
  };
  const objects = drawBezierWithLines({
    point1,
    point2,
    point3,
    position,
    debug: true,
  });
  app.stage.addChild(objects.bezier, objects.line);
});
