import React, { useState, useEffect } from 'react';
import './TodoBoard.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function TodoBoard() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    return stored ? JSON.parse(stored) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: newTodo.trim(), dueDate, done: false, completedDate: null }]);
    setNewTodo('');
    setDueDate('');
  };

  const toggleTodo = (id) => {
    const updated = todos.map(todo => {
      if (todo.id === id) {
        const done = !todo.done;
        return { ...todo, done, completedDate: done ? new Date().toISOString().split('T')[0] : null };
      }
      return todo;
    });
    setTodos(updated);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.done));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTodos(items);
  };

  const hasCompleted = todos.some(todo => todo.done);

  return (
    <div className="todo-board refined">
      <h3 className="todo-header">📝 TODOs</h3>
      <div className="todo-inputs">
        <input
          type="text"
          value={newTodo}
          placeholder="What do you need to do?"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <button
        className="clear-completed"
        onClick={clearCompleted}
        disabled={!hasCompleted}
        style={{ opacity: hasCompleted ? 1 : 0.5, cursor: hasCompleted ? 'pointer' : 'not-allowed' }}
      >
        Clear Completed
      </button>
      {todos.length === 0 ? (
        <p style={{ color: '#ccc', marginTop: '1rem', textAlign: 'center' }}>No tasks yet</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, index) => (
                  <Draggable key={todo.id} draggableId={todo.id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={todo.done ? 'done' : ''}
                      >
                        <input
                          type="checkbox"
                          checked={todo.done}
                          onChange={() => toggleTodo(todo.id)}
                        />
                        <span className="todo-text">{todo.text}</span>
                        {todo.dueDate && <span className="due-date">📅 {todo.dueDate}</span>}
                        <button className="delete" onClick={() => deleteTodo(todo.id)}>×</button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default TodoBoard;
