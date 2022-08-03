import { useMemo } from 'react';

import { TodoItem } from './TodoItem';
import { Todo } from './TodoList';

type TodoListMainProps = {
  todos: Todo[];
  setTodoLabel: (id: string, label: string) => void;
  setTodoIsCompleted: (id: string, isCompleted: boolean) => void;
  toggleAllTodoIsCompleted: () => void;
  removeTodo: (id: string) => void;
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
};

/** This section should be hidden by default and shown when there are todos. */
export const TodoListMain = ({
  todos,
  setTodoLabel,
  setTodoIsCompleted,
  toggleAllTodoIsCompleted,
  removeTodo,
  filter
}: TodoListMainProps): JSX.Element => {
  const filteredTodos = useMemo(() => {
    if (filter === 'ALL') {
      return todos;
    }
    const showCompleted = filter === 'COMPLETED';
    return todos.filter((todo) =>
      showCompleted ? todo.isCompleted : !todo.isCompleted
    );
  }, [filter, todos]);

  return (
    <section className='main' hidden={todos.length === 0}>
      <input
        id='toggle-all'
        className='toggle-all'
        type='checkbox'
        checked={todos.every((todo) => todo.isCompleted)}
        onChange={toggleAllTodoIsCompleted}
      />
      <label htmlFor='toggle-all'>Mark all as complete</label>
      <ul className='todo-list'>
        {filteredTodos.map((todo, id) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodoLabel={(label: string) => setTodoLabel(todo.id, label)}
            setTodoIsCompleted={(isCompleted: boolean) =>
              setTodoIsCompleted(todo.id, isCompleted)
            }
            removeTodo={() => removeTodo(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
};
