import { Modal } from "antd";

export function ModalTodo(props: any) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onOk={props.onOk}
      onCancel={props.onCancel}
      okButtonProps={{ style: { color: "black" } }}
      key={props.id}
      destroyOnClose
    >
      <div className="flex flex-col gap-10" id="main">
        <input
          required
          className="rounded-sm pl-2 py-3 hover:bg-gray-300"
          placeholder="Descrição"
          type="text"
          value={props.description}
          onChange={(e) => props.setDescription(e.target.value)}
        />
        <select
          onChange={(e) => props.setStatus(e.target.value)}
          defaultValue={props.status}
          className="hover:bg-gray-300 rounded-sm pl-2 py-3"
        >
          <option value="Pendente">Pendente</option>
          <option value="Finalizada">Finalizada</option>
        </select>
        <input
          className="rounded-sm "
          type="file"
          accept="image/*"
          onChange={props.addImage}
        />
      </div>
      {props.photo && (
        <div className="relative">
          <button
            onClick={() => props.setPhoto("")}
            className="border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full font-bold"
          >
            X
          </button>
          <img className="py-2" src={props.photo} />
        </div>
      )}
    </Modal>
  );
}

export default Modal;
