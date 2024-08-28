import { ComponentProps, useCallback } from "react";

import { ModalCard } from "@/components/containers";
import { Button } from "@/components/input_controls";

import useCreateModal from "./useCreateModal";

const useAlertDialog = () => {
  const createModal = useCreateModal();

  type OpenAlertDialogProps = Pick<
    ComponentProps<typeof ModalCard>,
    "theme" | "title"
  > & {
    onYes: () => void;
    onNo?: () => void;
    yesLabel?: string;
    noLabel?: string;
    title?: string;
    description?: string;
    renderContent?: (params: { close: () => void }) => JSX.Element;
  };
  const openAlertDialog = useCallback(
    ({
      theme,
      title,
      description,
      onYes,
      onNo,
      yesLabel = "Yes",
      noLabel = "No",
      renderContent,
    }: OpenAlertDialogProps) => {
      createModal({
        content: (close) => (
          <ModalCard theme={theme} onClose={close}>
            <dl className="space-y-1">
              {Boolean(title) && (
                <dt className="text-lg font-semibold leading-5">{title}</dt>
              )}
              {Boolean(description) && (
                <dd className="text-xs leading-[0.875rem] text-subtle">
                  {description}
                </dd>
              )}
            </dl>
            {renderContent?.({ close })}
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                onClick={() => {
                  onNo?.();
                  close();
                }}
              >
                {noLabel}
              </Button>
              <Button
                theme={theme}
                onClick={() => {
                  onYes();
                  close();
                }}
              >
                {yesLabel}
              </Button>
            </div>
          </ModalCard>
        ),
      });
    },
    [createModal]
  );

  return {
    openAlertDialog,
  };
};

export default useAlertDialog;
