import { useCallback, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { TodoListMain } from './TodoListMain';

export type Filter = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type Todo = {
  id: string;
  label: string;
  isCompleted: boolean;
};

export const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // MEMO: routingは実装しない。初期値のみハッシュから取得する
  const [filter, setFilter] = useState<Filter>(() => {
    // MEMO: HashLocationStrategyと呼ぶ。最近はPathLocationStrategyが一般的であり、あまり使用しない。
    const hash = location.hash.slice(2);
    switch (hash) {
      case 'active':
        return 'ACTIVE';
      case 'completed':
        return 'COMPLETED';
      default:
        return 'ALL';
    }
  });

  /**
   * 新しいTodoを追加する
   * @param label - 新しいTodoのラベル
   */
  const addTodo = useCallback(
    (label: string) => {
      const newTodo: Todo = {
        id: uuid(),
        label,
        isCompleted: false
      };
      setTodos([...todos, newTodo]);
    },
    [todos]
  );

  /**
   * 既存のTodoのラベルを変更する
   * @param index - Todoのindex
   * @param label - Todoの新しいラベル
   */
  const setTodoLabel = useCallback(
    (index: number, label: string) => {
      const newTodos = [...todos];
      const targetTodo = newTodos[index];
      if (targetTodo) {
        targetTodo.label = label;
      }
      setTodos(newTodos);
    },
    [todos]
  );

  /**
   * Todoの完了状態を変更する
   * @param index - Todoのindex
   */
  const setTodoIsCompleted = useCallback(
    (index: number, isCompleted: boolean) => {
      const newTodos = [...todos];
      const targetTodo = newTodos[index];
      if (targetTodo) {
        targetTodo.isCompleted = isCompleted;
      }
      setTodos(newTodos);
    },
    [todos]
  );

  /**  すべてのTodoの完了状態をトグルする */
  const toggleAllTodoIsCompleted = useCallback(() => {
    const isAllCompleted = todos.every((todo) => todo.isCompleted);
    const newTodos = isAllCompleted
      ? todos.map((todo) => ({ ...todo, isCompleted: false }))
      : todos.map((todo) => ({ ...todo, isCompleted: true }));
    console.log(newTodos);
    setTodos(newTodos);
  }, [todos]);

  /**
   * Todoを削除する
   * @param index - Todoのindex
   */
  const removeTodo = useCallback(
    (index: number) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      // MEMO: 別解
      // const newTodos = [
      //   ...todos.slice(0, index),
      //   ...todos.slice(index + 1, todos.length)
      // ];
      // setTodos(newTodos);
    },
    [todos]
  );

  /** Todoを削除する */
  const removeCompletedTodo = useCallback(() => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  }, [todos]);

  return (
    <section className='todoapp'>
      <TodoListHeader addTodo={addTodo} />
      <TodoListMain
        todos={todos}
        filter={filter}
        setTodoLabel={setTodoLabel}
        setTodoIsCompleted={setTodoIsCompleted}
        toggleAllTodoIsCompleted={toggleAllTodoIsCompleted}
        removeTodo={removeTodo}
      />
      {todos.length !== 0 && (
        <TodoListFooter
          todos={todos}
          filter={filter}
          setFilter={setFilter}
          removeCompletedTodo={removeCompletedTodo}
        />
      )}
    </section>
  );
};
