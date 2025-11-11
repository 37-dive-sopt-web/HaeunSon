import styled from "@emotion/styled";
import type { HistoryContent } from "../../../types/history";

interface GameStatusProps {
  timeLeft: string;
  matchedPair: number;
  totalPair: number;
  message: string;
  history: HistoryContent[];
}

const GameStatus = ({
  timeLeft,
  matchedPair,
  totalPair,
  message,
  history,
}: GameStatusProps) => {
  return (
    <Wrapper>
      <Progress>
        <ProgressItem>
          <h2>남은 시간</h2>
          <p>{timeLeft}</p>
        </ProgressItem>
        <ProgressItem>
          <h2>성공한 짝</h2>
          <p>
            {matchedPair} / {totalPair}
          </p>
        </ProgressItem>
        <ProgressItem>
          <h2>남은 짝</h2>
          <p>{totalPair - matchedPair}</p>
        </ProgressItem>
      </Progress>
      <Message>
        <SectionHeader>안내 메시지</SectionHeader>
        <MessageContent>{message}</MessageContent>
      </Message>
      <History>
        <SectionHeader>최근 히스토리</SectionHeader>

        {history.length === 0 ? (
          <div style={{ fontSize: "0.8rem" }}>아직 뒤집은 카드가 없습니다.</div>
        ) : (
          history.map((h) => (
            <HistoryContent key={h.id}>
              <p>
                {h.firstCardNum}, {h.secondCardNum}
              </p>
              <p
                style={{
                  color: h.result === "성공" ? "#65d346" : "#f17373",
                }}
              >
                {h.result}
              </p>
            </HistoryContent>
          ))
        )}
      </History>
    </Wrapper>
  );
};

export default GameStatus;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  background-color: #add0f0;
  border-radius: 1rem;
`;
const Progress = styled.section`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 0.5rem;
`;
const ProgressItem = styled.div`
  place-content: center;
  padding: 1rem;
  background-color: #cfe8ff;
  border-radius: 1rem;
  text-align: center;

  h2 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
const SectionHeader = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;
const Message = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MessageContent = styled.div`
  background-color: #cfe8ff;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 0.8rem;
`;
const History = styled(Message)`
  flex: 1;
`;
const HistoryContent = styled(MessageContent)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;
