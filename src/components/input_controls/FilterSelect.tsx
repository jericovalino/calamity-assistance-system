import { isEmpty } from "lodash";
import { Fragment, useMemo } from "react";
import { HiChevronDown } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";

import { cn } from "@/utils";

import Button from "./Button";

type Options = {
  label: string;
  value: string | number;
};

type Props = {
  name: string;
  value: Options["value"];
  onChange: (value: Options["value"]) => void;
  options: Options[];
  placeholder: string;
};

const FilterSelect = ({
  name,
  value,
  options,
  onChange,
  placeholder,
}: Props) => {
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  );

  return (
    <Listbox
      as="div"
      name={name}
      value={value}
      className="relative min-w-44"
      onChange={(value) => onChange(value)}
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded border" />
      <Listbox.Button
        as="div"
        className="relative flex h-[2.25rem] w-full min-w-max items-center"
      >
        <div className="mx-2 flex-grow text-left">
          {!isEmpty(selectedOption?.value) ||
          typeof selectedOption?.value === "number" ? (
            <p className="truncate text-xs font-semibold leading-[0.875rem]">
              {selectedOption?.label}
            </p>
          ) : (
            <p className="truncate text-xs leading-[0.875rem] text-placeholder">
              {placeholder}
            </p>
          )}
        </div>
        <Button style="icon" icon={HiChevronDown} />
      </Listbox.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <Listbox.Options className="absolute z-10 mt-1 w-full overflow-auto rounded border bg-white text-sm">
          {options.map((option, i) => (
            <Listbox.Option
              key={`${option.value}-${i}`}
              className={({ active }) =>
                cn(
                  "relative cursor-default select-none p-3 text-xs hover:bg-brand-hovered",
                  active ? "bg-brand text-white" : "text-gray-800"
                )
              }
              value={option.value}
            >
              {({ selected }) => (
                <>
                  <span
                    className={cn(
                      "block truncate",
                      selected ? "font-medium" : "font-normal"
                    )}
                  >
                    {option.label}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default FilterSelect;
