import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { MessageNotBlank } from "@utils/MessageCommon";
import {
  App,
  Col,
  Divider,
  Form,
  GetProp,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { UploadProps } from "antd/lib";
import { useEffect, useState } from "react";

interface IProps {
  isOpenModalInsertOrUpdate: boolean;
  setsOpenModalInsertOrUpdate: (v: boolean) => void;
  reloadTable: () => void;
  category: string[];
}

const BookModalInsertOrUpdate = (props: IProps) => {
  const {
    reloadTable,
    isOpenModalInsertOrUpdate,
    setsOpenModalInsertOrUpdate,
    category,
  } = props;

  //   useEffect(() => {
  //     console.log("check category", category);
  //   });

  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const { message } = App.useApp();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log("check on change", newFileList);
    formBook.setFieldsValue({ thumbnail: "3234234" });
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [formBook] = Form.useForm();

  return (
    <Modal
      title="Add New Book"
      open={isOpenModalInsertOrUpdate}
      onOk={() => {
        formBook.submit();
      }}
      onCancel={() => {}}
    >
      <Form<IBookInsertOrUpdate> layout="vertical" form={formBook}>
        <Row gutter={[12, 10]}>
          {/* <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Main text"
              name={"mainText"}
              rules={[
                { required: true, message: MessageNotBlank("Main text") },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Author"
              name={"author"}
              rules={[{ required: true, message: MessageNotBlank("Author") }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<IBookInsertOrUpdate>
              label="Category"
              name={"category"}
              rules={[{ required: true, message: MessageNotBlank("Category") }]}
            >
              <Select allowClear options={[category]} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Price"
              name={"price"}
              rules={[{ required: true, message: MessageNotBlank("Price") }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Quantity"
              name={"quantity"}
              rules={[{ required: true, message: MessageNotBlank("Quantity") }]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </Col> */}
          <Divider />
          <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Thumbnail"
              name={"thumbnail"}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: true, message: MessageNotBlank("Thumbnail") },
              ]}
            >
              <Upload
                action=""
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
                beforeUpload={() => {
                  return false;
                }}
                onRemove={() => {
                  formBook.setFieldsValue({ thumbnail: null });
                }}
              >
                {uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default BookModalInsertOrUpdate;
