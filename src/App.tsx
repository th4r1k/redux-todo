import { useEffect, useRef, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Toaster } from "react-hot-toast";
import { ModalTodo } from "./components/ModalTodo";
import { ModalFoto } from "./components/ModalFoto";
import TodoList from "./components/TodoList";
import {
  closeCreateModal,
  showCreateModal,
  showEditModal,
  getTodos,
  handleCreate,
  handleDelete,
  handleComplete,
  handleEdit,
  showFotoModal,
  closeFotoModal,
  closeEditModal,
} from "./redux/features/todoSlice";
import { convertToBase64 } from "./utils/convertToBase64";
import { Todo } from "./types/Todo";
import { useAppDispatch, useAppSelector } from "./redux/store";

function App() {
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pendente");
  const [photo, setPhoto] = useState("");

  const dispatch = useAppDispatch();
  const app = useAppSelector();
  const edit = useRef(-1);

  useEffect(() => {
    const fetchBd = async () => {
      try {
        dispatch(getTodos());
      } catch (error) {
        alert(error);
      }
    };
    fetchBd();
  }, [dispatch, app.get.isCreateModalVisible, app.get.isEditModalVisible]);

  const resetData = () => {
    URL.revokeObjectURL(photo);
    setPhoto("");
    setDescription("");
    setStatus("Pendente");
  };

  const editTodo = (id: number) => {
    setDescription(app.get.todos[id].tarefa);
    setStatus(app.get.todos[id].status);
    setPhoto(app.get.todos[id].foto);
    dispatch(showEditModal());
    edit.current = id;
  };

  async function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const file = target.files![0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      const base64: any = await convertToBase64(file);
      setPhoto(base64);
    }
    return;
  }

  return (
    <>
      <Toaster />
      <TodoList
        todos={app.get.todos}
        showCreateModal={() => {
          dispatch(showCreateModal());
        }}
        showFotoModal={(id: number) => {
          dispatch(showFotoModal(id));
        }}
        editTodo={editTodo}
        handleFinish={(id: Todo) => {
          dispatch(handleComplete(id));
          dispatch(getTodos());
        }}
        handleDelete={(id: number) => {
          dispatch(handleDelete(id));
        }}
      />

      <ModalTodo
        title="Criar nova tarefa"
        onOk={() => {
          dispatch(handleCreate({ description, status, photo })), resetData();
        }}
        onCancel={() => {
          dispatch(closeCreateModal()), resetData();
        }}
        visible={app.get.isCreateModalVisible}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        photo={photo}
        setPhoto={setPhoto}
        addImage={addImage}
      />

      <ModalTodo
        title="Editar tarefa"
        onOk={() => {
          dispatch(handleEdit({ description, status, photo, edit, ...app })),
            resetData();
        }}
        onCancel={() => {
          dispatch(closeEditModal());
          resetData();
        }}
        visible={app.get.isEditModalVisible}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        photo={photo}
        setPhoto={setPhoto}
        addImage={addImage}
      />

      <ModalFoto
        title="Foto da tarefa"
        onCancel={() => {
          dispatch(closeFotoModal());
        }}
        visible={app.get.isFotoModalVisible}
        todos={app.get.todos}
        modalImage={app.get.modalImage}
      />
    </>
  );
}

export default App;
