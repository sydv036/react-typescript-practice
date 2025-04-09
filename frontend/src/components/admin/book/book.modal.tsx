import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { ApiInsertBook, ApiUpdateBook } from "@services/api.book";
import { ApiUploadImage } from "@services/api.common";
import { DisplayImage } from "@utils/DisplayImage";
import { MessageNotBlank } from "@utils/MessageCommon";
import { DEFAULT_DURATION_COUNTUP, SHOW_PROGRESS } from "@utils/ValueConstant";
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
  category: {}[];
  typeHandle: "INSERT" | "UPDATE";
  bookDetail: IBookTable;
  setBookDetail: (v: IBookTable | null) => void;
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
    typeHandle,
    bookDetail,
    setBookDetail,
  } = props;

  const { message, notification } = App.useApp();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [fileListSingle, setFileListSingle] = useState<UploadFile[]>();
  const [fileListAny, setFileListAny] = useState<UploadFile[]>();
  const [formBook] = Form.useForm();
  const [isLoadingInsertOrUpdate, setIsLoadingInsertOrUpdate] =
    useState<boolean>(false);
  const folderUpload = "book";

  useEffect(() => {
    if (bookDetail) {
      formBook.setFieldsValue(bookDetail);
      const thumbnail: UploadFile = {
        uid: uuidv4(),
        name: bookDetail.thumbnail,
        status: "done",
        url: DisplayImage("book", bookDetail.thumbnail),
      };
      const slider: UploadFile[] = bookDetail.slider.map((item) => {
        return {
          uid: uuidv4(),
          name: item,
          status: "done",
          url: DisplayImage("book", item),
        };
      });
      setFileListAny(slider);
      setFileListSingle([thumbnail]);
    }
  }, [bookDetail]);

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
    if (fileListSingle[0].originFileObj !== undefined) {
      const resUploadImgSingle = await ApiUploadImage(
        folderUpload,
        fileListSingle[0].originFileObj
      );
      if (resUploadImgSingle.data)
        return resUploadImgSingle!.data?.fileUploaded;
    } else {
      return bookDetail.thumbnail;
    }
  };
  const handleUploadImageAny = async () => {
    try {
      if (!fileListAny || fileListAny.length === 0) return;
      const dataMap = new Map<string, string>();
      if (bookDetail) {
        bookDetail.slider.forEach((item) => {
          dataMap.set(item, item);
        });
      }
      const uploadPromises = fileListAny.map(
        async (file: UploadFile, index) => {
          if (file.originFileObj !== undefined) {
            const res = await ApiUploadImage(folderUpload, file.originFileObj);
            return res.data?.fileUploaded;
          } else {
            const isCheck = dataMap.get(file.name);
            if (isCheck) {
              return isCheck;
            }
          }
        }
      );
      const listImageName = await Promise.all(uploadPromises);
      return listImageName ? listImageName : [];
    } catch (error) {
      message.error(`Lỗi khi upload ảnh: ${error}`);
      return [];
    }
  };

  const handleSubmitForm = async () => {
    setIsLoadingInsertOrUpdate(true);
    const [thumbnail, slider] = await Promise.all([
      handleUploadImageSingle(),
      handleUploadImageAny(),
    ]);

    if (thumbnail) {
      formBook.setFieldsValue({ thumbnail: thumbnail });
    }

    if (slider?.length! > 0) {
      formBook.setFieldsValue({ slider: slider });
    }

    let res = null;
    if (typeHandle === "INSERT") {
      res = await ApiInsertBook(formBook.getFieldsValue(true));
    } else {
      const data: IBookInsertOrUpdate = formBook.getFieldsValue(true);
      res = await ApiUpdateBook(bookDetail._id, {
        author: data.author,
        category: data.category,
        mainText: data.mainText,
        price: data.price,
        quantity: data.quantity,
        thumbnail: data.thumbnail,
        slider: data.slider,
      });
    }

    if (res.data) {
      message.success(
        typeHandle === "INSERT"
          ? `Inserted book succssfully!`
          : "Updated book successfully!"
      );
      reloadTable();
      handleCloseModal();
    } else {
      notification.error({
        message:
          typeHandle === "INSERT"
            ? `Insert book failed!`
            : "Updated book failed!",
        description: !Array.isArray(res.message)
          ? res.message
          : res.message.map((msg) => {
              return (
                <div>
                  <span style={{ color: "red" }}>*</span> {msg}
                </div>
              );
            }),
        duration: DEFAULT_DURATION_COUNTUP,
        showProgress: SHOW_PROGRESS,
      });
    }
    setIsLoadingInsertOrUpdate(false);
  };
  const handleResetFileSingle = () => {
    setFileListSingle([]);
  };
  const handleResetFileAny = () => {
    setFileListAny([]);
  };
  const handleCloseModal = () => {
    handleResetFileSingle();
    handleResetFileAny();
    setsOpenModalInsertOrUpdate(false);
    formBook.resetFields();
    setBookDetail(null);
  };

  return (
    <Modal
      title={typeHandle === "INSERT" ? "Add New Book" : "Update Book"}
      open={isOpenModalInsertOrUpdate}
      onOk={() => {
        formBook.submit();
      }}
      onCancel={handleCloseModal}
      loading={isLoadingInsertOrUpdate}
    >
      <Form<IBookInsertOrUpdate>
        layout="vertical"
        form={formBook}
        onFinish={handleSubmitForm}
      >
        <Row gutter={[12, 10]}>
          {typeHandle === "UPDATE" && bookDetail && (
            <Col span={24}>
              <Form.Item label="ID">
                <Input disabled defaultValue={bookDetail._id} />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
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
              <Select allowClear options={category} />
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
          </Col>
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
                maxCount={8}
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
