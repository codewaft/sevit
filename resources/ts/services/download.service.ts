import download from "downloadjs";

export default {
  download(data: string, fliename: string) {
    return download(data, fliename);
  },
};
