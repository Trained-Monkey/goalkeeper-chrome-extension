import { TYPES } from "../constants/Goal";
import { log, error } from "console";


let storage: chrome.storage.LocalStorageArea | testStorage;

class testStorage {
    storage: { [key: string]: any };

    constructor() {
        this.storage = {
            "streakCounter": 0,
            "goals": [
                {
                    name: "Drink water",
                    type: TYPES.DAILY,
                    lastCompleted: new Date(),
                },
                {
                    name: "Drink water1",
                    type: TYPES.FORTNIGHTLY,
                    lastCompleted: new Date(),
                },
                {
                    name: "Drink water2",
                    type: TYPES.WEEKLY,
                    lastCompleted: new Date(),
                }

            ]

        };
    }

    get(keyDict: { [s: string]: string; }): Promise<object> {
        return new Promise((resolve, reject) => {
            let result: { [s: string]: string; } = {};
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

    set(keyValue: { [s: string]: string; }): Promise<object> {
        return new Promise((resolve, reject) => {
            for (const [key, value] of Object.entries(keyValue)) {
                this.storage[key] = value;
            }
        })
    }
}

// global.chrome = {
//     storage: {
//         // @ts-ignore
//         local: {
//             get: async () => { throw new Error("Unimplemented.") }
//         }
//     }
// };
log("global.chrome: ");
log(global.chrome);
// throw new Error();
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

    return storage.get(key);
}

export function storeInStorage(keyValues: { [key: string]: any }) {
    if (storage == null) {
        console.error("Chrome extension not accessible,\
        ensure webpage is being ran as an extension.");
        return null;
    }

    storage.set(keyValues);
}

