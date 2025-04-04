import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ApiUploadImage } from "@services/api.common";
import { DisplayImage } from "@utils/DisplayImage";
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
import { v4 as uuidv4 } from "uuid";

interface IProps {
  isOpenModalInsertOrUpdate: boolean;
  setsOpenModalInsertOrUpdate: (v: boolean) => void;
  reloadTable: () => void;
  category: string[];
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    <PlusOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);
type TUpload = "single" | "any";

const BookModalInsertOrUpdate = (props: IProps) => {
  const {
    reloadTable,
    isOpenModalInsertOrUpdate,
    setsOpenModalInsertOrUpdate,
    category,
  } = props;
  const { message } = App.useApp();
  const [previewOpenSingle, setPreviewOpenSingle] = useState(false);
  const [preview, setPreview] = useState("");
  const [fileListSingle, setFileListSingle] = useState<UploadFile[]>();
  const [fileListAny, setFileListAny] = useState<UploadFile[]>();
  const [formBook] = Form.useForm();

  const handleBeforeUpload = (file: UploadFile) => {
    const isCheckType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isCheckType) {
      message.error("File type must be JPEG or PNG!");
      return Upload.LIST_IGNORE;
    }
    const limitSize = file.size! / 1024 / 1024 < 2;
    if (!limitSize) {
      message.error("File size must be less than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreview(file.url || (file.preview as string));
    setPreviewOpenSingle(true);
  };

  const handleChangeSingle = (
    { fileList: newFileList },
    typeUpload: TUpload
  ) => {
    if (typeUpload === "single") {
      setFileListSingle(newFileList);
      console.log("check on change", newFileList);
      formBook.setFieldsValue({ thumbnail: newFileList[0].name });
    } else {
      setFileListAny(newFileList);
      console.log("any");
      console.log("check any", newFileList);
      formBook.setFieldsValue({ slider: newFileList.join(",") });
    }
  };
  const handleUploadThumbnail = async () => {
    const resUploadImgSingle = await ApiUploadImage(
      "avatar",
      fileListSingle[0].originFileObj
    );
    if (resUploadImgSingle.data) {
      let dataPreviewSingle: IImage = {
        uid: uuidv4(),
        name: resUploadImgSingle.data?.fileUploaded!,
        status: "done",
        url: `${DisplayImage(
          "avatar",
          resUploadImgSingle.data?.fileUploaded!
        )}`,
      };
      formBook.setFieldsValue({
        thumbnail: resUploadImgSingle.data?.fileUploaded,
      });
      setFileListSingle([dataPreviewSingle]);
    } else {
      Upload.LIST_IGNORE;
    }
  };

  const handleSubmitForm = async () => {
    await handleUploadThumbnail();
    console.log("check form", formBook.getFieldsValue());
  };
  const handleResetData = () => {
    setFileListSingle([]);
    formBook.setFieldsValue({ thumbnail: null });
  };
  const handleCloseModal = () => {
    handleResetData();
  };

  return (
    <Modal
      title="Add New Book"
      open={isOpenModalInsertOrUpdate}
      onOk={() => {
        formBook.submit();
      }}
      onCancel={handleCloseModal}
    >
      <Form<IBookInsertOrUpdate>
        layout="vertical"
        form={formBook}
        onFinish={handleSubmitForm}
      >
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
                fileList={fileListSingle}
                onPreview={handlePreview}
                onChange={(file) => {
                  handleChangeSingle(file, "single");
                }}
                maxCount={1}
                beforeUpload={handleBeforeUpload}
                onRemove={handleResetData}
              >
                {uploadButton}
              </Upload>
              {preview && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpenSingle,
                    onVisibleChange: (visible) => setPreviewOpenSingle(visible),
                    afterOpenChange: (visible) => !visible && setPreview(""),
                  }}
                  src={preview}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<IBookInsertOrUpdate>
              label="Slider"
              name={"slider"}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: MessageNotBlank("Slider") }]}
            >
              <Upload
                action=""
                listType="picture-card"
                fileList={fileListAny}
                onPreview={handlePreview}
                onChange={(file) => {
                  handleChangeSingle(file, "any");
                }}
                multiple={true}
                beforeUpload={handleBeforeUpload}
                onRemove={() => {}}
              >
                {uploadButton}
              </Upload>
              {preview && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpenSingle,
                    onVisibleChange: (visible) => setPreviewOpenSingle(visible),
                    afterOpenChange: (visible) => !visible && setPreview(""),
                  }}
                  src={preview}
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
