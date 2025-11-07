import { useState } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";

const CardGamePage = () => {
  const [tab, setTab] = useState<string>("game");

  return (
    <Wrapper>
      <Header tab={tab} setTab={setTab} />

      {tab === "game" ? <div>게임</div> : <div>랭킹</div>}
    </Wrapper>
  );
};

export default CardGamePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;
