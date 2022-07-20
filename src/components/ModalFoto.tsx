import { Modal } from "antd";

export function ModalFoto(props: any) {
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      width="100%"
      destroyOnClose
    >
      {props.modalImage > 0 ? (
        <div className="w-full flex justify-center">
          <img className="py-2" src={props.todos[props.modalImage].foto} />
        </div>
      ) : (
        <p>semfoto</p>
      )}
    </Modal>
  );
}
