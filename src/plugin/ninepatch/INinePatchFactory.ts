import { NinePatch } from "./NinePatch";

export interface INinePatchFactory {
    ninePatch: (
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        frame?: string | number,
        patchesConfig?: any
    ) => NinePatch;
}
