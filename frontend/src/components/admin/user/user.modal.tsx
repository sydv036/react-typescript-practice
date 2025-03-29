import { ApiInsertUser, ApiUpdateUser } from "@services/api.user";
import { MessageIncorect, MessageNotBlank } from "@utils/MessageCommon";
import { App, Col, Form, Input, Modal, Row } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  isOpenModalUpdateInsert: boolean;
  setIsOpenModalUpdateInsert: (v: boolean) => void;
  reloadTableUser: () => void;
  modalType: "INSERT" | "UPDATE";
  userDetail?: IUserTable;
  setUserDetail: (v: IUserTable | null) => void;
}

const UserModalInsertOrUpdate = (props: IProps) => {
  const {
    isOpenModalUpdateInsert,
    setIsOpenModalUpdateInsert,
    reloadTableUser,
    modalType,
    userDetail,
    setUserDetail,
  } = props;
  const { notification, message } = App.useApp();
  const [formUser] = Form.useForm();
  const [isLoadingUpdateOrInsert, setIsLoadingUpdateOrInsert] =
    useState<boolean>(false);

  useEffect(() => {
    if (userDetail) {
      formUser.setFieldsValue(userDetail);
    }
  }, [userDetail]);

  const handleCheck = (isCheck: any, mess?: string) => {
    if (isCheck) {
      message.success(
        modalType === "INSERT"
          ? "Inserted successfully!"
          : "Updated successfully!"
      );
      handleCloseModal();
      reloadTableUser();
    } else {
      notification.error({
        message:
          modalType === "INSERT" ? "Inserted failed!" : "Updated failed!",
        description: mess,
      });
    }
  };

  const handleInsertUser = async (v: IUserInsert) => {
    setIsLoadingUpdateOrInsert(true);
    const res = await ApiInsertUser(v);
    handleCheck(res.data, res.message);
    setIsLoadingUpdateOrInsert(false);
  };

  const handleUpdateUser = async (v: IUserUpdate) => {
    setIsLoadingUpdateOrInsert(true);
    const res = await ApiUpdateUser(v);
    handleCheck(res.data, res.message);
    setIsLoadingUpdateOrInsert(false);
  };

  const handleCloseModal = () => {
    setIsOpenModalUpdateInsert(false);
    formUser.resetFields();
    setUserDetail(null);
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
      loading={isLoadingUpdateOrInsert}
      open={isOpenModalUpdateInsert}
      onOk={() => {
        formUser.submit();
      }}
      onCancel={() => {
        handleCloseModal();
      }}
      okText="Save"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Form<IUserInsertOrUpdate>
        layout="vertical"
        form={formUser}
        labelWrap={true}
        onFinish={() => {
          const user = formUser.getFieldsValue();
          if (modalType === "INSERT") {
            handleInsertUser(user);
          }
          if (modalType === "UPDATE") {
            handleUpdateUser(user);
          }
        }}
      >
        <Row gutter={[24, 7]}>
          {modalType === "UPDATE" && (
            <Col span={24}>
              <Form.Item<IUserInsertOrUpdate> label="_ID" name={"_id"}>
                <Input disabled />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item<IUserInsertOrUpdate>
              label="Full Name"
              name={"fullName"}
              rules={[
                { required: true, message: MessageNotBlank("Full Name") },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {modalType === "INSERT" && (
            <Col span={24}>
              <Form.Item<IUserInsertOrUpdate>
                label="Email"
                name={"email"}
                rules={[
                  { required: true, message: MessageNotBlank("Email") },
                  { type: "email", message: MessageIncorect("Email") },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          )}

          <Col span={24}>
            <Form.Item<IUserInsertOrUpdate>
              label="Phone Number"
              name={"phone"}
              rules={[
                { required: true, message: MessageNotBlank("Phone Number") },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          {modalType === "INSERT" && (
            <Col span={24}>
              <Form.Item<IUserInsertOrUpdate>
                label="Password"
                name={"password"}
                rules={[
                  { required: true, message: MessageNotBlank("Password") },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  );
};

export default UserModalInsertOrUpdate;
