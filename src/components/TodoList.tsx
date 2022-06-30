import { useState } from 'react';

import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { TodoListMain } from './TodoListMain';

export type Filter = 'ALL' | 'ACTIVE' | 'COMPLETED';

export const TodoList = (): JSX.Element => {
  const [filter, setFilter] = useState<Filter>('ALL');

  return (
    <section className='todoapp'>
      <TodoListHeader />
      <TodoListMain filter={filter} />
      <TodoListFooter filter={filter} setFilter={setFilter} />
    </section>
  );
};
