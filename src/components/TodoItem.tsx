import React, { useCallback, useMemo, useRef, useState } from 'react';

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

  const [todoLabelInEditing, setTodoLabelInEditing] = useState('');

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoLabelInEditing(event.target.value);
    },
    [setTodoLabelInEditing]
  );

  const confirmEditLabel = useCallback(() => {
    const trimedLabel = todoLabelInEditing.trim();
    if (trimedLabel.length === 0) {
      removeTodo();
    } else {
      setTodoLabel(trimedLabel);
      setTodoIsEditing(false);
    }
  }, [removeTodo, setTodoIsEditing, setTodoLabel, todoLabelInEditing]);

  const handleKeydownInput = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        confirmEditLabel();
        // MEMO: 以下で一様にsetTodoIsEditing(false)してはダメ。setTodoIsEditingが勝ってremoveされなくなるため。
      }
      if (event.key === 'Escape') {
        setTodoIsEditing(false);
      }
    },
    [confirmEditLabel, setTodoIsEditing]
  );

  const handleClickCheckbox = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoIsCompleted(event.target.checked);
    },
    [setTodoIsCompleted]
  );

  const handleDbclickItem = useCallback(() => {
    setTodoLabelInEditing(todo.label);
    setTodoIsEditing(true);
    queueMicrotask(() => inputRef.current?.focus());
  }, [setTodoIsEditing, todo.label]);

  const handleBlurItem = useCallback(() => {
    if (todo.isEditing) {
      confirmEditLabel();
      setTodoIsEditing(false);
    }
  }, [confirmEditLabel, setTodoIsEditing, todo.isEditing]);

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
        value={todoLabelInEditing}
        onChange={handleChangeInput}
        onKeyDown={handleKeydownInput}
      />
    </li>
  );
};
