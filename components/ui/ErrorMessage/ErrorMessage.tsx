import type { FC } from 'react';
import cn from 'clsx';

interface ErrorMessageProps {
  error: {
    message: string;
    code?: string;
    errors?: {
      message: string;
    }[];
  };
  className?: string;
}

const ErrorMessages: FC<ErrorMessageProps> = ({ error, className }) => (
  <div
    className={cn('text-red border-red flex flex-col border border-solid px-4 py-2.5', className)}
  >
    <span>{error.message}</span>
    {error.errors && error.errors?.length > 0 && (
      <ul className="list-inside list-disc">
        {error.errors.map(({ message }, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    )}
  </div>
);

export default ErrorMessages;
