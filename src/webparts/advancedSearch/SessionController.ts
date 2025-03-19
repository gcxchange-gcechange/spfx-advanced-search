import { Globals } from "./Globals";

export class SessionController<T> {
    private storageKey: string;
    private expirationTime: number = Globals.getCacheTime() * 60 * 1000;

    constructor(storageKey: string) {
        this.storageKey = storageKey;
    }

    private getTimestamp(): number {
        return new Date().getTime();
    }

    public save(data: T): void {
        try {
            const item = {
                value: data,
                timestamp: this.getTimestamp()
            };
            sessionStorage.setItem(this.storageKey, JSON.stringify(item));
        }
        catch (e) {
            console.error(e);
        }
    }

    async fetch(fetchFunction?: () => Promise<T>): Promise<T | undefined> {
        const item = sessionStorage.getItem(this.storageKey);

        if (item) {
            const parsedItem = JSON.parse(item);
            if (this.getTimestamp() - parsedItem.timestamp < this.expirationTime) {
                return parsedItem.value;
            } else {
                sessionStorage.removeItem(this.storageKey);
            }
        }

        if (fetchFunction) {
            const data = await fetchFunction();
            this.save(data);
            return data;
        }

        return null;
    }
}