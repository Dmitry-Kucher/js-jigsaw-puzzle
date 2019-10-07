import { Application } from '@pixi/app';
import { InteractionManager } from '@pixi/interaction';
import { Renderer, BatchRenderer, Texture } from '@pixi/core';
import { SCALE_MODES } from '@pixi/constants';
import { TickerPlugin } from '@pixi/ticker';
import { AppLoaderPlugin } from '@pixi/loaders';
import { Sprite } from '@pixi/sprite';

Renderer.registerPlugin('batch', BatchRenderer);
Renderer.registerPlugin('interaction', InteractionManager);

Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);

const app = new Application();
document.body.appendChild(app.view); // Create Canvas tag in the body

// app.loader.add('logo', './assets/logo.png');
app.loader.load(() => {
  const texture = Texture.from('./assets/logo.png');
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  const sprite = new Sprite(texture);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.anchor.set(0.5);
  sprite.x = app.screen.width * 0.5;
  sprite.y = app.screen.height * 0.5;

  app.stage.addChild(sprite);
  app.ticker.add((delta) => {
    sprite.rotation += 0.02 * delta;
  });
});
