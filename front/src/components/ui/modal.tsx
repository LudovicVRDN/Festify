import React, { useRef } from "react";
import Button from "./button";

interface IModalProps {
  buttonText: string;
  message: string;
 onClick: () => void | Promise<void>; 
}

const Modal = ({ buttonText, message , onClick }: IModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleConfirm = () => {
    onClick();
    modalRef.current?.close();
  };
  return (
    <div>
      <Button
        textButton={buttonText}
        variant="red"
        onClick={() => modalRef?.current?.showModal()}
      />

      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box bg-black border border-festify-glassred  ">
          <h3 className="font-bold text-lg">ATTENTION</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-5">
              {/* if there is a button in form, it will close the modal */}
              <Button textButton="Oui" variant="grey" onClick={handleConfirm} />
              <Button textButton="Non" variant="red" />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
