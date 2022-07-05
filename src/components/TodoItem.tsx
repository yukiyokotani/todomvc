import React, { useCallback, useMemo, useRef } from 'react';

import { Todo } from './TodoList';

type TodoItemProps = {
  todo: Todo;
  setTodoLabel: (label: string) => void;
  setTodoIsEditing: (isEditing: boolean) => void;
  setTodoIsCompleted: (isCompleted: boolean) => void;
  removeTodo: () => void;
};

/**
 * These are here just to show the structure of the list items.
 * List items should get the class `editing` when editing and `completed` when marked as completed.
 */
export const TodoItem = ({
  todo,
  setTodoLabel,
  setTodoIsEditing,
  setTodoIsCompleted,
  removeTodo
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

  const handleDbclickItem = useCallback(() => {
    setTodoIsEditing(true);
    queueMicrotask(() => inputRef.current?.focus());
  }, [setTodoIsEditing]);

  const handleBlurItem = useCallback(() => {
    setTodoIsEditing(false);
  }, [setTodoIsEditing]);

  // 宣言的ではない実装
  // const handleDbclickItem = useCallback(
  //   (event: React.MouseEvent<HTMLLIElement>) => {
  //     event.currentTarget.classList.toggle('editing');
  //     inputRef.current?.focus();
  //   },
  //   []
  // );

  // 宣言的ではない実装
  // const handleBlurItem = useCallback(
  //   (event: React.FocusEvent<HTMLLIElement>) => {
  //     if (event.currentTarget.classList.contains('editing')) {
  //       event.currentTarget.classList.toggle('editing');
  //     }
  //   },
  //   []
  // );

  const liClassName = useMemo(() => {
    const classNameList = [];
    if (todo.isEditing) {
      classNameList.push('editing');
    }
    if (todo.isCompleted) {
      classNameList.push('completed');
    }
    console.log(classNameList);
    return classNameList.join(' ');
  }, [todo.isCompleted, todo.isEditing]);

  return (
    <li
      className={liClassName}
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
        <button className='destroy' onClick={removeTodo}></button>
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
