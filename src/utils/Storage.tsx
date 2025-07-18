// Access to the chrome extension storage API, uses custom storage object for
// the purposes of development.
import { TYPES } from "../constants/Goal";

let storage: chrome.storage.LocalStorageArea | testStorage;

// Custom storage designed to mimic functionality of chrome storage for the 
// purposes of local testing
class testStorage {
  storage: { [key: string]: any };

  constructor() {
    this.storage = {
      "counter": 20,
      "lastCompleted": new Date(new Date().getTime() - 24 * 60 * 60 * 1001),
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

  // Retreive values from storage
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

  // Stores value in storage
  set(keyValue: { [s: string]: string; }): Promise<object> {
    return new Promise((resolve, reject) => {
      for (const [key, value] of Object.entries(keyValue)) {
        this.storage[key] = value;
      }
    })
  }
}

if (process.env.NODE_ENV === 'development') {
  console.log('Development mode detected,'
  + ' running testStorage instead of accessing chrome api');
  storage = new testStorage();
} else {
  storage = chrome?.storage?.local;
}

export function getFromStorage(key: { [s: string]: any; }): Promise<{ [key: string]: any }> | null {
  if (storage == null) {
    console.error("Chrome extension not accessible,"
      + " ensure webpage is being ran as an extension.");
    return null;
  }

  return storage.get(key);
}

export function storeInStorage(keyValues: { [key: string]: any }) {
  if (storage == null) {
    console.error("Chrome extension not accessible,"
    + " ensure webpage is being ran as an extension.");
    return null;
  }

  storage.set(keyValues);
}

