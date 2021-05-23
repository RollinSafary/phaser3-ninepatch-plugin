import { IPatchesConfig } from "./ninepatch/IPatchesConfig";
import { NinePatch } from "./ninepatch/NinePatch";
import { getNinePatchCacheKey } from "./utils/utils";

export class NinePatchPlugin extends Phaser.Plugins.BasePlugin {
    public static NAME: string = "NinePatchPlugin";
    public static GAME_OBJECT_NAME: string = "ninePatch";
    public static CACHE_NAME: string = "NinePatchCache";
    private static game: Phaser.Game;

    public static addConfigToCache(key: string, frame?: string | number, patchConfig?: IPatchesConfig): void {
        const cacheKey: string = getNinePatchCacheKey(key, frame);
        this.game.cache.custom[NinePatchPlugin.CACHE_NAME].add(cacheKey, patchConfig || { top: 0 });
    }

    public scene: Phaser.Scene;
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        NinePatchPlugin.game = pluginManager.game;
        pluginManager.game.cache.addCustom(NinePatchPlugin.CACHE_NAME);

        //  Register our new Game Object type
        pluginManager.registerGameObject(NinePatchPlugin.GAME_OBJECT_NAME, this.ninePatchFactory, this.ninePatchCreator);
    }

    private ninePatchFactory(
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        frame?: string | number,
        patchesConfig: IPatchesConfig = { top: 0 }
    ): NinePatch {
        return this.scene.add.existing(new NinePatch(this.scene, x, y, width, height, key, frame, patchesConfig)) as NinePatch;
    }

    private ninePatchCreator(config: any, addToScene?: boolean): NinePatch {
        if (config === undefined) {
            config = {};
        }

        const key: string = Phaser.Utils.Objects.GetAdvancedValue(config, "key", null);
        const frame: string | number = Phaser.Utils.Objects.GetAdvancedValue(config, "frame", null);
        const width: number = Phaser.Utils.Objects.GetAdvancedValue(config, "width", null);
        const height: number = Phaser.Utils.Objects.GetAdvancedValue(config, "height", null);
        const patchesConfig: IPatchesConfig = Phaser.Utils.Objects.GetAdvancedValue(config, "patchesConfig", { top: 0 });

        const ninePatch: NinePatch = new NinePatch(this.scene, 0, 0, width, height, key, frame, patchesConfig);

        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        Phaser.GameObjects.BuildGameObject(this.scene, ninePatch, config);

        return ninePatch;
    }
}
