import { INinePatchCreator } from "./INinePatchCreator";
import { INinePatchFactory } from "./INinePatchFactory";

export interface INinePatchScene extends Phaser.Scene {
    add: INinePatchFactory;
    make: INinePatchCreator;
}
