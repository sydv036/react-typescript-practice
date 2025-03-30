import * as XLSX from "xlsx";

import { Buffer } from "buffer";

export const handleReadFileExcel = (file: any) => {
  let dataResult: {}[] = [];
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
        console.log("File không đúng định dạng!");
        return [];
      }
      const jsonData: {}[] = sheetData.slice(1).map((row) => {
        // bỏ dòng header
        const obj: Record<string, any> = {};
        headers.forEach((key, index) => {
          obj[key] = row[index]; // Ghép dữ liệu với header
        });
        return obj;
      });
      dataResult = jsonData;
    } else {
      return [];
    }
  };
  return dataResult;
};
