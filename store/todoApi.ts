import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTodosByTodoId: build.query<
      GetTodosByTodoIdApiResponse,
      GetTodosByTodoIdApiArg
    >({
      query: (queryArg) => ({ url: `/todos/${queryArg.todoId}` })
    }),
    patchTodosByTodoId: build.mutation<
      PatchTodosByTodoIdApiResponse,
      PatchTodosByTodoIdApiArg
    >({
      query: (queryArg) => ({
        url: `/todos/${queryArg.todoId}`,
        method: 'PATCH',
        body: queryArg.todo
      })
    }),
    postTodos: build.mutation<PostTodosApiResponse, PostTodosApiArg>({
      query: (queryArg) => ({
        url: `/todos`,
        method: 'POST',
        body: queryArg.todo
      })
    }),
    getTodos: build.query<GetTodosApiResponse, GetTodosApiArg>({
      query: () => ({ url: `/todos` })
    })
  }),
  overrideExisting: false
});
export { injectedRtkApi as todoApi };
export type GetTodosByTodoIdApiResponse =
  /** status 200 Todoが見つかった */ Todoアイテム;
export type GetTodosByTodoIdApiArg = {
  todoId: string;
};
export type PatchTodosByTodoIdApiResponse =
  /** status 200 Todoが更新された */ Todoアイテム;
export type PatchTodosByTodoIdApiArg = {
  todoId: string;
  /** Todoアイテムを更新する */
  todo: Todoアイテム;
};
export type PostTodosApiResponse =
  /** status 200 リクエストのTodoが正常に登録された */ Todoアイテム;
export type PostTodosApiArg = {
  /** Todoを登録するためには必須フィールドを埋める */
  todo: Todoアイテム;
};
export type GetTodosApiResponse = /** status 200 OK */ Todoアイテム[];
export type GetTodosApiArg = void;
export type Todoアイテム = {
  id: string;
  label: string;
  isCompleted: boolean;
};
export const {
  useGetTodosByTodoIdQuery,
  usePatchTodosByTodoIdMutation,
  usePostTodosMutation,
  useGetTodosQuery
} = injectedRtkApi;
