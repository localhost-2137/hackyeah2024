import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
};

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
<<<<<<< HEAD
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
=======
    <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-center gap-x-2 text-sm text-destructive">
>>>>>>> 0affe00c40e6b766c84487ef5941e04145a7d9f3
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};