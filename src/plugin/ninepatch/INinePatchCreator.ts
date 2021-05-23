import { NinePatch } from "./NinePatch";

export interface INinePatchCreator {
    ninePatch: (config: any, addToScene?: boolean) => NinePatch;
}
