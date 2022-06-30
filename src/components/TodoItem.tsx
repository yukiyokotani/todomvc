import React, { useCallback, useRef } from 'react';

export type Todo = {
  id: string;
  label: string;
  isCompleted: boolean;
};

type TodoItemProps = {
  todo: Todo;
  setTodoLabel: (label: string) => void;
  setTodoIsCompleted: (isCompleted: boolean) => void;
};

/**
 * These are here just to show the structure of the list items.
 * List items should get the class `editing` when editing and `completed` when marked as completed.
 */
export const TodoItem = ({
  todo,
  setTodoLabel,
  setTodoIsCompleted
}: TodoItemProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoLabel(event.target.value);
    },
    [setTodoLabel]
  );

  const handleKeydownInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        inputRef.current?.blur();
      }
    },
    []
  );

  const handleClickCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoIsCompleted(event.target.checked);
    },
    [setTodoIsCompleted]
  );

  const handleDbclickItem = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      console.log(event);
      event.currentTarget.classList.toggle('editing');
      inputRef.current?.focus();
    },
    []
  );

  const handleBlurItem = useCallback(
    (event: React.FocusEvent<HTMLLIElement>) => {
      if (event.currentTarget.classList.contains('editing')) {
        event.currentTarget.classList.toggle('editing');
      }
    },
    []
  );

  return (
    <li
      className={todo.isCompleted ? 'completed' : undefined}
      onDoubleClick={handleDbclickItem}
      onBlur={handleBlurItem}
    >
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={todo.isCompleted}
          onChange={handleClickCheckbox}
        />
        <label>{todo.label}</label>
        <button className='destroy'></button>
      </div>
      <input
        ref={inputRef}
        className='edit'
        value={todo.label}
        onChange={handleChangeInput}
        onKeyDown={handleKeydownInput}
      />
    </li>
  );
};
