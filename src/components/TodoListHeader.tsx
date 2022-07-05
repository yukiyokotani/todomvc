import { useCallback, useState } from 'react';

type TodoListHeaderProps = {
  addTodo: (label: string) => void;
};

export const TodoListHeader = ({
  addTodo
}: TodoListHeaderProps): JSX.Element => {
  const [todo, setTodo] = useState('');

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodo(event.target.value.trim());
    },
    []
  );

  const handleKeydownInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && todo.length !== 0) {
        addTodo(todo);
        setTodo('');
      }
    },
    [addTodo, todo]
  );

  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        autoFocus
        value={todo}
        onChange={handleChangeInput}
        onKeyDown={handleKeydownInput}
      />
    </header>
  );
};
