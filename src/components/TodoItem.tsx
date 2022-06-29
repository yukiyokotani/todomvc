import React, { useCallback } from 'react';

export type Todo = {
  id: string;
  label: string;
  isEditable: boolean;
  isCompleted: boolean;
};

type TodoItemProps = {
  todo: Todo;
  setTodoLabel: (label: string) => void;
  setTodoIsEditable: (isEditable: boolean) => void;
  setTodoIsCompleted: (isCompleted: boolean) => void;
};

/**
 * These are here just to show the structure of the list items.
 * List items should get the class `editing` when editing and `completed` when marked as completed.
 */
export const TodoItem = ({
  todo,
  setTodoLabel,
  setTodoIsEditable,
  setTodoIsCompleted
}: TodoItemProps): JSX.Element => {
  const handleKeydown = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoLabel(event.currentTarget.value);
    },
    [setTodoLabel]
  );

  const handleClickCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoIsCompleted(event.currentTarget.checked);
    },
    [setTodoIsCompleted]
  );

  return (
    <li className='completed'>
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
      <input className='edit' value={todo.label} onChange={handleKeydown} />
    </li>
  );
};
