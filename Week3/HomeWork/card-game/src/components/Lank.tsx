import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import CommonHeader from "./common/CommonHeader";

interface RankItem {
  level: number;
  clearTime: string;
  recordTime: string;
}

const Lank = () => {
  const [rankList, setRankList] = useState<RankItem[]>([]);

  const onClick = () => {
    const rankList = localStorage.getItem("rank");
    if (rankList) {
      localStorage.removeItem("rank");
      setRankList([]);
    } else {
      alert("삭제할 값이 없습니다.");
    }
  };

  useEffect(() => {
    const storedRank = localStorage.getItem("rank");
    if (storedRank) {
      const parsedList = JSON.parse(storedRank);
      setRankList(parsedList);
    }
  }, []);

  return (
    <Wrapper>
      <CommonHeader
        title="랭킹 보드"
        buttonName="기록 초기화"
        onClick={onClick}
      />
      <Table>
        <TableHeader>
          <tr>
            <ColTitle scope="col">순위</ColTitle>
            <ColTitle scope="col">레벨</ColTitle>
            <ColTitle scope="col">클리어 시간(초)</ColTitle>
            <ColTitle scope="col">기록 시각</ColTitle>
          </tr>
        </TableHeader>
        <tbody>
          {rankList.length === 0 ? (
            <tr>
              <th>표시할 랭킹이 없습니다.</th>
            </tr>
          ) : (
            rankList.map((item, index) => (
              <tr key={index}>
                <Th>{index + 1}</Th>
                <Th>{item.level}</Th>
                <Th>{item.clearTime}</Th>
                <Th>{item.recordTime}</Th>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default Lank;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 70%;
  height: 80dvh;
  padding: 1rem 1.5rem;
  background-color: #cfe8ff;
  border-radius: 1rem;
`;
const Table = styled.table`
  width: 100%;
  color: #3d3d3d;
  text-align: left;
`;
const TableHeader = styled.thead`
  background-color: #add0f0;
`;
const Th = styled.th`
  padding: 0.5rem;
  font-size: 0.9rem;
`;
const ColTitle = styled.th`
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
`;
