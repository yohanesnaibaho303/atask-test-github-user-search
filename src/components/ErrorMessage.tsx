import React from "react";
import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div
      className="flex items-center p-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 my-4\"
      role="alert"
    >
      <AlertCircle className="flex-shrink-0 w-5 h-5 mr-2" />
      <span className="sr-only">Error</span>
      <div>
        <span className="font-medium">Error: </span> {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
