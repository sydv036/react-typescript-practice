import axios from "@services/api.global.customize";

type TUpload = "book" | "avatar";
export const ApiUploadImage = (typeUpload: TUpload, file: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": `${typeUpload}`,
    },
  };
  const URL_BACKEND = `/api/v1/file/upload`;
  let formData = new FormData();
  formData.append("fileImg", file);
  return axios.post<IResBackend<{ fileUploaded: string }>>(
    URL_BACKEND,
    formData,
    config
  );
};
