"use client";

import { useState } from 'react';


export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('Today');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false,
        date: new Date()
      }]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">To Do List</h2>
      
      <div className="todo-filters">
        <div className="todo-filter">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="todo-select"
          >
            <option>Today</option>
            <option>Tomorrow</option>
            <option>This Week</option>
          </select>
          <div className="todo-select-icon">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <div className="todo-filter">
          <select className="todo-select">
            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <div className="todo-select-icon">
            <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      
      {tasks.length === 0 ? (
        <div className="todo-empty">
          <div className="todo-empty-icon">
            <svg className="icon-large" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="todo-empty-text">There's no to-do right now.</p>
          <button 
            onClick={() => document.getElementById('new-task-input').focus()} 
            className="todo-add-button"
          >
            Add task
          </button>
        </div>
      ) : (
        <div className="todo-list">
          {tasks.map(task => (
            <div key={task.id} className="todo-item">
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => {
                  setTasks(tasks.map(t => 
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                  ));
                }}
                className="todo-checkbox"
              />
              <span className={task.completed ? "todo-text-completed" : "todo-text"}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div className="todo-input-container">
        <input
          id="new-task-input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button 
          onClick={addTask}
          className="todo-add-task-button"
        >
          Add
        </button>
      </div>
    </div>
  );
}