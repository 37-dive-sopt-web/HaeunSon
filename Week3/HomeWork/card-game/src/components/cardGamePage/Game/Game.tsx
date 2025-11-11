import { useEffect, useState, useCallback, useRef } from "react";
import styled from "@emotion/styled";

import { buildDeck } from "../../../utils/deck";
import type { DeckInfo, Level } from "../../../types/deckInfo";
import type { HistoryContent } from "../../../types/history";
import { useCountdown } from "../../../hooks/useCountdown";
import GameBoard from "./GameBoard";
import GameStatus from "./GameStatus";
import Modal from "../Modal/Modal";

type Status = "prepare" | "playing" | "won" | "lost";
interface RankItem {
  level: number;
  clearTime: number;
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
  const [gameStatus, setGameStatus] = useState<Status>("prepare");
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

  // 모달 관리
  const [openModal, setOpenModal] = useState<boolean>(false);

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
  const cardClickHandler = (clickedId: string) => {
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
        const rst =
          Math.round(((endTime - startTimeRef.current) / 1000) * 100) / 100;
        console.log("rst", endTime - startTimeRef.current);

        const newRankItem: RankItem = {
          level: deckInfo.level,
          clearTime: rst,
          recordTime: new Date().toISOString(),
        };

        // 성공 기록 localStroage에 저장
        try {
          const prevRank = localStorage.getItem("rank");
          const prevRankArr: RankItem[] = prevRank ? JSON.parse(prevRank) : [];

          const updatedRankArr = [newRankItem, ...prevRankArr];
          updatedRankArr.sort((a, b) => {
            if (a.level === b.level) {
              return a.clearTime - b.clearTime;
            } else {
              return b.level - a.level;
            }
          });

          localStorage.setItem("rank", JSON.stringify(updatedRankArr));
        } catch (error) {
          console.error("랭킹 저장 오류 발생: ", error);
        }
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 3000);
      } else {
        setOpenModal(true);
        setTimeout(() => setOpenModal(false), 3000);
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
      <GameBoard
        resetState={resetState}
        deckInfo={deckInfo}
        clickedList={clickedList}
        matchedList={matchedList}
        cardClickHandler={cardClickHandler}
      />
      <GameStatus
        timeLeft={timeLeft}
        matchedPair={matchedPair}
        totalPair={totalPair}
        message={message}
        history={history}
      />
      <Modal openModal={openModal} gameStatus={gameStatus} />
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
