import { INinePatchCreator } from "./INinePatchCreator";
import { INinePatchFactory } from "./INinePatchFactory";

export interface INinePatchScene extends Phaser.Scene {
    add: Phaser.GameObjects.GameObjectFactory & INinePatchFactory;
    make: Phaser.GameObjects.GameObjectCreator & INinePatchCreator;
}
