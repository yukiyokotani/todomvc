import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { TodoListMain } from './TodoListMain';

export const TodoList = (): JSX.Element => {
  return (
    <section className='todoapp'>
      <TodoListHeader />
      <TodoListMain />
      <TodoListFooter />
    </section>
  );
};
