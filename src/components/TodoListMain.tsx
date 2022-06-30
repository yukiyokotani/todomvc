import { useCallback, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Todo, TodoItem } from './TodoItem';

type TodoListMainProps = {
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
};

/** This section should be hidden by default and shown when there are todos. */
export const TodoListMain = ({ filter }: TodoListMainProps): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      label: 'Taste JavaScript',
      isCompleted: true
    },
    {
      id: uuid(),
      label: 'Buy a unicorn',
      isCompleted: false
    }
  ]);

  const filteredTodos = useMemo(() => {
    if (filter === 'ALL') {
      return todos;
    }
    const showActive = filter === 'ACTIVE';
    return todos.filter((todo) =>
      showActive ? !todo.isCompleted : todo.isCompleted
    );
  }, [filter, todos]);

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
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodoLabel={(label: string) => setTodoLabel(index, label)}
            setTodoIsCompleted={(isCompleted: boolean) =>
              setTodoIsCompleted(index, isCompleted)
            }
          />
        ))}
      </ul>
    </section>
  );
};
