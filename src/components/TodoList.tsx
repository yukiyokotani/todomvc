import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Todo } from './TodoItem';
import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { TodoListMain } from './TodoListMain';

export type Filter = 'ALL' | 'ACTIVE' | 'COMPLETED';

export const TodoList = (): JSX.Element => {
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

  const [filter, setFilter] = useState<Filter>('ALL');

  return (
    <section className='todoapp'>
      <TodoListHeader />
      <TodoListMain todos={todos} setTodos={setTodos} filter={filter} />
      <TodoListFooter todos={todos} filter={filter} setFilter={setFilter} />
    </section>
  );
};
