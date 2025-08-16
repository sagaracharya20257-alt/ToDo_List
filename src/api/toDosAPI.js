import http from "./http.js";

export function getUserTodos(userId) {
  return http.get(`/todos?userId=${userId}`);
}

export function createTodo(todo) {
  return http.post(`/todos`, todo);
}

export function removeTodo(id) {
  return http.delete(`/todos/${id}`);
}

export function updateTodo(id, payload) {
  return http.patch(`/todos/${id}`, payload);
}
