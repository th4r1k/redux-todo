export type Todo = {
  id: number;
  status: string;
  tarefa: string;
  foto: string;
};

export type todoState = {
  description: string;
  status: string;
  photo: string;
};

export type sliceState = {
  id?: number;
  description?: string;
  status?: string;
  photo?: string;
  edit: {
    current: number;
  };
  get: {
    todos: [
      {
        id: number;
        tarefa: string;
        status: string;
        foto: string;
      }
    ];
    isCreateModalVisible?: boolean;
    isEditModalVisible?: boolean;
    isFotoModalVisible?: boolean;
    modalImage?: string;
  };
};

export type InitialStatus = {
  todos: [
    {
      id: number;
      tarefa: string;
      status: string;
      foto: string;
    }
  ];
  isCreateModalVisible: boolean;
  isEditModalVisible: boolean;
  isFotoModalVisible: boolean;
  modalImage: string;
};
