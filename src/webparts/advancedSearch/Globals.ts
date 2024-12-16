const english = require("./loc/en-us.js");
const french = require("./loc/fr-fr.js");

export enum Language {
    English = 'en',
    French = 'fr'
}

export class Globals {
    private static _language: string;
    private static _isOpen: boolean = false;

    public static isOpen(): boolean {
        return this._isOpen;
    }

    public static setOpen(state: boolean):void {
        this._isOpen = state;
    }

    public static getLanguage(): string {
        return this._language;
    }

    public static setLanguage(lang: string): void {
        if (lang) {
            lang = lang.toLowerCase();
            if (lang === Language.English || lang === Language.French) {
                this._language = lang;
                return;
            }
            this._language = 'en';
            console.warn(`Couldn't determine web part language "${lang}" defaulting to "${Language.English}"`);
        }
    }

    public static getStrings(): IAdvancedSearchWebPartStrings {
        const lang = this.getLanguage();
        switch(lang) {
            case Language.English:
                return english;
            case Language.French:
                return french;
            default:
                return english;
        }
    }
}