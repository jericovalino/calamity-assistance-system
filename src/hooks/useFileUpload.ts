'use client';

import { z } from 'zod';
import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const UploadResponseSchema = z.object({
  data: z.object({
    uuid: z.string(),
    url: z.string(),
    mime_type: z.string(),
    file_name: z.string(),
  }),
});

type UploadResponse = z.infer<typeof UploadResponseSchema>;

type UploadFileProps = {
  fileName: string;
  onUploadDone: (data: UploadResponse['data'] | Error) => void;
} & (
  | {
      file: Blob;
    }
  | {
      src: string;
    }
);

const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = useCallback(
    async ({
      onUploadDone,
      fileName,
      ...rest
    }: UploadFileProps): Promise<UploadResponse['data'] | Error> => {
      setIsUploading(true);
      const url = new URL(
        '/filesystem/v1/upload',
        process.env.NEXT_PUBLIC_API_ENDPOINT
      ).toString();
      const formData = new FormData();
      let fileToUpload: Blob;

      if ('src' in rest) {
        const response = await axios.get(url, { responseType: 'blob' });
        fileToUpload = response.data as Blob;
      } else {
        fileToUpload = rest.file;
      }

      formData.append('file', fileToUpload, fileName);

      try {
        const response = await axios.post<any, AxiosResponse<UploadResponse>>(
          url,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        setIsUploading(false);
        onUploadDone(response.data.data);
        return response.data.data;
      } catch (error) {
        setIsUploading(false);
        if (error instanceof Error) {
          onUploadDone(error);
          return error;
        }
        const customError = new Error('Something went wrong');
        onUploadDone(customError);
        return customError;
      }
    },
    []
  );

  return { uploadFile, isUploading };
};
export type UploadedData = UploadResponse['data'];

export default useFileUpload;
