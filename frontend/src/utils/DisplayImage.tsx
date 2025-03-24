type TFolder = "avatar" | "book";
export const DisplayImage = (folder: TFolder, imageName: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/images/${folder}/${imageName}`;
};
