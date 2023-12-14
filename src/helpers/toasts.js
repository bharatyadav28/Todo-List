import { toast } from "react-toastify";

const successToast = (message) => {
  toast.success(<h5>{message}</h5>);
};

const errorToast = (message) => {
  toast.error(<h5>{message}</h5>);
};

export { errorToast, successToast };
