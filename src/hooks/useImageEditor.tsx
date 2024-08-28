'use client';

import { useCallback } from 'react';
import { GiSquare } from 'react-icons/gi';

import ModalCard from '../components/containers/ModalCard';

import useCreateModal from './useCreateModal';
import FilerobotImageEditor, { TABS } from 'react-filerobot-image-editor';

type ImageEditorModalProps = {
  src: string;
  onEditDone: (data: { srcFile: Blob; srcUrl: string }) => void;
  onClose: () => void;
};

export const ImageEditorModal = ({
  src,
  onEditDone,
  onClose,
}: ImageEditorModalProps) => {
  if (typeof window === 'undefined') return null;
  return (
    <ModalCard title="Editor" size="2xl" onClose={onClose}>
      <div className="-m-6 h-[30rem]">
        <FilerobotImageEditor
          moreSaveOptions={[]}
          source={src}
          previewPixelRatio={90}
          savingPixelRatio={90}
          tabsIds={[TABS.ADJUST, TABS.RESIZE]}
          onBeforeSave={() => false}
          Crop={{
            presetsItems: [
              {
                icon: () => <GiSquare className="h-3 w-3 text-gray-500" />,
                titleKey: 'Square',
                ratio: 1,
                descriptionKey: '1:1',
              },
            ],
          }}
          onSave={(data) => {
            data.imageCanvas?.toBlob((file) => {
              if (!file) return;
              const src = URL.createObjectURL(file);
              onEditDone({ srcFile: file, srcUrl: src });
            });
          }}
        />
      </div>
    </ModalCard>
  );
};

const useImageEditor = () => {
  const createModal = useCreateModal();

  const openImageEditor = useCallback(
    ({
      src,
      onEditDone,
    }: Pick<ImageEditorModalProps, 'onEditDone' | 'src'>) => {
      createModal({
        content: (close) => (
          <ImageEditorModal
            src={src}
            onClose={close}
            onEditDone={(data) => {
              onEditDone(data);
              close();
            }}
          />
        ),
      });
    },
    [createModal]
  );

  return {
    openImageEditor,
  };
};

export default useImageEditor;
