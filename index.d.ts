declare class ArcArray<T> extends Array<T> {
    joinCallback(callback: (value: T, index: number) => string, separator?: string): string;
    shuffle(): this;
    rand(): T | undefined;
    pMap<R>(mapper: (value: T, index: number, array: T[]) => R | PromiseLike<R>): Promise<R[]>;
    toString(): string;
    static wrap<T>(array: ArcArray<T>): ArcArray<T>;
    static wrap<T>(array: T[]): ArcArray<T>;
}

export default ArcArray;
