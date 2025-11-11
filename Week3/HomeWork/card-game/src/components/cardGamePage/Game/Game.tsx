import { useEffect, useState, useCallback, useRef } from "react";
import styled from "@emotion/styled";

import { buildDeck } from "../../../utils/deck";
import type { DeckInfo, Level } from "../../../types/DeckInfo";
import { useCountdown } from "../../../hooks/useCountdown";
import CommonHeader from "../../common/CommonHeader";

type GameStatus = "prepare" | "playing" | "won" | "lost";
interface HistoryContent {
  id: number;
  firstCardNum: number;
  secondCardNum: number;
  result: "성공" | "실패";
}
interface RankItem {
  level: number;
  clearTime: string;
  recordTime: string;
}

const Game = () => {
  const [deckInfo, setDeckInfo] = useState<DeckInfo>({
    status: "notReady",
    data: null,
    level: 1,
  });

  // 카드 게임 진행 상태 관리
  const [clickedList, setClickedList] = useState<string[]>([]);
  const [matchedList, setMatchedList] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("prepare");
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // Progress 메세지
  const timeLeft = useCountdown(45, gameStatus, () => setGameStatus("lost"));
  const totalPair = deckInfo.data !== null ? deckInfo.data?.length / 2 : 0;
  const matchedPair = matchedList.length / 2;

  // 안내 메세지
  const [message, setMessage] =
    useState<string>("카드를 눌러 게임을 시작하세요.");

  // 히스토리
  const [history, setHistory] = useState<HistoryContent[]>([]);

  // 로컬 스토리지 저장을 위한 값
  const startTimeRef = useRef<number>(0);

  // 초기화 로직
  const resetState = () => {
    setClickedList([]);
    setMatchedList([]);
    setGameStatus("prepare");
    setIsChecking(false);
    setMessage("카드를 눌러 게임을 시작하세요.");
    setHistory([]);
    startTimeRef.current = 0;
  };

  const generateDeck = useCallback(
    (level: Level = deckInfo.level) => {
      const data = buildDeck(level);
      setDeckInfo({ status: "ready", data, level });

      // 게임 상태 초기화
      resetState();
    },
    [deckInfo.level]
  );

  useEffect(() => {
    generateDeck(1);
  }, [generateDeck]);

  // 카드 onClick 함수
  const CardClickHandler = (clickedId: string) => {
    if (gameStatus === "prepare") {
      setGameStatus("playing");
      startTimeRef.current = performance.now();
    }

    if (
      isChecking ||
      clickedList.length === 2 ||
      clickedList.includes(clickedId) ||
      matchedList.includes(clickedId)
    ) {
      setMessage("이미 선택한 카드입니다.");
      return;
    }

    setClickedList((prev) => [...prev, clickedId]);
  };

  // 카드 매치 확인
  useEffect(() => {
    if (clickedList.length !== 2) {
      return;
    }

    // 확인 시작 -> 3개 이상 클릭 방지
    setIsChecking(true);

    const [firstCardId, secondCardId] = clickedList;
    const firstCard = deckInfo.data?.find((card) => card.id === firstCardId);
    const secondCard = deckInfo.data?.find((card) => card.id === secondCardId);

    if (!firstCard || !secondCard) return;

    let newHistory: HistoryContent;
    if (firstCard.value === secondCard.value) {
      setMatchedList((prev) => [...prev, firstCard.id, secondCard.id]); // 매치된 카드 리스트 업데이트
      setMessage("성공!");
      setClickedList([]); // 클릭된 카드 리스트 초기화
      setIsChecking(false); // 확인 종료

      newHistory = {
        id: Date.now(),
        firstCardNum: firstCard.value,
        secondCardNum: secondCard.value,
        result: "성공",
      };
      setHistory((prev) => [newHistory, ...prev]);
    } else {
      setMessage("실패!");
      newHistory = {
        id: Date.now(),
        firstCardNum: firstCard.value,
        secondCardNum: secondCard.value,
        result: "실패",
      };
      setHistory((prev) => [newHistory, ...prev]);
      setTimeout(() => {
        setMessage("잠시만 기다려주세요.");
        setClickedList([]);
        setIsChecking(false);
      }, 500);
    }
  }, [deckInfo.data, clickedList]);

  // 게임 결과 확인
  useEffect(() => {
    if (
      gameStatus === "playing" &&
      deckInfo.data &&
      deckInfo.data.length > 0 &&
      matchedList.length === deckInfo.data.length
    ) {
      setGameStatus("won");
    }
  }, [deckInfo.data, gameStatus, matchedList, timeLeft]);

  // 리셋
  useEffect(() => {
    if (gameStatus === "won" || gameStatus === "lost") {
      if (gameStatus === "won") {
        const endTime = performance.now();
        const rst = ((endTime - startTimeRef.current) / 1000).toFixed(2);
        console.log("rst", rst);

        const newRankItem: RankItem = {
          level: deckInfo.level,
          clearTime: rst,
          recordTime: new Date().toISOString(),
        };

        try {
          const prevRank = localStorage.getItem("rank");
          const prevRankArr: RankItem[] = prevRank ? JSON.parse(prevRank) : [];

          const updatedRankArr = [newRankItem, ...prevRankArr];
          updatedRankArr.sort((a, b) => b.level - a.level);

          localStorage.setItem("rank", JSON.stringify(updatedRankArr));
        } catch (error) {
          console.error("랭킹 저장 오류 발생: ", error);
        }

        alert("축하합니다. 성공입니다.");
      } else {
        alert("시간이 만료되어 실패했습니다.");
      }
      const timerId = setTimeout(() => {
        generateDeck(deckInfo.level);
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [deckInfo.level, gameStatus, generateDeck]);

  return (
    <Wrapper>
      <GameBoard>
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
                onClick={() => CardClickHandler(card.id)}
              >
                {isVisible ? card.value : "?"}
              </CardItem>
            );
          })}
        </CardGridLayout>
      </GameBoard>
      {/* timeLeft, matchedPair, totalPair, message, history */}
      <GameStatusSection>
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
            <div style={{ fontSize: "0.8rem" }}>
              아직 뒤집은 카드가 없습니다.
            </div>
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
      </GameStatusSection>
    </Wrapper>
  );
};

export default Game;

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 70%;
  height: 80dvh;
  padding: 1rem 1.5rem;
  background-color: #cfe8ff;
  border-radius: 1rem;
`;
const GameBoard = styled.section`
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

const GameStatusSection = styled.section`
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
