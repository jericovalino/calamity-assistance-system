'use client';

import { useCallback, useState } from 'react';

import { cn } from '@/utils';

import Button from './Button';

type Props = {
  name: string;
  value: string;
  placeholder?: string;
  btnLabel?: string;
  onChange: (value: string) => void;
};

const FilterSearch = ({
  name,
  value,
  onChange,
  btnLabel = 'Search',
  placeholder = 'Keyword',
}: Props) => {
  const [_value, _setValue] = useState(value);
  const setInnerValueToOuter = useCallback(() => {
    onChange(_value);
  }, [onChange, _value]);
  return (
    <form
      className="relative isolate flex"
      onSubmit={(e) => {
        e.preventDefault();
        setInnerValueToOuter();
      }}
    >
      <input
        id={name}
        value={_value}
        onChange={(e) => _setValue(e.target.value)}
        className={cn(
          'h-[2.25rem] w-full rounded px-2 py-[0.625rem] text-sm leading-4 placeholder:text-placeholder',
          'focus:outline-none'
        )}
        placeholder={placeholder}
      />
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded border" />
      <Button className="focus:z-10" onClick={setInnerValueToOuter}>
        {btnLabel}
      </Button>
    </form>
  );
};

export default FilterSearch;
