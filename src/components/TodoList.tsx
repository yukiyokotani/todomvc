import { useCallback, useEffect, useState } from 'react';
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

  /** 新しいTodoを取得する */
  const fetchTodo = useCallback(async () => {
    const newTodos = await fetch('http://localhost:8080/todos', {
      method: 'GET',
      mode: 'cors'
    }).then((response) => response.json());
    setTodos(newTodos);
  }, []);

  /**
   * 新しいTodoを追加する
   * @param label - 新しいTodoのラベル
   */
  const addTodo = useCallback(
    async (label: string) => {
      const newTodo: Todo = {
        id: uuid(),
        label,
        isCompleted: false
      };
      await fetch('http://localhost:8080/todos', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });
      fetchTodo();
    },
    [fetchTodo]
  );

  /**
   * Todoのラベルを変更する
   * @param id - Todoのid
   * @param label - Todoの新しいラベル
   */
  const setTodoLabel = useCallback(
    async (id: string, label: string) => {
      const targetTodo = todos.find((todo) => todo.id === id);
      if (!targetTodo) return;
      const updatedTodo = { ...targetTodo, label };
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      fetchTodo();
    },
    [fetchTodo, todos]
  );

  /**
   * Todoの完了状態を変更する
   * @param id - Todoのid
   */
  const setTodoIsCompleted = useCallback(
    async (id: string, isCompleted: boolean) => {
      const targetTodo = todos.find((todo) => todo.id === id);
      if (!targetTodo) return;
      const updatedTodo = { ...targetTodo, isCompleted };
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      fetchTodo();
    },
    [fetchTodo, todos]
  );

  /**  すべてのTodoの完了状態をトグルする */
  const toggleAllTodoIsCompleted = useCallback(async () => {
    const isAllCompleted = todos.every((todo) => todo.isCompleted);
    const newTodos = isAllCompleted
      ? todos.map((todo) => ({ ...todo, isCompleted: false }))
      : todos.map((todo) => ({ ...todo, isCompleted: true }));
    await fetch(`http://localhost:8080/todos`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodos)
    });
    fetchTodo();
  }, [fetchTodo, todos]);

  /**
   * Todoを削除する
   * @param id - Todoのid
   */
  const removeTodo = useCallback(
    async (id: string) => {
      // MEMO: 別解
      // const newTodos = todos.filter((todo) => todo.id !== id);
      // setTodos(newTodos);
      await fetch(`http://localhost:8080/todos/${id}`, {
        method: 'DELETE',
        mode: 'cors'
      });
      fetchTodo();
    },
    [fetchTodo]
  );

  /** 完了したTodoを削除する */
  const removeCompletedTodo = useCallback(async () => {
    const completedTodos = todos.filter((todo) => todo.isCompleted);
    const param = completedTodos.map((todo) => `id=${todo.id}`).join('&');
    await fetch(`http://localhost:8080/todos/?${param}`, {
      method: 'DELETE',
      mode: 'cors'
    });
    fetchTodo();
  }, [fetchTodo, todos]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

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
