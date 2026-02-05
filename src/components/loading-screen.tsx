import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #007bff; 
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite; 
`;

const Text = styled.span`
  font-size: 24px;
  font-family: sans-serif;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Spinner />
      <Text>Loading....</Text>
    </Wrapper>
  );
}
