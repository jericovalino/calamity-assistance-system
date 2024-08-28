import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { FaMinus, FaTimes } from "react-icons/fa";

import { cn } from "@/utils";

const MAP_CONTAINER_SIZE_CLASS = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

const MAP_HEADER_THEME_CLASS = {
  default: "bg-gray-50 text-gray-800",
  primary: "bg-gradient-to-r from-violet-600 to-violet-800 text-white",
  danger: "bg-red-500 text-white",
};

const MAP_BORDER_RADIUS_CLASS = {
  sm: { container: "rounded-sm", header: "rounded-t-sm" },
  md: { container: "rounded-md", header: "rounded-t-md" },
  lg: { container: "rounded-lg", header: "rounded-t-lg" },
  xl: { container: "rounded-xl", header: "rounded-t-xl" },
  "2xl": { container: "rounded-2xl", header: "rounded-t-2xl" },
  "3xl": { container: "rounded-3xl", header: "rounded-t-3xl" },
};

export type ModalCardProps = {
  title?: string;
  onClose?: () => void;
  onFloatingClose?: () => void;
  onMinimize?: () => void;
  allowOverflow?: boolean;
  children: React.ReactNode;
  size?: keyof typeof MAP_CONTAINER_SIZE_CLASS;
  theme?: keyof typeof MAP_HEADER_THEME_CLASS;
  roundedSize?: keyof typeof MAP_BORDER_RADIUS_CLASS;
};

const ModalCard = ({
  title,
  onClose,
  children,
  size = "md",
  roundedSize = "lg",
  onMinimize,
  theme = "default",
  allowOverflow = false,
}: ModalCardProps) => {
  const showHeader = useMemo(
    () => !!(title ?? onClose ?? onMinimize),
    [title, onClose, onMinimize]
  );
  return (
    <div
      className={cn(
        "absolute inset-0 m-auto h-max w-full",
        MAP_CONTAINER_SIZE_CLASS[size]
      )}
    >
      <div
        className={twMerge(
          cn(
            "flex w-full flex-col bg-white",
            MAP_BORDER_RADIUS_CLASS[roundedSize].container,
            !allowOverflow ? "overflow-hidden" : ""
          )
        )}
        style={{ height: "max-content" }}
      >
        {showHeader && (
          <header
            className={cn(
              "flex rounded-t-lg p-6",
              MAP_HEADER_THEME_CLASS[theme],
              MAP_BORDER_RADIUS_CLASS[roundedSize].header
            )}
          >
            <>
              {title && (
                <h2 className="text-base font-semibold leading-[1.125rem]">
                  {title}
                </h2>
              )}
              <div className="ml-auto flex space-x-2">
                {onMinimize && (
                  <button type="button" onClick={onMinimize}>
                    <FaMinus />
                  </button>
                )}
                {onClose && (
                  <button type="button" onClick={onClose}>
                    <FaTimes />
                  </button>
                )}
              </div>
            </>
          </header>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalCard;
