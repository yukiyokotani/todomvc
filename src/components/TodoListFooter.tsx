import { useMemo } from 'react';

import { Filter, Todo } from './TodoList';

type TodoListFooterProps = {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  removeCompletedTodo: () => void;
};

/** This footer should be hidden by default and shown when there are todos */
export const TodoListFooter = ({
  todos,
  filter,
  setFilter,
  removeCompletedTodo
}: TodoListFooterProps): JSX.Element => {
  const leftItemsCount = useMemo(
    () => todos.filter((todo) => !todo.isCompleted).length,
    [todos]
  );

  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{leftItemsCount}</strong>
        {leftItemsCount === 1 ? ' item' : ' items'} left
      </span>
      {/* Remove this if you don't implement routing */}
      <ul className='filters'>
        <li onClick={() => setFilter('ALL')}>
          <a className={filter === 'ALL' ? 'selected' : undefined} href='#/'>
            All
          </a>
        </li>
        <li onClick={() => setFilter('ACTIVE')}>
          <a
            className={filter === 'ACTIVE' ? 'selected' : undefined}
            href='#/active'
          >
            Active
          </a>
        </li>
        <li onClick={() => setFilter('COMPLETED')}>
          <a
            className={filter === 'COMPLETED' ? 'selected' : undefined}
            href='#/completed'
          >
            Completed
          </a>
        </li>
      </ul>
      <button
        className='clear-completed'
        hidden={leftItemsCount === todos.length}
        onClick={removeCompletedTodo}
      >
        Clear completed
      </button>
    </footer>
  );
};
