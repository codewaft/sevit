import { forEach, replace } from "lodash";

export default {
  replaceParams(url: string, params: object) {
    forEach(params, (value, name) => {
      url = replace(url, `{${name}}`, value);
    });
    return url;
  },
};
