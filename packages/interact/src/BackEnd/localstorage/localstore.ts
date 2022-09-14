export class LocalStorage {
    private static _instance: LocalStorage;
    private _localStorage: Storage;

    private constructor() {
        this._localStorage = window.localStorage;
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public get(key: string): any {
        return this._localStorage.getItem(key);
    }

    public set(key: string, value: any): void {
        this._localStorage.setItem(key, value);
    }

    public remove(key: string): void {
        this._localStorage.removeItem(key);
    }

    public clear(): void {
        this._localStorage.clear();
    }
}
