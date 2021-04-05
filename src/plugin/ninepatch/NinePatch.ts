import { IPatchesConfig, normalizePatchesConfig } from "./IPatchesConfig";

export class NinePatch extends Phaser.GameObjects.Container implements Phaser.GameObjects.Components.Texture {
    private static readonly patches: string[] = ["[0][0]", "[1][0]", "[2][0]", "[0][1]", "[1][1]", "[2][1]", "[0][2]", "[1][2]", "[2][2]"];

    public texture: Phaser.Textures.Texture;
    public frame: Phaser.Textures.Frame;
    private config: IPatchesConfig;
    private finalXs: number[];
    private finalYs: number[];
    private internalTint: number;

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        width: number,
        height: number,
        key: string,
        frame?: string | number,
        config?: IPatchesConfig
    ) {
        super(scene, x, y);
        this.config = config || this.scene.cache.custom.ninePatch.get(frame ? `${frame}` : key) || { top: 0, left: 0 };
        normalizePatchesConfig(this.config);
        this.setSize(width, height);
        this.setTexture(key, frame);
    }

    public resize(width: number, height: number, force: boolean = false): this {
        width = Math.round(width);
        height = Math.round(height);
        if (this.width === width && this.height === height && !force) {
            return this;
        }
        width = Math.max(width, this.config.left + this.config.right);
        height = Math.max(height, this.config.top + this.config.bottom);
        this.setSize(width, height);
        this.drawPatches();
        return this;
    }

    public setTexture(key: string, frame?: string | integer): this {
        this.texture = this.scene.textures.get(key);
        return this.setFrame(frame);
    }

    public setFrame(frame: string | integer): this {
        this.frame = this.scene.textures.getFrame(this.texture.key, frame);
        this.createPatches();
        this.drawPatches();
        return this;
    }

    public setSize(width: number, height: number): this {
        super.setSize(width, height);
        // These are the positions we need the eventual texture to have
        this.finalXs = [0, this.config.left, this.width - this.config.right, this.width];
        this.finalYs = [0, this.config.top, this.height - this.config.bottom, this.height];
        return this;
    }

    public setTint(tint: number): this {
        this.tint = tint;
        return this;
    }

    public setTintFill(tint: number): this {
        this.tint = tint;
        this.tintFill = true;
        return this;
    }

    public clearTint(): this {
        this.each((patch: Phaser.GameObjects.Image) => patch.clearTint());
        this.internalTint = undefined;
        return this;
    }

    public get tintFill(): boolean {
        return this.first && (this.first as Phaser.GameObjects.Image).tintFill;
    }

    public set tintFill(value: boolean) {
        this.each((patch: Phaser.GameObjects.Image) => (patch.tintFill = value));
    }

    public set tint(value: number) {
        this.each((patch: Phaser.GameObjects.Image) => patch.setTint(value));
        this.internalTint = value;
    }

    get isTinted(): boolean {
        return this.first && (this.first as Phaser.GameObjects.Image).isTinted;
    }

    private createPatches(): void {
        // The positions we want from the base texture
        const textureXs: number[] = [0, this.config.left, this.frame.width - this.config.right, this.frame.width];
        const textureYs: number[] = [0, this.config.top, this.frame.height - this.config.bottom, this.frame.height];
        let patchIndex: number = 0;
        for (let yi: number = 0; yi < 3; yi++) {
            for (let xi: number = 0; xi < 3; xi++) {
                this.createPatchFrame(
                    this.getPatchNameByIndex(patchIndex),
                    textureXs[xi], // x
                    textureYs[yi], // y
                    textureXs[xi + 1] - textureXs[xi], // width
                    textureYs[yi + 1] - textureYs[yi] // height
                );
                ++patchIndex;
            }
        }
    }

    private drawPatches(): void {
        const tintFill = this.tintFill;
        this.removeAll(true);
        let patchIndex: number = 0;
        for (let yi: number = 0; yi < 3; yi++) {
            for (let xi: number = 0; xi < 3; xi++) {
                const patch: Phaser.Textures.Frame = this.scene.textures.getFrame(this.texture.key, this.getPatchNameByIndex(patchIndex));
                const patchImg = new Phaser.GameObjects.Image(this.scene, 0, 0, patch.texture.key, patch.name);
                patchImg.setOrigin(0);
                patchImg.setPosition(this.finalXs[xi] - this.width * this.originX, this.finalYs[yi] - this.height * this.originY);
                patchImg.setScale(
                    (this.finalXs[xi + 1] - this.finalXs[xi]) / patch.width,
                    (this.finalYs[yi + 1] - this.finalYs[yi]) / patch.height
                );
                this.add(patchImg);
                patchImg.setTint(this.internalTint);
                patchImg.tintFill = tintFill;
                ++patchIndex;
            }
        }
    }

    private createPatchFrame(patch: string, x: number, y: number, width: number, height: number): void {
        if (this.texture.frames.hasOwnProperty(patch)) {
            return;
        }
        this.texture.add(patch, this.frame.sourceIndex, this.frame.cutX + x, this.frame.cutY + y, width, height);
    }

    private getPatchNameByIndex(index: number): string {
        return `${this.frame.name}|${NinePatch.patches[index]}`;
    }
}
