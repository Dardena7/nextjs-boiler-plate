import { useMutation } from "react-query"
import { api } from "../api/file-uploader";

const filesRepo = {
  uploadFiles: async (formData: FormData): Promise<{success: boolean, blobIds: number[]}> => {
    const response = await api.post(`/files`, formData);
    return response.data;
  },
}

export const useUploadFiles = () => {
  return useMutation((formData: FormData) => {
    return filesRepo.uploadFiles(formData);
  });
}