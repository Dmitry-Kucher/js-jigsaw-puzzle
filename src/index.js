// Import Application class that is the main part of our PIXI project
import { Application } from '@pixi/app';

// In order that PIXI could render things we need to register appropriate plugins
import { Renderer, BatchRenderer, Texture } from '@pixi/core'; // Renderer is the class that is going to register plugins

import { Rectangle } from '@pixi/math';

import { TickerPlugin } from '@pixi/ticker';

// And just for convenience let's register Loader plugin in order to use it
// right from Application instance like app.loader.add(..) etc.
import { AppLoaderPlugin } from '@pixi/loaders';


// Sprite is our image on the stage
import { Sprite } from '@pixi/sprite';
// BatchRenderer is the "plugin" for drawing sprites
Renderer.registerPlugin('batch', BatchRenderer); // TickerPlugin is the plugin for running an update loop (it's for the application class)
Application.registerPlugin(TickerPlugin);
Application.registerPlugin(AppLoaderPlugin);

// App with width and height of the page
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view); // Create Canvas tag in the body

// Load the logo
// app.loader.add('logo', './assets/logo.png');
app.loader.load(() => {
  const texture = Texture.from('./assets/logo.png');
  const sprite = new Sprite(texture);

  // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
  sprite.interactive = true;

  // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
  sprite.buttonMode = true;

  sprite.anchor.set(0.5); // We want to rotate our sprite relative to the center, so 0.5
  app.stage.addChild(sprite);

  // Position the sprite at the center of the stage
  sprite.x = app.screen.width * 0.5;
  sprite.y = app.screen.height * 0.5;

  // Put the rotating function into the update loop
  // app.ticker.add((delta) => {
  //   sprite.rotation += 0.02 * delta;
  // });
});
