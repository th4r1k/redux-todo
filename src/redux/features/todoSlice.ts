import toast from "react-hot-toast";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sliceState, Todo, todoState } from "../../types/Todo";

const BD = "http://localhost:8080/todos";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  return fetch(BD).then((data) => data.json());
});

export const handleCreate = createAsyncThunk(
  "todos/handleCreate",
  async (todo: todoState) => {
    console.log(todo);
    if (todo.description == "") {
      alert("A descrição é obrigatória!");
    } else {
      let data = {
        tarefa: todo.description,
        status: todo.status,
        foto: todo.photo,
      };
      try {
        await fetch(BD, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("Nova Tarefa criada", {
          position: "bottom-center",
        });
      } catch (error) {
        alert(error);
      }
    }
  }
);

export const handleDelete = createAsyncThunk(
  "todos/handleDelete",
  async (id: number) => {
    console.log(id);
    try {
      await fetch(`${BD}/${id}`, {
        method: "DELETE",
      });
      toast.success("Tarefa deletada", {
        position: "bottom-center",
      });
    } catch (error) {
      alert(error);
    }
  }
);

export const handleComplete = createAsyncThunk(
  "todos/handleComplete",
  async (todo: Todo) => {
    console.log(todo);
    try {
      let data = {
        tarefa: todo.tarefa,
        status: "Finalizada",
        foto: todo.foto,
      };

      await fetch(`${BD}/${todo.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      alert(error);
    }
  }
);

export const handleEdit = createAsyncThunk(
  "todos/handleEdit",
  async (todo: sliceState) => {
    console.log(todo);
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
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        toast.success("Tarefa editada", {
          position: "bottom-center",
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [
      {
        id: "",
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
      console.log(payload);
    },
    closeFotoModal: (state) => {
      state.isFotoModalVisible = false;
    },
  },
  extraReducers: {
    // [getTodos.pending]: (state) => {
    //   state.status = "loading";
    // },
    [getTodos.fulfilled]: (state, { payload }) => {
      state.todos = payload;
      // state.status = "sucess";
    },
    // [getTodos.rejected]: (state) => {
    //   state.status = "failed";
    // },
    // [handleCreate.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleCreate.fulfilled]: (state) => {
      // state.status = "sucess";
      state.isCreateModalVisible = false;
    },
    // [handleCreate.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleComplete.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleComplete.fulfilled]: (state) => {
      // state.status = "sucess";
      state.isCreateModalVisible = false;
    },
    // [handleComplete.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleDelete.pending]: (state) => {
    //   state.status = "loading";
    // },
    // [handleDelete.fulfilled]: (state) => {
    //   state.status = "sucess";
    // },
    // [handleDelete.rejected]: (state) => {
    //   state.status = "failed";
    // },

    // [handleEdit.pending]: (state) => {
    //   state.status = "loading";
    // },
    [handleEdit.fulfilled]: (state) => {
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
