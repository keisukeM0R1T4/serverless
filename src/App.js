import TodoList from './components/TodoList';
import React, {useState, useEffect} from 'react';

function App() {
  const [todo, setTodo] = useState([]);

  return (
    <div style={{ margin:'2em'}}>
      {todo}
      <TodoList/>
    </div>
  );
}

export default App;
