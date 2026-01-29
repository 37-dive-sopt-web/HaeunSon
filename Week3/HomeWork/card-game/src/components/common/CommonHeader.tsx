import styled from "@emotion/styled";

interface CommonHeaderProps {
  title: string;
  buttonName: string;
  onClick: () => void;
}

const CommonHeader = ({ title, buttonName, onClick }: CommonHeaderProps) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ResetBtn type="button" onClick={onClick}>
        {buttonName}
      </ResetBtn>
    </Wrapper>
  );
};

export default CommonHeader;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #3d3d3d;
`;
const ResetBtn = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1rem;
  background-color: #f17373;
  color: #f8f8f8;
  font-weight: bold;
  cursor: pointer;
`;
