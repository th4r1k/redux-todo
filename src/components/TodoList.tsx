import { Todo } from "../types/Todo";
import { TodoItem } from "./TodoItem";

function TodoList(props: any) {
  return (
    <>
      <button
        className="mb-1 w-full bg-gray-100 text-black font-bold text-center hover:bg-gray-300 transition-colors py-2"
        onClick={props.showCreateModal}
      >
        Adicionar Tarefa
      </button>
      <table className="w-full bg-stone-300">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Foto</th>
            <th>Acoes</th>
          </tr>
        </thead>
        <tbody>
          {props.todos?.map((todo: Todo, index: number) => (
            <TodoItem
              key={index}
              index={index}
              todo={todo}
              showFotoModal={props.showFotoModal}
              editTodo={props.editTodo}
              handleFinish={props.handleFinish}
              handleDelete={props.handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;
