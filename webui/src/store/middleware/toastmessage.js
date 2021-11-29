import { toast } from "react-toastify";

const STATUS_OK = "OK";
const STATUS_KO = "KO";
const TOAST_TYPE_SUCCESS = "success";
const TOAST_TYPE_ERROR = "error";
const FAST_STATUS = "FAST_STATUS";
const IGNORE_ERROR = "IGNORE_ERROR";

const prettifyError = (error) => {
  let prettyError = error;
  if (error.includes("Exception occured in the server"))
    prettyError = "Operation failed";
  if (error.includes("Request failed with status code 401"))
    prettyError = "Username or password incorrect";

  return prettyError;
};

const toastmessage = (store) => (next) => (action) => {
  if (!action.payload) return next(action);
  let message = "";
  let toastType = TOAST_TYPE_SUCCESS;
  let displayToast = false;
  const { toastInfo, status, statusValue, apiType } = action.payload;
  console.log(
    "===>>> action, toastInfo, status, statusValue, apiType",
    action,
    toastInfo,
    status,
    statusValue,
    apiType
  );

  if (action.type === "api/callSuccess") {
    console.log("===> toasting for success");
    if (toastInfo) {
      const { doToast, onOK, onKO } = toastInfo.onSuccess;
      if (doToast) {
        if (status === STATUS_OK) message = onOK;
        else if (status === STATUS_KO) {
          // if FAST return status is "KO", then consider it as failure.
          toastType = TOAST_TYPE_ERROR;
          console.log("===>>> API success with 'KO' status");
          message = statusValue;
          // const error = action.payload.data.error;
          // message = error ? error : statusValue;
        }

        if (message === FAST_STATUS) {
          console.log("===>>> Toasting fast statusValue.");
          message = statusValue;
        }

        if (!status) {
          // FAST response for monitor may not have the standard format.
          message = onOK;
        }

        if (toastType === TOAST_TYPE_SUCCESS) toast.success(message);
        else toast.error(message);
      } else {
        // if do toast is false but need to toast fast error on KO.
        if (status === STATUS_KO && onKO === FAST_STATUS) {
          console.log("===>>> doToast is false, but KO error to be displayed");
          toast.error(statusValue);
        }
      }
    } else if (statusValue) {
      // use FAST statusValue as the toast message.
      console.log("===>>> toastInfo not found. Toasting fast statusValue.");
      toast.success(statusValue);
    } else {
    }

    // Execute toast notification based on the status.
  } else if (action.type === "api/callFailed") {
    console.log("===> toasting for error");
    const { doToast, onError } = toastInfo.onError;
    if (doToast) {
      if (onError !== IGNORE_ERROR) {
        if (onError === FAST_STATUS) toast.error(prettifyError(statusValue));
        else toast.error(onError);
      }
    } else if (statusValue) {
      toast.error(prettifyError(statusValue));
      console.log(
        "===>>> toastInfo not found. Toasting fast statusValue error."
      );
    } else {
    }
  } else return next(action);
};

export default toastmessage;
