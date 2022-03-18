import store from "store";

type StorageKey = "authToken";

export default {
  get(key: StorageKey) {
    return store.get(key);
  },

  set(key: StorageKey, value: any) {
    store.set(key, value);
  },

  remove(key: StorageKey) {
    store.remove(key);
  },
};
