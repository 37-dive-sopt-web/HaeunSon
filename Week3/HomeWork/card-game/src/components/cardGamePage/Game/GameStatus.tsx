import styled from "@emotion/styled";
import type { HistoryContent } from "../../../types/history";
import type { Level } from "../../../types/deckInfo";
import type { ChangeEvent } from "react";

interface GameStatusProps {
  setLevel: (value: Level) => void;
  timeLeft: string;
  matchedPair: number;
  totalPair: number;
  message: string;
  history: HistoryContent[];
}

const GameStatus = ({
  setLevel,
  timeLeft,
  matchedPair,
  totalPair,
  message,
  history,
}: GameStatusProps) => {
  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setLevel(value as Level);
  };

  return (
    <Wrapper>
      <Select onChange={changeHandler}>
        <option value="1">Level 1</option>
        <option value="2">Level 2</option>
        <option value="3">Level 3</option>
      </Select>
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
        <MessageArea>{message}</MessageArea>
      </Message>
      <History>
        <SectionHeader>최근 히스토리</SectionHeader>
        {history.length === 0 ? (
          <div style={{ fontSize: "0.8rem" }}>아직 뒤집은 카드가 없습니다.</div>
        ) : (
          history.map((h) => (
            <HistoryArea key={h.id}>
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
            </HistoryArea>
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
const Select = styled.select`
  background-color: #cfe8ff;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem;
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
const MessageArea = styled.div`
  background-color: #cfe8ff;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 0.8rem;
`;
const History = styled(Message)`
  flex: 1;
`;
const HistoryArea = styled(MessageArea)`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;
