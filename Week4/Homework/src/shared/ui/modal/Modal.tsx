import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import * as s from "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <div className={s.overlay} onClick={onClose}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
