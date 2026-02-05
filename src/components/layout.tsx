import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  padding: 50px 0px;
`;

export default function Layout() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
}