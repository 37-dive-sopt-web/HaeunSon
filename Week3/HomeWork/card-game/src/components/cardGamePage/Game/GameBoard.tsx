import styled from "@emotion/styled";
import CommonHeader from "../../common/CommonHeader";
import type { DeckInfo } from "../../../types/deckInfo";

interface GameBoardProps {
  resetState: () => void;
  deckInfo: DeckInfo;
  clickedList: string[];
  matchedList: string[];
  cardClickHandler: (value: string) => void;
}

const GameBoard = ({
  resetState,
  deckInfo,
  clickedList,
  matchedList,
  cardClickHandler,
}: GameBoardProps) => {
  return (
    <Wrapper>
      <CommonHeader
        title="게임 보드"
        buttonName="게임 리셋"
        onClick={resetState}
      />
      {/* clickedList, matchedList, isVisible, isMatched, onClick  */}
      <CardGridLayout>
        {deckInfo.data?.map((card) => {
          const isClicked = clickedList.includes(card.id);
          const isMatched = matchedList.includes(card.id);
          const isVisible = isClicked || isMatched;

          return (
            <CardItem
              key={card.id}
              isVisble={isVisible}
              isMatched={isMatched}
              onClick={() => cardClickHandler(card.id)}
            >
              {isVisible ? card.value : "?"}
            </CardItem>
          );
        })}
      </CardGridLayout>
    </Wrapper>
  );
};

export default GameBoard;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
`;
const CardGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto); // level에 따라 동적으로 하기
  gap: 0.3rem;
  padding: 0 4rem;
`;
const CardItem = styled.div<{ isVisble: boolean; isMatched: boolean }>`
  display: grid;
  place-items: center;
  background-color: ${(props) =>
    props.isVisble ? (props.isMatched ? "#4fa8fc" : "none") : "#7ec1ff"};
  border: ${(props) =>
    props.isVisble
      ? props.isMatched
        ? "none"
        : "1px solid #4fa8fc"
      : "1px solid #4fa8fc"};
  border-radius: 0.4rem;
  aspect-ratio: 1;
  box-sizing: border-box;
`;
