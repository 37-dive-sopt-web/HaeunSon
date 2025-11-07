import styled from "@emotion/styled";

interface HeaderProps {
  tab: string;
  setTab: (value: string) => void;
}

const Header = ({ tab, setTab }: HeaderProps) => {
  const tabClickHandler = (value: string) => {
    setTab(value);
  };

  return (
    <Wrapper>
      <Title>숫자 카드 짝 맞추기</Title>
      <TabList>
        <Tab isClicked={tab === "game"} onClick={() => tabClickHandler("game")}>
          게임
        </Tab>
        <Tab isClicked={tab === "rank"} onClick={() => tabClickHandler("rank")}>
          랭킹
        </Tab>
      </TabList>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 70%;
  padding: 1rem 1.5rem;
  background-color: #cfe8ff;
  border-radius: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #3d3d3d;
`;
const TabList = styled.div`
  display: flex;
  gap: 0.3rem;
`;
const Tab = styled.button<{ isClicked: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background-color: ${(props) => (props.isClicked ? "#7ec1ff" : "#add0f0")};
  color: ${(props) => (props.isClicked ? "#ffffff" : "#686868")};
  font-weight: bold;
  cursor: pointer;
`;
