import {
  HiChevronUp,
  HiChevronDown,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { useRef, type MouseEvent } from "react";
import { type FieldError } from "react-geek-form";
import { NumericFormat } from "react-number-format";

import { cn } from "@/utils";

type Props = {
  name: string;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: FieldError;
  readOnly?: boolean;
  min?: number;
  max?: number;
  optional?: boolean;
  noError?: boolean;
  errorDescription?: string;
};

function FormQuantity({
  name,
  value,
  onChange,
  label,
  error,
  min = 1,
  max,
  noError = false,
  optional = false,
  readOnly = false,
  errorDescription = undefined,
}: Props) {
  const inlineRef = useRef<HTMLInputElement | null>(null);

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
          "relative isolate flex w-full overflow-clip rounded border bg-interface",
          error
            ? "border-danger-subtle bg-danger-subtle text-onDanger-subtle"
            : "focus-within::border-selected"
        )}
      >
        <button
          className="absolute inset-0 z-0 h-full w-full"
          type="button"
          onClick={() => inlineRef.current?.focus()}
        />
        <NumericFormat
          getInputRef={(el: HTMLInputElement) => {
            inlineRef.current = el;
          }}
          onClick={(e: unknown) =>
            (e as MouseEvent<HTMLInputElement>).stopPropagation()
          }
          //   isAllowed={({ floatValue }) => {
          //     const value = floatValue ?? min;
          //     const isAllowed = value >= min && value <= (max ?? Infinity);
          //     return isAllowed;
          //   }}
          value={value}
          decimalScale={0}
          onChange={(e) => {
            const posibleValue = parseInt(e.target.value);
            const nextValue = isNaN(posibleValue) ? value : posibleValue;
            onChange(nextValue);
          }}
          allowNegative={false}
          className={cn(
            "z-[1] flex-grow p-[0.625rem] text-sm leading-4 placeholder:text-placeholder",
            "focus:outline-none disabled:bg-interface-disabled "
          )}
          style={{
            width: `${(value as number).toString().length / 2}rem`,
          }}
          onBlur={() => {
            if (inlineRef.current)
              inlineRef.current.value = value as unknown as string;
          }}
        />
        <div className="relative z-10 flex w-8 flex-col divide-y border-l">
          <button
            type="button"
            className={cn(
              "grid h-full w-full place-items-center text-subtle",
              "hover:bg-interface-hovered active:bg-interface disabled:cursor-not-allowed"
            )}
            onClick={() =>
              onChange(
                max !== undefined
                  ? Math.min((value as number) + 1, max)
                  : (value as number) + 1
              )
            }
            disabled={value >= (max ?? Infinity)}
          >
            <HiChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={cn(
              "grid h-full w-full place-items-center text-subtle",
              "hover:bg-interface-hovered active:bg-interface disabled:cursor-not-allowed"
            )}
            onClick={() => onChange(Math.max(value - 1, min))}
            disabled={value <= min}
          >
            <HiChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!noError && (
        <small
          className={cn(
            "flex min-h-[1rem] items-center space-x-1 text-xs",
            !error && !errorDescription ? "invisible" : "",
            error ? "text-red-500" : ""
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
      )}
    </div>
  );
}

export default FormQuantity;
