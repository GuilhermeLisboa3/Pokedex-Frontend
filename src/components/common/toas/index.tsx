import { Toast, ToastBody } from "reactstrap";


interface props {
  isOpen: boolean;
  message: string;
  color: string;
}

const ToastComponent = function ({ isOpen, message, color  }: props) {
  return (
    <>
      <Toast className={`text-white fixed-top ms-auto mt-3 me-2`} isOpen={isOpen}>
        <ToastBody className={`${color}`}>
          {message}
        </ToastBody>
      </Toast>
    </>
  );
};

export default ToastComponent;
