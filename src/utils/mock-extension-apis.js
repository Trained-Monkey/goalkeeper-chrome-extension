
export default function () {
    global.chrome = {
        storage: {
            local: {
                get: async (value) => { throw new Error("Unimplemented."); },
                set: function () {
                    throw new Error("Function not implemented.");
                },
            }
        }
    };
}