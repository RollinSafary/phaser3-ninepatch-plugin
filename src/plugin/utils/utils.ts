function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function getNinePatchCacheKey(key: string, frame?: string | number): string {
    return isNullOrUndefined(frame) ? `${key}-single` : `${key}-atlas-${frame}-frame`;
}
