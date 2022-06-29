import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Todo, TodoItem } from './TodoItem';

/** This section should be hidden by default and shown when there are todos. */
export const TodoListMain = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      label: 'Taste JavaScript',
      isEditable: false,
      isCompleted: true
    },
    {
      id: uuid(),
      label: 'Buy a unicorn',
      isEditable: false,
      isCompleted: false
    }
  ]);

  const setTodoLabel = useCallback(
    (index: number, label: string) => {
      const newTodos = [...todos];
      const targetTodo = newTodos[index];
      if (targetTodo) {
        targetTodo.label = label;
        setTodos(newTodos);
      }
    },
    [todos]
  );

  const setTodoIsEditable = useCallback(
    (index: number, isEditable: boolean) => {
      const newTodos = [...todos];
      const targetTodo = newTodos[index];
      if (targetTodo) {
        targetTodo.isEditable = isEditable;
        setTodos(newTodos);
      }
    },
    [todos]
  );

  const setTodoIsCompleted = useCallback(
    (index: number, isCompleted: boolean) => {
      const newTodos = [...todos];
      const targetTodo = newTodos[index];
      if (targetTodo) {
        targetTodo.isCompleted = isCompleted;
        setTodos(newTodos);
      }
    },
    [todos]
  );

  return (
    <section className='main'>
      <input id='toggle-all' className='toggle-all' type='checkbox' />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodoLabel={(label: string) => setTodoLabel(index, label)}
            setTodoIsEditable={(isEditable: boolean) =>
              setTodoIsEditable(index, isEditable)
            }
            setTodoIsCompleted={(isCompleted: boolean) =>
              setTodoIsCompleted(index, isCompleted)
            }
          />
        ))}
      </ul>
    </section>
  );
};
