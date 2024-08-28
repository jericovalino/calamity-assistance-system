import { isEmpty } from 'lodash';
import { useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import { IoClose } from 'react-icons/io5';
import { type ErrorOption } from 'react-geek-form';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { HiOutlineExclamationCircle, HiPlus } from 'react-icons/hi';

import { cn } from '@/utils';
import { useFileSystem, useFileUpload, useImageEditor } from '@/hooks';

import Button from './Button';

type Props = {
  name: string;
  testId?: string;
  icon?: IconType;
  value: string;
  label: string;
  error?: ErrorOption;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  placeholder?: string;
  optional?: boolean;
  errorDescription?: string;
  onChange: (value: string) => void;
};

function FormLogo({
  name,
  value,
  label,
  error,
  icon: Icon,
  optional = false,
  disabled = false,
  readOnly = false,
  errorDescription = undefined,
  onChange,
}: Props) {
  const { selectFileFromFileSystem } = useFileSystem();
  const { openImageEditor } = useImageEditor();
  const { uploadFile, isUploading } = useFileUpload();

  const renderedIcon = useMemo(() => {
    if (!Icon)
      return (
        <HiPlus
          className={cn('h-6 w-6', error ? 'text-red-500' : 'text-gray-500')}
        />
      );
    return (
      <Icon
        className={cn('h-6 w-6', error ? 'text-red-500' : 'text-gray-500')}
      />
    );
  }, [Icon, error]);

  const selectAndUploadImage = useCallback(() => {
    selectFileFromFileSystem({
      accept: 'image/*',
      onFileSelected: (data) => {
        openImageEditor({
          src: data.src,
          onEditDone: ({ srcFile }) => {
            uploadFile({
              fileName: `${name}.png`,
              file: srcFile,
              onUploadDone: (data) => {
                if (data instanceof Error) return;
                onChange(data.url);
              },
            });
          },
        });
      },
    });
  }, [name, onChange, openImageEditor, selectFileFromFileSystem, uploadFile]);

  return (
    <div className="flex flex-col items-start space-y-1">
      <label
        htmlFor={name}
        className="flex w-full justify-between text-xs font-medium leading-[0.875rem] text-subtle"
      >
        <span>{label}</span>
        {optional && !readOnly && (
          <span className="font-normal text-gray-500">Optional</span>
        )}
      </label>
      <div
        className={cn(
          'relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded border bg-white',
          error
            ? 'border-danger-subtle bg-danger-subtle text-onDanger-subtle'
            : 'focus:border-selected'
        )}
      >
        {isUploading ? (
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-gray-50">
            <AiOutlineLoading3Quarters className="h-4 w-4 animate-spin text-gray-500" />
          </div>
        ) : (
          <>
            {isEmpty(value) ? (
              <>
                <button
                  className="absolute inset-0 grid h-full w-full place-items-center hover:bg-gray-50"
                  type="button"
                  onClick={selectAndUploadImage}
                  disabled={isUploading || disabled}
                >
                  {renderedIcon}
                </button>
              </>
            ) : (
              <div className="relative h-full w-full p-1">
                <Button
                  style="icon"
                  size="small"
                  icon={IoClose}
                  className={cn(
                    'absolute right-0 top-0',
                    disabled ? 'hidden' : ''
                  )}
                  onClick={() => onChange('')}
                />
                <img
                  src={value}
                  className="h-full w-full border object-contain"
                />
              </div>
            )}
          </>
        )}
      </div>
      <Button
        size="small"
        className="w-full"
        disabled={isUploading || disabled}
        onClick={selectAndUploadImage}
      >
        {value ? 'Change' : 'Upload'}
      </Button>
      <small
        className={cn(
          '!mt-0.5 flex min-h-[1rem] items-center space-x-1 text-xs',
          !error && !errorDescription ? 'invisible' : '',
          error ? 'text-onDanger-subtle' : ''
        )}
      >
        {error ? (
          <>
            <HiOutlineExclamationCircle /> <span>{error?.message}</span>
          </>
        ) : (
          errorDescription
        )}
      </small>
    </div>
  );
}

export default FormLogo;
