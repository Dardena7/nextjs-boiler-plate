import { useMutation } from "react-query"
import { api } from "../api/file-uploader";
import { toast } from "../utils/toasts";

const filesRepo = {
  uploadFiles: async (formData: FormData): Promise<{success: boolean, blobIds: number[]}> => {
    const response = await api.post(`/files`, formData);
    return response.data;
  },
}

export const useUploadFiles = () => {
  return useMutation((formData: FormData) => {
    return filesRepo.uploadFiles(formData,);
  }, {
  onSuccess: () => {
    //$$alex ts
    toast('Files saved.', 'success');
  },
  onError: () => {
    //$$alex ts
    toast('An error occured!', 'error');
  }});
}