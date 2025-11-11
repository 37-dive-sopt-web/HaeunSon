import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

type Status = "prepare" | "playing" | "won" | "lost";

interface ModalProps {
  openModal: boolean;
  gameStatus: Status;
}

const Modal = ({ openModal, gameStatus }: ModalProps) => {
  return (
    <div>
      {openModal &&
        createPortal(<ModalContent gameStatus={gameStatus} />, document.body)}
    </div>
  );
};

export default Modal;
