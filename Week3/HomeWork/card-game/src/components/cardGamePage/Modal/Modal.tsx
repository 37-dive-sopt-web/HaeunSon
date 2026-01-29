import { createPortal } from "react-dom";
import ModalContent from "./ModalContent";

type Status = "prepare" | "playing" | "won" | "lost";

interface ModalProps {
  openModal: boolean;
  gameStatus: Status;
  level: number;
  totalTime: number;
}

const Modal = ({ openModal, gameStatus, level, totalTime }: ModalProps) => {
  return (
    <>
      {openModal &&
        createPortal(
          <ModalContent
            gameStatus={gameStatus}
            level={level}
            totalTime={totalTime}
          />,
          document.body
        )}
    </>
  );
};

export default Modal;
