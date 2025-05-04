
export default function () {
  // @ts-ignore
  global.chrome = {
    storage: {
      local: {
        get: async (value: any) => { throw new Error("Unimplemented."); },
        set: function (value) {
          throw new Error("Function not implemented.");
        },
        QUOTA_BYTES: 0,
        getBytesInUse: function () {
          throw new Error("Function not implemented.");
        },
        clear: function (): any {
          throw new Error("Function not implemented.");
        },
        remove: function (): any {
          throw new Error("Function not implemented.");
        },
        setAccessLevel: function (): any {
          throw new Error("Function not implemented.");
        },
        onChanged: undefined!,
        getKeys: function (): any {
          throw new Error("Function not implemented.");
        }
      },
      AccessLevel: {
        TRUSTED_AND_UNTRUSTED_CONTEXTS: "TRUSTED_AND_UNTRUSTED_CONTEXTS",
        TRUSTED_CONTEXTS: "TRUSTED_CONTEXTS"
      },
      sync: undefined!,
      managed: undefined!,
      session: undefined!,
      onChanged: undefined!
    }
  };
}