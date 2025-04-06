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
import { log } from "console";
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [fileListSingle, setFileListSingle] = useState<UploadFile[]>();
  const [fileListAny, setFileListAny] = useState<UploadFile[]>();
  const [formBook] = Form.useForm();

  const handleBeforeUpload = (file: UploadFile) => {
    const isCheckType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isCheckType) {
      message.error(`File ${file.name} type must be JPEG or PNG!`);
      return Upload.LIST_IGNORE;
    }
    const limitSize = file.size! / 1024 / 1024 < 2;
    if (!limitSize) {
      message.error(`File ${file.name} size must be less than 2MB!`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreview(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }, typeUpload: TUpload) => {
    if (typeUpload === "single") {
      setFileListSingle(newFileList);
      formBook.setFieldsValue({ thumbnail: newFileList[0].name });
    } else {
      setFileListAny(newFileList);
      console.log("check any", newFileList);
      formBook.setFieldsValue({ slider: newFileList.join(",") });
    }
  };
  const handleUploadImageSingle = async () => {
    const resUploadImgSingle = await ApiUploadImage(
      "avatar",
      fileListSingle[0].originFileObj
    );
    if (resUploadImgSingle.data) {
      formBook.setFieldsValue({
        thumbnail: resUploadImgSingle!.data?.fileUploaded,
      });
    }
  };
  // if (resUploadImgSingle!.data) {
  //   // let dataPreviewSingle: IImage = {
  //   //   uid: uuidv4(),
  //   //   name: resUploadImgSingle!.data?.fileUploaded!,
  //   //   status: "done",
  //   //   url: `${DisplayImage(
  //   //     "avatar",
  //   //     resUploadImgSingle!.data?.fileUploaded!
  //   //   )}`,
  //   // };
  // } else {
  //   Upload.LIST_IGNORE;
  // }

  // const handleUploadImageAny = async () => {
  //   return new Promise((resolve) => {
  //     let listImageName: string[] = [];
  //     fileListAny?.forEach(async (file: UploadFile) => {
  //       const resUploadImgSingle = await ApiUploadImage(
  //         "avatar",
  //         file.originFileObj
  //       );
  //       console.log("check start");

  //       listImageName.push(resUploadImgSingle.data?.fileUploaded!);
  //       console.log("check list", listImageName);

  //       formBook.setFieldsValue({ slider: [listImageName] });

  //       console.log("check end");
  //     });
  //     resolve(true);
  //   });
  // };
  const handleUploadImageAny = async () => {
    try {
      if (!fileListAny || fileListAny.length === 0) return;

      const uploadPromises = fileListAny.map(async (file: UploadFile) => {
        const res = await ApiUploadImage("avatar", file.originFileObj);
        return res.data?.fileUploaded;
      });

      const listImageName = await Promise.all(uploadPromises);

      console.log("Danh sách ảnh đã upload:", listImageName);

      formBook.setFieldsValue({ slider: listImageName });

      return true;
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      return false;
    }
  };

  const handleSubmitForm = async () => {
    await handleUploadImageSingle();
    await handleUploadImageAny();
    console.log("check form", formBook.getFieldsValue());
  };
  const handleResetFileSingle = () => {
    setFileListSingle([]);
    formBook.setFieldsValue({ thumbnail: null });
  };
  const handleResetFileAny = () => {
    setFileListAny([]);
    formBook.setFieldsValue({ slider: null });
  };
  const handleCloseModal = () => {
    handleResetFileSingle();
    handleResetFileAny();
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
                  handleChange(file, "single");
                }}
                maxCount={1}
                beforeUpload={handleBeforeUpload}
                onRemove={handleResetFileSingle}
              >
                {uploadButton}
              </Upload>
              {preview && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
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
                  handleChange(file, "any");
                }}
                multiple={true}
                beforeUpload={handleBeforeUpload}
                onRemove={() => {
                  handleResetFileAny;
                }}
              >
                {uploadButton}
              </Upload>
              {preview && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
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
