import styled from "@emotion/styled";
import CommonHeader from "../../common/CommonHeader";
import type { DeckInfo, Level } from "../../../types/deckInfo";

interface GameBoardProps {
  resetState: () => void;
  level: Level;
  deckInfo: DeckInfo;
  clickedList: string[];
  matchedList: string[];
  cardClickHandler: (value: string) => void;
}

const GameBoard = ({
  resetState,
  level,
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
      <CardGridLayout level={level}>
        {deckInfo.data?.map((card) => {
          const isClicked = clickedList.includes(card.id);
          const isMatched = matchedList.includes(card.id);
          const isVisible = isClicked || isMatched;

          return (
            <Card key={card.id} isVisble={isVisible} isMatched={isMatched}>
              <FrontCard
                isVisble={isVisible}
                isMatched={isMatched}
                onClick={() => cardClickHandler(card.id)}
              >
                {isVisible ? card.value : "?"}
                {/* <div>?</div> */}
              </FrontCard>
              <BackCard
                isVisble={isVisible}
                isMatched={isMatched}
                onClick={() => cardClickHandler(card.id)}
              >
                <div>{card.value}</div>
              </BackCard>
            </Card>
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
  height: 100%;
  padding: 1rem 1.5rem;
  box-sizing: border-box;
`;
const CardGridLayout = styled.div<{ level: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.level === 1
      ? "repeat(4, auto)"
      : "repeat(6, auto)"}; // level에 따라 동적으로 하기
  gap: 0.3rem;
  padding: 0 5rem;
`;
const Card = styled.div<{ isVisble: boolean; isMatched: boolean }>`
  display: inline-grid;
  transform: ${(props) =>
    props.isVisble ? "rotateY(180deg)" : "rotateY(0deg)"};
  transition: transform 0.3s;
  transform-style: preserve-3d;
`;
const FrontCard = styled.div<{ isVisble: boolean; isMatched: boolean }>`
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
  grid-area: 1 / 1 / 1 / 1;
  backface-visibility: hidden;
`;
const BackCard = styled(FrontCard)`
  transform: rotateY(180deg);
`;
