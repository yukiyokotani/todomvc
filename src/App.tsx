import 'todomvc-app-css/index.css';
import 'todomvc-common/base.css';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';

const App = (): JSX.Element => {
  return (
    <>
      <TodoList />
      <Footer />
    </>
  );
};

export default App;
