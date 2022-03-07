import { httpMethods } from "../consts/httpMethods";

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = (endpoint, payload, method = httpMethods.Get) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
};
export const fetchConToken = (endpoint, payload, method = httpMethods.Get) => {
  const url = `${baseUrl}/${endpoint}`;
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: { "x-token": localStorage.getItem("token") || "" },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": localStorage.getItem("token") || "",
      },
      body: JSON.stringify(payload),
    });
  }
};
