import toast from "react-hot-toast";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { sliceState, Todo, todoState } from "../../types/Todo";

// const BD = "http://localhost:8080/todos";
const BD = "https://springbe.herokuapp.com/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    return fetch(BD, { mode: "no-cors" }).then((data) => data.json());
  } catch (error) {
    return alert(error);
  }
});

export const handleCreate = createAsyncThunk(
  "todos/handleCreate",
  async (todo: todoState) => {
    if (todo.description == "") {
      return alert("A descrição é obrigatória!");
    } else {
      let data = {
        tarefa: todo.description,
        status: todo.status,
        foto: todo.photo,
      };
      try {
        await fetch(BD, {
          mode: "no-cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return toast.success("Nova Tarefa criada", {
          position: "bottom-center",
        });
      } catch (error) {
        return alert(error);
      }
    }
  }
);

export const handleDelete = createAsyncThunk(
  "todos/handleDelete",
  async (id: number) => {
    try {
      await fetch(`${BD}/${id}`, {
        mode: "no-cors",
        method: "DELETE",
      });
      toast.success("Tarefa concluida", {
        position: "bottom-center",
      });
      return id;
    } catch (error) {
      return alert(error);
    }
  }
);

export const handleComplete = createAsyncThunk(
  "todos/handleComplete",
  async (todo: Todo) => {
    try {
      let data = {
        tarefa: todo.tarefa,
        status: "Finalizada",
        foto: todo.foto,
      };

      await fetch(`${BD}/${todo.id}`, {
        mode: "no-cors",
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Tarefa concluida", {
        position: "bottom-center",
      });
      return todo;
    } catch (error) {
      return alert(error);
    }
  }
);

export const handleEdit = createAsyncThunk(
  "todos/handleEdit",
  async (todo: any) => {
    if (todo.description == "") {
      alert("A descrição é obrigatória!");
    } else {
      try {
        let data = {
          tarefa: todo.description,
          status: todo.status,
          foto: todo.photo,
        };

        await fetch(`${BD}/${todo.get.todos[todo.edit.current].id}`, {
          mode: "no-cors",
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return toast.success("Tarefa editada", {
          position: "bottom-center",
        });
      } catch (error) {
        return console.log(error);
      }
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: -1,
        tarefa: "",
        status: "",
        foto: "",
      },
    ],
    isCreateModalVisible: false,
    isEditModalVisible: false,
    isFotoModalVisible: false,
    modalImage: "",
  },
  reducers: {
    showCreateModal: (state) => {
      state.isCreateModalVisible = true;
    },
    closeCreateModal: (state) => {
      state.isCreateModalVisible = false;
    },
    showEditModal: (state) => {
      state.isEditModalVisible = true;
    },
    closeEditModal: (state) => {
      state.isEditModalVisible = false;
    },
    showFotoModal: (state, { payload }) => {
      state.isFotoModalVisible = true;
      state.modalImage = payload;
    },
    closeFotoModal: (state) => {
      state.isFotoModalVisible = false;
    },
  },
  extraReducers: {
    // [getTodos.pending]: (state) => {
    //   state.status = "loading";
    // },
    [getTodos.fulfilled.type]: (state, { payload }: PayloadAction<Todo[]>) => {
      state.todos = payload;
      // state.status = "sucess";
    },
    // [getTodos.rejected]: (state) => {
    //   state.status = "failed";
    // },
    // [handleCreate.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleCreate.fulfilled.type]: (state) => {
      // state.status = "sucess";
      state.isCreateModalVisible = false;
    },
    // [handleCreate.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleComplete.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleComplete.fulfilled.type]: (state) => {
      // state.status = "sucess";
      state.isCreateModalVisible = false;
      // action.payload.status = "Finalizada";
      // state.todos = state.todos;
      // console.log(action.payload.status, "AAAAAAAAAAAAAa");
    },
    // [handleComplete.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleDelete.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleDelete.fulfilled.type]: (state, action) => {
      state.todos = state.todos.filter(
        (todo: Todo) => todo.id != action.payload
      );
    },
    // [handleDelete.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleEdit.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleEdit.fulfilled.type]: (state) => {
      // state.status = "sucess";
      state.isEditModalVisible = false;
    },
    // [handleEdit.rejected]: (state) => {
    //   state.status = "failed";
    // },
  },
});

export default todoSlice.reducer;
export const {
  showCreateModal,
  closeCreateModal,
  showEditModal,
  showFotoModal,
  closeFotoModal,
  closeEditModal,
} = todoSlice.actions;
