import { Fragment } from 'react/jsx-runtime';

import { cn } from '@/utils';

type Props = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  headerActionElements?: JSX.Element[];
  actionElements?: JSX.Element[];
};

const Card = ({
  title,
  description,
  children,
  className,
  actionElements,
  headerActionElements,
}: Props) => {
  return (
    <div
      className={cn(
        'h-max space-y-4 rounded border bg-interface py-5 shadow',
        className
      )}
    >
      {(Boolean(title) ||
        Boolean(description) ||
        Boolean(headerActionElements)) && (
        <section className="flex justify-between px-5">
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
          {Boolean(headerActionElements) && (
            <div className="ml-auto flex space-x-1">
              {headerActionElements!.map((el, i) => (
                <Fragment key={i}>{el}</Fragment>
              ))}
            </div>
          )}
        </section>
      )}
      <section className="px-5">{children}</section>
      {Boolean(actionElements) && (
        <section className="flex space-x-1 px-5">
          {actionElements!.map((el, i) => (
            <Fragment key={i}>{el}</Fragment>
          ))}
        </section>
      )}
    </div>
  );
};

export default Card;
