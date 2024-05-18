import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import "./Tasks.css";
import { FaCirclePlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTaskContent, setUpdatedTaskContent] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get("/tasks");
      setTasks(response.data);
    };

    fetchTasks();

    const storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  const inputRef = useRef();

  const addTask = async (event) => {
    event.preventDefault(); // prevent the form from refreshing the page
    const response = await api.post("/tasks", { content: newTask });
    setTasks([...tasks, response.data]);
    setNewTask("");
    inputRef.current.focus(); // move the cursor back to the input field
  };

  const deleteTask = async (id) => {
    const task = tasks.find((task) => task._id === id);
    if (task) {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    }
    setCompletedTasks(completedTasks.filter((task) => task._id !== id));
  };

  const completeTask = (id) => {
    const task = tasks.find((task) => task._id === id);
    setTasks(tasks.filter((task) => task._id !== id));
    const newCompletedTasks = [...completedTasks, task];
    setCompletedTasks(newCompletedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
  };

  const uncompleteTask = (id) => {
    const task = completedTasks.find((task) => task._id === id);
    setCompletedTasks(completedTasks.filter((task) => task._id !== id));
    setTasks([...tasks, task]);
  };

  const editTask = (id) => {
    let task = tasks.find((task) => task._id === id);
    if (!task) {
      task = completedTasks.find((task) => task._id === id);
    }
    setEditingTask(task);
    setUpdatedTaskContent(task.content);
  };

  const submitEdit = async () => {
    const updatedTask = { ...editingTask, content: updatedTaskContent };
    const response = await api.put(`/tasks/${editingTask._id}`, updatedTask);
    setTasks(
      tasks.map((task) => (task._id === editingTask._id ? response.data : task))
    );
    setEditingTask(null);
    setUpdatedTaskContent("");
  };

  const toggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  return (
    <div className="tasks-container">
      <div>
        <form onSubmit={addTask}>
          <div className="add-task">
            <div className="txt_field">
              <input
                className="new-task-input"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                ref={inputRef}
                required
              />
              <span></span>
              <label>New task</label>
            </div>
            <button className="add-task-button" onClick={addTask}>
              <FaCirclePlus />
            </button>
          </div>
        </form>
      </div>
      {tasks.map((task) => (
        <div key={task._id} className="task">
          <input type="checkbox" onClick={() => completeTask(task._id)} />
          {task._id === editingTask?._id ? (
            <input
              className="submit-task"
              value={updatedTaskContent}
              onChange={(e) => setUpdatedTaskContent(e.target.value)}
              autoFocus
            />
          ) : (
            task.content
          )}
          <div className="task-buttons">
            {task._id === editingTask?._id ? (
              <button className="submit-task-button" onClick={submitEdit}>
                <MdOutlineDoneOutline />
              </button>
            ) : (
              <button
                className="edit-task-button"
                onClick={() => editTask(task._id)}
              >
                <FiEdit3 />
              </button>
            )}
            <button
              className="delete-task-button"
              onClick={() => deleteTask(task._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      ))}
      {completedTasks.length > 0 && (
        <div className="completed-section">
          <h2>Completed</h2>
          <button onClick={toggleCompleted} className="toggle-completed">
            {showCompleted ? "Hide" : "Show"}
          </button>
          {showCompleted &&
            completedTasks.map((task) => (
              <div key={task._id} className="task">
                <input
                  type="checkbox"
                  checked
                  onClick={() => uncompleteTask(task._id)}
                />
                <span className="completed">{task.content}</span>
                <button
                  className="delete-task-button"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
