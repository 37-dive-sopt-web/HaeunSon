import { useNavigate } from "react-router";
import { Modal } from "@/shared/ui/modal/Modal";
import * as s from "./DeleteAccountModal.css";
import { deleteUser } from "../api/deleteUser";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountModal = ({ isOpen, onClose }: DeleteAccountModalProps) => {
  const navigate = useNavigate();

  const deleteHandler = async () => {
    try {
      await deleteUser();
      localStorage.removeItem("userId");
      alert("회원 탈퇴가 완료되었어요");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원 탈퇴를 실패했어요");
      throw error;
    }
  };

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
            onClick={deleteHandler}
          >
            회원탈퇴
          </button>
        </div>
      </section>
    </Modal>
  );
};

export default DeleteAccountModal;
