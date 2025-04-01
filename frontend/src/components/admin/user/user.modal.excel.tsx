import { App, Divider, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import * as XLSX from "xlsx";

import { Buffer } from "buffer";
import { ApiBulkInsertUser } from "@services/api.user";

interface IProps {
  isOpenModalImportExc: boolean;
  setIsOpenModalImportExc: (v: boolean) => void;
}
const { Dragger } = Upload;

const colums = [
  {
    key: "fullName",
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
  },
  {
    key: "phone",
    title: "Phone",
    dataIndex: "phone",
  },
];

const ModalImportExcel = (props: IProps) => {
  const { isOpenModalImportExc, setIsOpenModalImportExc } = props;
  const { message, notification } = App.useApp();
  const [dataFileExcel, setDataFileExcel] = useState<{}[]>([]);
  const [isLoadingModalImportExc, setIsLoadingModalImportExc] =
    useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModalImportExc(false);
    setDataFileExcel([]);
  };

  const handleReadFileExcel = (file: any) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const sheetData: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      if (sheetData.length > 1) {
        const headers = sheetData[0]; // Lấy dòng đầu làm key
        if (headers.join(",") !== "fullName,email,phone") {
          message.error("File không đúng định dạng!");
          return Upload.LIST_IGNORE;
        }
        const jsonData = sheetData.slice(1).map((row) => {
          // bỏ dòng header
          const obj: Record<string, any> = {};
          headers.forEach((key, index) => {
            obj[key] = row[index];
            // Ghép dữ liệu với header
          });
          obj["password"] = "123456";
          return obj;
        });
        setDataFileExcel(jsonData);
      }
    };
  };

  const items: UploadProps = {
    name: "file",
    multiple: false,
    // accept: ".xlsx, .xls",
    maxCount: 1,
    action: "",
    beforeUpload: (e) => {
      const allowedTypes = [
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      ];
      if (!allowedTypes.includes(e.type)) {
        message.error("Only can upload Excel file");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onRemove: () => {
      setDataFileExcel([]);
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        handleReadFileExcel(info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleImportDataExcel = async () => {
    setIsLoadingModalImportExc(true);
    const res = await ApiBulkInsertUser(dataFileExcel);
    if (res.data?.countSuccess! > 0) {
      if (res.data?.countSuccess === dataFileExcel.length) {
        message.success("Inserted successfully all record!");
        handleCloseModal();
        return;
      }
      message.success(
        `Inserted successfully with ${res.data?.countSuccess} records!`
      );
    }
    if (res.data?.countError! > 0) {
      notification.error({
        message: "Inserted failed!",
        description: (
          <div style={{ maxHeight: "250px", overflowY: "auto" }}>
            {Array.isArray(res.data?.detail)
              ? res.data?.detail!.map((item: IResBulkInsertDataErr) => {
                  return (
                    <>
                      <div>
                        Row {item.index + 1} : {item.err.errmsg}
                      </div>
                      <br />
                    </>
                  );
                })
              : res.data?.detail}
          </div>
        ),
        duration: 0,
      });
    }
    setIsLoadingModalImportExc(false);
  };

  return (
    <Modal
      title="Import Excel"
      open={isOpenModalImportExc}
      onOk={() => {
        handleImportDataExcel();
      }}
      onCancel={() => {
        handleCloseModal();
      }}
      okText="Import Now"
      loading={isLoadingModalImportExc}
    >
      <Dragger {...items}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
          <a
            onClick={(e) => {
              e.stopPropagation();
              alert("oke con");
            }}
          >
            Download the sample file here
          </a>
        </p>
      </Dragger>
      <Divider />
      <section className="readFile">
        <h4>INFO FILE EXCEL</h4>
        <Table
          columns={colums}
          dataSource={dataFileExcel}
          pagination={{
            pageSize: 3,
            showSizeChanger: false,
          }}
        />
      </section>
    </Modal>
  );
};
export default ModalImportExcel;
