# Phaser3 Nine Patch Changelog:

## v2.0.9
- Modified `INinePatchCreator` and `INinePatchFactory` interfaced not to extend from Phaser base types, to keep type definition readability and avoid some confusing situations related to it.
- Updated `INinePatchScene` interface based on `creator` and `factory` modifications.
## v2.0.8
- Type declaration fixes
- Added `addConfigToCache` static function to `NinePatchPlugin`, which will generate unique cache key for your asset based on it's `key` and `frame` values, to avoid situations when there are two or more assets in different atlases with same `frameName`. Which was causing wrong configuration issue.
```javascript
NinePatchPlugin.addConfigToCache(key, frame, patchConfig)
```
## v2.0.7
- Removed `source-map` from the bundle.
- The installed bundle is now `minified` and `uglified`! <br>
*if you're going to read the code, please navigate to our repo*
## v2.0.6
- Optimized the package size. The whole repo won't be downloaded when installing the package
## v2.0.5
- Added `INinePatchScene` interface which allows to avoid manual override of `factory` and `creator` objects inside scene. Now Phaser.Scene needs just to implement this interface.
```typescript
export class MyScene extends Phaser.Scene implements INinepatchScene {...}
```
- Added ninePatch custom cache object, which means, that `this.scene.cache.custom.ninePatch` is accessible for you and you have no need to type code like this `(this.scene.cache.custom as any)['ninePatch'].add(...)` to add nine patch asset configs to the cache.
- Added default ninePatch config. This means, that even if you haven't added/provided nine patch config for the asset, it will take default config
```javascript
{
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}
```
- `setTexture` function will change object texture and you can provide different key for it (before you could do that by just using same spritesheet and different frame via `setFrame`). `setFrame` stills there and does what it was doing.
- Fixed mistake in `package.json` where `webpack.cli` was a main dependency for this package, which caused the editor to show webpack related classes in your import suggestions list.

## v2.0.4
- `README.md` and `CHANGELOG.md` updated.
## v2.0.3

- Now NinePatch extends from `Phaser.GameObjects.Container` and implements `Phaser.GameObjects.Components.Texture` and uses `Phaser.GameObjects.Components.Texture` (public) properties in place of custom (private) properties.

## Phaser3 Nine Patch 2.0.0

### v2.0.1

#### Added

-   Add `setTint`, `setTintFill` and `clearTint` methods to be able to change tint.

### v2.0.0

#### Added

-   Now NinePatch class extends Phaser.GameObjects.Container instead of Phaser.GameObjects.RenderTexture to not add additional draws and calls.

### v1.1.5

#### Fixed

-   Minor fixings.

### v1.1.4

#### Fixed

-   Minor fixings.

### v1.1.3

#### Fixed

-   Fix canvas rendering issue.

### v1.1.2

#### Added

-   Add `setTexture` and `setFrame` methods to be able to change texture and/or frame dynamically (see #18).

#### Fixed

-   Fix `addToScene` to be optional for nine patch creator.

### v1.1.1 - Planned stable version

-   fixed resize method to be chainable
