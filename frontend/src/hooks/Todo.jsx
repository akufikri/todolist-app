import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import notificationService from "@/service/Notify";

const API_URL = 'http://127.0.0.1:8000/api/todos';

export const useTodos = () => {
      const [todos, setTodos] = useState([]);
      const [sharedTodos, setSharedTodos] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      const fetchTodos = useCallback(async () => {
            try {
                  setLoading(true);
                  const response = await axios.get(API_URL);
                  setTodos(response.data);
                  setError(null);
            } catch (err) {
                  setError(err.message);
                  notificationService.error('Failed to fetch todos');
            } finally {
                  setLoading(false);
            }
      }, []);

      useEffect(() => {
            fetchTodos();
      }, [fetchTodos]);

      const createTodo = async (todoData) => {
            try {
                  const response = await axios.post(API_URL, todoData);
                  setTodos(prevTodos => [...prevTodos, response.data]);
                  notificationService.success('Todo created successfully');
                  return response.data;
            } catch (err) {
                  handleError(err, 'Failed to create todo');
            }
      };

      const getTodo = async (id) => {
            try {
                  const response = await axios.get(`${API_URL}/${id}`);
                  return response.data;
            } catch (err) {
                  handleError(err, 'Failed to get todo');
            }
      };

      const updateTodo = async (id, todoData) => {
            try {
                  const response = await axios.put(`${API_URL}/${id}`, todoData);
                  setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? response.data : todo));
                  notificationService.success('Todo updated successfully');
                  return response.data;
            } catch (err) {
                  handleError(err, 'Failed to update todo');
            }
      };

      const deleteTodo = async (id) => {
            try {
                  await axios.delete(`${API_URL}/${id}`);
                  setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                  notificationService.success('Todo deleted successfully');
            } catch (err) {
                  handleError(err, 'Failed to delete todo');
            }
      };

      const shareTodo = async (id, email) => {
            try {
                  const response = await axios.post(`${API_URL}/share/${id}`, { email });
                  notificationService.success('Todo shared successfully');
                  return response.data;
            } catch (err) {
                  handleError(err, 'Failed to share todo');
            }
      };

      const getSharedTodo = async () => {
            try {
                  setLoading(true);
                  const response = await axios.get(`${API_URL}/share/get`);
                  const formattedSharedTodos = response.data.map(sharedTodo => ({
                        id: sharedTodo.id,
                        title: sharedTodo.todo.title,
                        description: sharedTodo.todo.description,
                        shared_by: sharedTodo.user.name, // Menampilkan nama pengguna yang membagikan todo
                  }));
                  setSharedTodos(formattedSharedTodos);
                  return formattedSharedTodos;
            } catch (err) {
                  handleError(err, 'Failed to get shared todos');
            } finally {
                  setLoading(false);
            }
      };


      const handleError = (err, message) => {
            setError(err.message);
            notificationService.error(message);
            throw err;
      };

      return {
            todos,
            sharedTodos,
            loading,
            error,
            fetchTodos,
            createTodo,
            getTodo,
            updateTodo,
            deleteTodo,
            shareTodo,
            getSharedTodo
      };
};
