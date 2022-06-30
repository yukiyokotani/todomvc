import { Filter } from './TodoList';

type TodoListFooterProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

/** This footer should be hidden by default and shown when there are todos */
export const TodoListFooter = ({
  filter,
  setFilter
}: TodoListFooterProps): JSX.Element => {
  return (
    <footer className='footer'>
      {/* This should be `0 items left` by default */}
      <span className='todo-count'>
        <strong>0</strong> item left
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
      {/* Hidden if no completed items are left ↓ */}
      <button className='clear-completed'>Clear completed</button>
    </footer>
  );
};
