export const Storage = {
  getItem: (key) => {
    try {
      let result = localStorage.getItem(key);
      return JSON.parse(result);
    }
    catch (e) {
      throw e;
    }
  },
  setItem: (key, value, callback) => {
    try {
      const item = JSON.stringify(value);
      return localStorage.setItem(key, item, callback);
    }
    catch (e) {
      throw e;
    }
  }
};
