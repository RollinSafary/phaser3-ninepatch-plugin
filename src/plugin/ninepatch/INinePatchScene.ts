import { INinePatchCreator } from "./INinePatchCreator";
import { INinePatchFactory } from "./INinePatchFactory";
import { NinePatchCacheManager } from "./NinePatchCacheManager";

export interface INinePatchScene extends Phaser.Scene {
    cache: NinePatchCacheManager;
    add: INinePatchFactory;
    make: INinePatchCreator;
}
