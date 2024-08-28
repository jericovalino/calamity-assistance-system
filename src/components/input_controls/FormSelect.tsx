'use client';

import { isEmpty } from 'lodash';
import { MdClose } from 'react-icons/md';
import { Combobox } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';
import { type ErrorOption } from 'react-geek-form';
import { Fragment, useMemo, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { cn } from '@/utils';
import { useOnClickOutside } from '@/hooks';

import { Badge } from '@/components/informationals';

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label: string;
  options: Option[];
  error?: ErrorOption;
  disabled?: boolean;
  readOnly?: boolean;
  optional?: boolean;
  placeholder?: string;
  errorDescription?: string;
  onBlur?: () => void;
} & (
  | {
      type?: 'single';
      value: Option['value'];
      onChange: (value: Option['value']) => void;
    }
  | {
      type: 'multiple';
      value: Option['value'][];
      onChange: (value: Option['value'][]) => void;
      selectAllLabel?: string;
    }
);
const FormSelect = ({
  name,
  label,
  optional = false,
  readOnly = false,
  options,
  disabled = false,
  error,
  placeholder = 'Select an item',
  onBlur,
  errorDescription,
  ...rest
}: Props) => {
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((option) =>
      option.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query, options]);

  const [showOptions, setShowOptions] = useState(false);
  const { ref: containerRef } = useOnClickOutside(() => {
    setShowOptions(false);
    onBlur?.();
  });

  return (
    <div ref={containerRef} className="flex flex-col items-start space-y-1">
      <label
        htmlFor={name}
        className="flex w-full justify-between text-xs font-medium leading-[0.875rem] text-subtle"
      >
        <span>{label}</span>
        {optional && !readOnly && (
          <span className="font-normal text-gray-500">Optional</span>
        )}
      </label>
      <div className="relative w-full">
        <Combobox
          as={Fragment}
          // @ts-expect-error
          value={rest.value}
          onChange={(selectedOptionValue: Option['value']) => {
            if (rest.type === 'multiple') {
              rest.onChange(
                (rest.value as Option['value'][]).includes(
                  selectedOptionValue as Option['value']
                )
                  ? (rest.value as Option['value'][]).filter(
                      (v: Option['value']) => v !== selectedOptionValue
                    )
                  : // @ts-expect-error
                    [...new Set(rest.value).add(selectedOptionValue)]
              );
              return;
            }
            rest.onChange(selectedOptionValue);
          }}
          disabled={disabled}
        >
          <Combobox.Button
            className={cn(
              'flex w-full items-end justify-between rounded border bg-white p-[0.625rem] text-sm leading-4',
              isEmpty(rest.value) ? 'text-placeholder' : '',
              error
                ? 'border-danger-subtle bg-danger-subtle text-onDanger-subtle'
                : ''
            )}
            onClick={() => setShowOptions(true)}
          >
            <span>
              {isEmpty(rest.value)
                ? placeholder
                : rest.type === 'multiple'
                  ? `${rest.value.length} item selected`
                  : options.find((option) => option.value === rest.value)
                      ?.label}
            </span>
            <HiChevronDown className="h-[0.875rem] w-[0.875rem]" />
          </Combobox.Button>
          {showOptions && (
            <Combobox.Options
              static={rest.type === 'multiple'}
              className={cn(
                'roudned absolute left-0 right-0 top-full z-10 mt-2 bg-white shadow'
              )}
            >
              <Combobox.Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(
                  'w-full bg-slate-100 p-[0.625rem] text-sm leading-4 focus:outline-none'
                )}
                placeholder="Search Keyword"
              />
              <div className="max-h-80 divide-y overflow-auto">
                {filteredOptions.length ? (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.value}
                      value={option.value}
                      className={cn(
                        'flex cursor-pointer items-center space-x-1 p-[0.625rem] text-sm leading-4 hover:bg-slate-50'
                      )}
                    >
                      {rest.type === 'multiple' && (
                        <input
                          type="checkbox"
                          className="accent-[var(--brand-500)]"
                          checked={rest.value?.includes(option.value)}
                          onChange={() => {}}
                        />
                      )}
                      <span>{option.label}</span>
                    </Combobox.Option>
                  ))
                ) : (
                  <div
                    className={cn(
                      'cursor-not-allowed p-[0.625rem] text-sm leading-4 hover:bg-slate-50'
                    )}
                  >
                    No Items Found
                  </div>
                )}
                {rest.type === 'multiple' && (
                  <button
                    type="button"
                    className={cn(
                      'sticky bottom-0 w-full bg-white p-[0.625rem] text-left text-sm font-bold leading-4 text-brand hover:bg-slate-50'
                    )}
                    onClick={() =>
                      rest.onChange(options.map((option) => option.value))
                    }
                  >
                    {rest.selectAllLabel ?? 'Select all'}
                  </button>
                )}
              </div>
            </Combobox.Options>
          )}
        </Combobox>
      </div>
      {rest.type === 'multiple' && Boolean(rest.value?.length) && (
        <div className="flex w-full flex-wrap gap-1">
          {rest.value?.map((val: Option['value']) => (
            <Badge
              key={val}
              indicatorType="icon"
              indicatorPosition="right"
              icon={MdClose}
              label={
                options.find((option) => option.value === val)?.label ?? ''
              }
              onIndicatorClicked={() =>
                rest.onChange(
                  rest.value?.filter(
                    (activeValue: Option['value']) => activeValue !== val
                  )
                )
              }
            />
          ))}
        </div>
      )}
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
};

export default FormSelect;
