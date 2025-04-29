
export default function () {
    console.debug("Setup ran");

    global.chrome = {
        ...global.chrome,
        storage: {
            ...global.chrome.storage,
            local: {
                get: async (value: any) => { throw new Error("Unimplemented."); },
                QUOTA_BYTES: 0,
                getBytesInUse: function () {
                    throw new Error("Function not implemented.");
                },
                clear: function (): Promise<void> {
                    throw new Error("Function not implemented.");
                },
                set: function <T = { [key: string]: any; }>(items: Partial<T>): Promise<void> {
                    throw new Error("Function not implemented.");
                },
                remove: function <T = { [key: string]: any; }>(keys: keyof T | Array<keyof T>): Promise<void> {
                    throw new Error("Function not implemented.");
                },
                setAccessLevel: function (accessOptions: { accessLevel: chrome.storage.AccessLevel; }): Promise<void> {
                    throw new Error("Function not implemented.");
                },
                onChanged: null!,
                getKeys: function (): Promise<string[]> {
                    throw new Error("Function not implemented.");
                }
            }
        }
    };
    // console.log(chrome);
}