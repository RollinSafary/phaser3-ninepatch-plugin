# Phaser3 Nine Patch

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/rollinsafary/phaser3-ninepatch-plugin/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/%40rollinsafary%2Fphaser3-ninepatch-plugin.svg)](https://badge.fury.io/js/%40rollinsafary%2Fphaser3-ninepatch-plugin)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Phaser3 Nine Patch plugin adds 9-slice scaling support to Phaser3!

#### Resizing with nine patch

![Nine Patch ](https://raw.githubusercontent.com/rollinsafary/phaser3-ninepatch-plugin/master/assets/np.gif)

#### Resizing without nine patch

![Not Nine Patch](https://raw.githubusercontent.com/rollinsafary/phaser3-ninepatch-plugin/master/assets/nnp.gif)

Key features:

-   Blazing fast
-   Low memory usage
-   Easy to use API

## What is Nine-Patch?

A **Nine-Patch** is an image format that uses extra information, defining what parts of it should be scaled (and which are not) when the image is rendered in a larger or smaller size. This technique is very useful for creating UI components like buttons, panels, containers, etc.

Using this technique, you can define the background of multiples UI components like panels or buttons with the same image asset. You can also create large panels with a reduced image asset so is very useful for optimizing your project resources.

![Phaser3 Nine Patch](https://raw.githubusercontent.com/rollinsafary/phaser3-ninepatch-plugin/master/assets/what-is-nine-patch.png)

## Getting Started

First you want to get a fresh copy of the plugin. You can get it from this repo or from npm, ain't that handy.

[![npm](https://img.shields.io/npm/dt/@rollinsafary/phaser3-ninepatch-plugin.svg)](https://www.npmjs.com/package/@rollinsafary/phaser3-ninepatch-plugin)

```
npm install @rollinsafary/phaser3-ninepatch-plugin --save
```


## Usage

### Load the plugin

You still need to load the plugin in your game. This is done just like any other global plugin in Phaser3.
So, to load the plugin, include it in phaser game config.

```javascript
{
  type: Phaser.WEBGL,
  width: 540,
  height: 960,
  backgroundColor: '#626262',
  parent: 'gameContainer',
  scene: [GameScene],
  plugins: {
    global: [{ key: NinePatchPlugin.NAME, plugin: NinePatchPlugin, start: true }],
  },
}
```
### Prepare you scene (TypeScript only)
To have type definitions you have to implement `INinePatchScene` interface in your scenes
```typescript
export default class BaseScene extends Phaser.Scene implements INinePatchScene {
  // your code
}
```
or 
```typescript
export default class BaseScene extends Phaser.Scene {
  public add: Phaser.GameObjects.GameObjectFactory & INinePatchFactory;
  public make: Phaser.GameObjects.GameObjectCreator & INinePatchCreator;

  // your code
}
```
both implementations are same.
For more information see the 2.0.5 in [CHANGELOG](https://raw.githubusercontent.com/rollinsafary/phaser3-ninepatch-plugin/master/CHANGELOG.md).
The plugin will patch your Phaser game with additional add/make methods so the NinePatch game object fits up in Phaser like any normal object!

### Adding a container

Also adding and creating of 9-patch images is exposed through Phaser's GameObjectCreator and GameObjectFactory.
So you can add a 9-patch image to your game just like any other image once it's preloaded!

```javascript
//We specify the x and y position, the width and height and the key for the image of the image. It will be automaticly scaled!
this.add.ninePatch(100, 100, 200, 400, "my-image", null, {
    top: 10, // Amount of pixels for top
    bottom: 20, // Amount of pixels for bottom
    left: 30, // Amount of pixels for left
    right: 40 // Amount of pixels for right
});
```

Or if you'd want to do something with it first:

```javascript
//Two options here, first we use Phaser
var ninePatch = this.make.ninePatch({
    key: "my-image",
    width: 200,
    height: 200,
    patchesConfig: {
        top: 10, // Amount of pixels for top
        bottom: 20, // Amount of pixels for bottom
        left: 30, // Amount of pixels for left
        right: 40 // Amount of pixels for right
    }
});
ninePatch.x = 20;
ninePatch.y = 20;
this.add.existing(ninePatch);

//Or we use the Constructor
var ninePatch = new NinePatch(this, 0, 0, 200, 50, "my-image", null, {
    top: 10, // Amount of pixels for top
    bottom: 20, // Amount of pixels for bottom
    left: 30, // Amount of pixels for left
    right: 40 // Amount of pixels for right
});
ninePatch.x = 50;
ninePatch.y = 50;
this.add.existing(nineSlice);
```

### Using a Texture Atlas

It's also possible to use an image that's located inside a Texture atlas. The only difference then is that you don't have to preload the image, instead you use the object's constructor and pass the framedata directly on creation:

```javascript
//Add an nineslice image with an texture atlas
var ninePatch = new NinePatch(
    this, // Phaser.Scene
    150, // x position
    100, // y position
    200, // expected width
    100, // expected height
    "buttons", // atlas key
    "btn_clean.png", // Image frame
    {
        top: 20, // Amount of pixels for top
        bottom: 23, // Amount of pixels for bottom
        left: 27, // Amount of pixels for left
        right: 28 // Amount of pixels for right
    }
);
this.add.existing(ninePatch);
```

### Resize method

9-patch image has a resize method which lets you expand/shorten the width or length of the image.
When using resize method, make sure values are not lower than the width of the image corners

```javascript
var ninePatch = this.add.ninePatch(5, 5, 48, 48, "image", null, {
    top: 5 // Amount of pixels for top, bottom, left, right
});
ninePatch.resize(100, 200);
```

### Optimization
If you don't want to provide nine patch configs each time you're going to create a `NinePatch` game object, so you can just add that config into game cache.
```typescript
this.scene.cache.custom.ninePatch.add(keyOrFrameName, configs)
```
and then to create a `NinePatch` game object you need just to call
```
this.scene.add(x, y, key, frame, width, height)
```
and it will retrieve configs from the cache based on the `key` if it's single texture (`frame` is `undefined` or `null`), or based on `frame` name if it's atlas or multi atlas texture.

Related to the repeatedly happening issue with atlases and multi atlases added a new static new `addConfigToCache` function to the `NinePatchPlugin` class which will make easier to add config and which will automatically define a key for the asset.

```javascript
NinePatchPlugin.addConfigToCache(atlasKey, frameName, ninePatchConfig)
```
for the single asset provide `null` in place of `frameName`.

```
NOTE: please avoid of using custom keys for the asset configs
```

## Credits
This repo forked from https://github.com/koreezgames/phaser3-ninepatch-plugin
<br> Big thanks to these great repos:

https://github.com/koreezgames/phaser3-ninepatch-plugin
<br>
https://github.com/orange-games/phaser-nineslice

## License

[MIT](LICENSE)