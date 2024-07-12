import axios from "axios";

// base url for application
const BASE_URL = process.env.REACT_APP_BASE_URL;

// check URL is valid
if (!BASE_URL) {
  throw new Error("BASE_URL is not defined");
}

// Makes an API request to the specified URL with the given method and data.
const apiRequest = async (method, url, data = null) => {
  try {
    let config = {
      method: method,
      url: `${BASE_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data && typeof data === "object") {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
