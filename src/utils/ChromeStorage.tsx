
let storage: chrome.storage.LocalStorageArea | testStorage;

class testStorage {
    storage: {[key: string]: any};

    constructor() {
        this.storage = {
            "streakCounter": 0
        };
    }

    get(keyDict: { [s: string]: string; } ): Promise<object> {
        return new Promise((resolve, reject) => {
            let result: { [s: string]: string; }  = {};
            for (const [key, value] of Object.entries(keyDict)) {
                if (this.storage[key] == null) {
                    result[key] = value;
                } else {
                    result[key] = this.storage[key];
                }
            }
            resolve(result);
        });
    }
}

if (process.env.NODE_ENV === 'development') {
    console.log('Dev mode detected, running testStorage instead of accessing chrome api');
    storage = new testStorage();

} else {
    storage = chrome?.storage?.local;
}

export function getFromStoragePromise(key: { [s: string]: any; }): Promise<{ [key: string]: any }> | null {
    if (storage == null) {
        console.error("Chrome extension not accessible"
            + " ensure webpage is being ran as an extension.");
        return null;
    }

    return storage?.get(key);
}

export function storeInStorage() {
    if (storage == null) {
        console.error("Chrome extension not accessible,\
        ensure webpage is being ran as an extension.");
        return null;
    }

}

