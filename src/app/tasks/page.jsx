'use client';

import { useEffect, useState } from 'react';

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BACKEND_URL = '';

  const fetchTasks = async () => {
    try {
      const res = await fetch(BACKEND_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      alert('Failed to fetch task');
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTask }),
      });
      setNewTask('');
      fetchTasks();
    } catch {
      alert('Failed to add todo');
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch {
      alert('Failed to delete');
    }
  };

  const updateTask = async () => {
    if (!editTask.trim() || editingId === null) return;
    try {
      await fetch(`${BACKEND_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTask }),
      });
      setEditTask('');
      setEditingId(null);
      setIsModalOpen(false);
      fetchTasks();
    } catch {
      alert('Failed to update');
    }
  };

  const openEdit = (task) => {
    setEditTask(task.title);
    setEditingId(task.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 px-3 py-2 border rounded-md"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center border p-2 rounded-md"
          >
            <span>{task.title}</span>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(task)}
                className="text-sm text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-3">Edit Task</h2>
            <input
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingId(null);
                }}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={updateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
