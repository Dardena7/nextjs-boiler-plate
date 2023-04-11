import { toast as baseToast, TypeOptions, ToastPosition } from "react-toastify";

const getClasses = (type: TypeOptions) => {
  switch (type) {
    case "success":
      return "bg-success-500 text-neutral-100 medium";
    case "error":
      return "bg-danger-500 text-neutral-100 medium";
    case "info":
      return "bg-primary-500 text-neutral-100 medium";
    case "warning":
      return "bg-secondary-700 text-neutral-100 medium";
  }
};

export const toast = (
  message: string,
  type: TypeOptions,
  position: ToastPosition = "bottom-center"
) => {
  const className = getClasses(type);
  return baseToast(message, {
    type,
    position,
    hideProgressBar: true,
    className,
  });
};
