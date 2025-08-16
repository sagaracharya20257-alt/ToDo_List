import http from "./http.js";

export async function authAPI({ username, password }) {
  const { data } = await http.get(`/users?username=${username}&password=${password}`);
  if (data.length > 0) return data[0];
  throw new Error("Invalid username or password");
}
