import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import TodoList from "./pages/list/TodoList";
import TodoRegist from "./pages/regist/TodoRegist";
import TodoInfo from "./pages/info/TodoInfo";
import TodoUpdate from "./pages/update/TodoUpdate";
import Error from "./pages/errors/Error";
import Root from "./pages/Root";
import TodoItem from "./pages/list/TodoItem";
import ButtonSu from "./layout/ButtonSu";

// 라우터 설정
const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    errorElement: <Error />,
    element: <Root />,
    children: [
      {
        path: "",
        element: <TodoList />,
      },
      {
        path: "regist",
        element: <TodoRegist />,
      },
      {
        path: "todoinfo/:id",
        element: <TodoInfo />,
      },
      {
        path: "edit",
        element: <TodoUpdate />,
      },
      {
        path: "test",
        element: <ButtonSu />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
