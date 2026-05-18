import { handleServerResponse } from "./api";

const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const signUp = ({ email, name, password, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);
};

export const signIn = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const updateProfile = ({ name, avatar }) => {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
};
