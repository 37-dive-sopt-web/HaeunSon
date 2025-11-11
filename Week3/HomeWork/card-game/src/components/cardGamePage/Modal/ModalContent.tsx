import styled from "@emotion/styled";

type Status = "prepare" | "playing" | "won" | "lost";

interface ModalContentProps {
  gameStatus: Status;
}

const ModalContent = ({ gameStatus }: ModalContentProps) => {
  return (
    <>
      <Overlay />
      <Wrapper>
        {gameStatus === "won" ? (
          <>
            <Top>축하해요!!!</Top>
            <Middle>Level 1을 18.99초 만에 클리어했어요</Middle>
            <Bottom>3초 후 자동으로 새 게임을 시작해요</Bottom>
          </>
        ) : (
          <>
            <Top>아쉬워요...</Top>
            <Middle>시간이 초과되어 게임이 종료되었어요</Middle>
            <Bottom>3초 후 자동으로 새 게임을 시작해요</Bottom>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default ModalContent;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #cfe8ff;
  border-radius: 1rem;
`;
const Top = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
`;
const Middle = styled.p`
  font-size: 0.8rem;
`;
const Bottom = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  color: #51a1ec;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
