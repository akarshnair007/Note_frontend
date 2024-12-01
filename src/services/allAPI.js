import { serverUrl } from "./baseUrl";
import { CommonApi } from "./commonApi";

export const registerUserApi = async (reqBody) => {
  return await CommonApi("POST", `${serverUrl}/user/register`, reqBody);
};

export const loginUserApi = async (reqBody) => {
  return await CommonApi("POST", `${serverUrl}/user/login`, reqBody);
};

export const addNoteApi = async (reqBody, id) => {
  return await CommonApi("POST", `${serverUrl}/user/addNote/${id}`, reqBody);
};

export const getNoteApi = async (id) => {
  return await CommonApi("GET", `${serverUrl}/user/getNote/${id}`);
};

export const deleteNoteApi = async (id) => {
  return await CommonApi("DELETE", `${serverUrl}/user/deleteNote/${id}`);
};

export const getUserNoteApi = async (id) => {
  return await CommonApi("get", `${serverUrl}/user/getANote/${id}`);
};

export const updateUserNoteApi = async (reqBody, id) => {
  return await CommonApi("PUT", `${serverUrl}/user/updateNote/${id}`, reqBody);
};
