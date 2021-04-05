export class NinePatchCacheManager extends Phaser.Cache.CacheManager {
    public custom: { ninePatch: Phaser.Cache.BaseCache; [key: string]: Phaser.Cache.BaseCache };
}
