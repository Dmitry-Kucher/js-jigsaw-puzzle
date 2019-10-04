// Import Application class that is the main part of our PIXI project
import { Application } from '@pixi/app';
import { InteractionManager } from '@pixi/interaction';

// In order that PIXI could render things we need to register appropriate plugins
import { Renderer, BatchRenderer, Texture } from '@pixi/core'; // Renderer is the class that is going to register plugins

import { SCALE_MODES } from '@pixi/constants';

import { TickerPlugin } from '@pixi/ticker';

// And just for convenience let's register Loader plugin in order to use it
// right from Application instance like app.loader.add(..) etc.
import { AppLoaderPlugin } from '@pixi/loaders';


// Sprite is our image on the stage
import { Sprite } from '@pixi/sprite';
// BatchRenderer is the "plugin" for drawing sprites
Renderer.registerPlugin('batch', BatchRenderer); // TickerPlugin is the plugin for running an update loop (it's for the application class)
Renderer.registerPlugin('interaction', InteractionManager); // TickerPlugin is the plugin for running an update loop (it's for the application class)
Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);

// App with width and height of the page
const app = new Application();
document.body.appendChild(app.view); // Create Canvas tag in the body


// const app = new Application({ backgroundColor: 0x1099bb });
// document.body.appendChild(app.view);
// const texture = Texture.from('./assets/logo.png');
// texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
// const bunny = new Sprite(texture);
// bunny.interactive = true;
// bunny.buttonMode = true;
// bunny.anchor.set(0.5);
// bunny.scale.set(3);
// bunny.x = Math.floor(Math.random() * app.screen.width);
// bunny.y = Math.floor(Math.random() * app.screen.height);
// app.stage.addChild(bunny);





// Load the logo
// app.loader.add('logo', './assets/logo.png');
// app.loader.load(() => {
  const texture = Texture.from('./assets/logo.png');
  texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;

  const sprite = new Sprite(texture);

  sprite.interactive = true;
  sprite.buttonMode = true;

  sprite.anchor.set(0.5); // We want to rotate our sprite relative to the center, so 0.5
  // sprite.scale.set(3);

  // Position the sprite at the center of the stage
  sprite.x = app.screen.width * 0.5;
  sprite.y = app.screen.height * 0.5;

  app.stage.addChild(sprite);

  // Put the rotating function into the update loop
  // app.ticker.add((delta) => {
  //   sprite.rotation += 0.02 * delta;
  // });
// });
