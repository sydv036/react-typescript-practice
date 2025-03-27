import { Modal } from "antd";

interface IProps {
  isOpenModalUpdateInsert: boolean;
  setIsOpenModalUpdateInsert: (v: boolean) => void;
  reloadTableUser: () => void;
  modalType: string;
}

const UserModalInsertOrUpdate = (props: IProps) => {
  const {
    isOpenModalUpdateInsert,
    setIsOpenModalUpdateInsert,
    reloadTableUser,
    modalType,
  } = props;
  const handleCloseModal = () => {
    setIsOpenModalUpdateInsert(false);
  };
  return (
    <Modal
      title={
        modalType === "INSERT"
          ? "Add New"
          : modalType === "UPDATE"
          ? "Update User"
          : "UNVALIABLE"
      }
      open={isOpenModalUpdateInsert}
      onOk={() => {}}
      onCancel={() => {
        handleCloseModal();
      }}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default UserModalInsertOrUpdate;
