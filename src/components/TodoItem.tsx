interface Iprops {
  todo: {
    id: number;
    tarefa: string;
    status: string;
    foto: string;
  };
  index: number;
  showFotoModal: (id: number) => void;
  editTodo: (id: number) => void;
  handleFinish: (data: Iprops["todo"]) => void;
  handleDelete: (id: number) => void;
}

export function TodoItem(props: Iprops) {
  return (
    <tr className="text-center odd:bg-gray-200 bg-gray-100">
      <td>{props.todo.tarefa}</td>
      <td>{props.todo.status}</td>
      <td>
        {props.todo.foto ? (
          <button
            onClick={() => {
              props.showFotoModal(props.index);
            }}
            className="align-middle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
      </td>
      <td>
        <button
          className="font-bold text-sm hover:text-gray-600 hover:border-gray-600 hover:rounded-full border-2 border-transparent mx-1 flex-shrink-0"
          onClick={() => {
            props.editTodo(props.index);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
        <button
          className="font-bold text-sm hover:text-green-600 hover:border-green-600 hover:rounded-full border-2 border-transparent mx-1 flex-shrink-0"
          onClick={() => {
            props.handleFinish(props.todo);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>

        <button
          className="font-bold text-sm hover:text-red-600 hover:border-red-600 hover:rounded-full border-2 border-transparent mx-1 flex-shrink-0"
          onClick={() => {
            props.handleDelete(props.todo.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}
