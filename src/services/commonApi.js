import axios from "axios";

export const CommonApi = async (httpMethod, url, reqBody) => {
  const reqConfig = {
    method: httpMethod,
    url: url,
    data: reqBody,
    headers: { "Content-Type": "application/json" },
  };

  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
