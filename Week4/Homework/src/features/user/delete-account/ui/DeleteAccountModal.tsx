import { Modal } from "@/shared/ui/modal/Modal";
import * as s from "./DeleteAccountModal.css";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className={s.layout}>
        <div className={s.messages}>
          <h2>정말 탈퇴하시겠어요?</h2>
          <span className={s.smallMsg}>탈퇴 후에는 모든 정보가 삭제돼요</span>
        </div>

        <div className={s.buttons}>
          <button
            className={s.button({ btn: "exit" })}
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={s.button({ btn: "delete" })}
            type="button"
            onClick={onClose}
          >
            회원탈퇴
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default DeleteAccountModal;
