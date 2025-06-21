'use client';

import React, { useState } from 'react';
import TaskList from '../Project/TaskList';
import TaskForm from '../Project/TaskForm';
import TaskDetails from '../Project/TaskDetails';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), status: 'pending' }]);
    setShowForm(false);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setSelectedTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <div className="task-management">
      <h1>Task Management</h1>
      
      <button onClick={() => setShowForm(true)}>Create New Task</button>
      
      {showForm && (
        <TaskForm 
          onSave={selectedTask ? updateTask : addTask} 
          onCancel={() => {
            setShowForm(false);
            setSelectedTask(null);
          }} 
          task={selectedTask}
        />
      )}
      
      <TaskList 
        tasks={tasks} 
        onSelect={setSelectedTask}
        onEdit={(task) => {
          setSelectedTask(task);
          setShowForm(true);
        }}
        onDelete={deleteTask}
        onStatusChange={updateTaskStatus}
      />
      
      {selectedTask && !showForm && (
        <TaskDetails 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default TaskManagement;
