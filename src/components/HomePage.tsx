import * as React from "react";
import styled from "@emotion/styled";
import Sidebar from "./dashboard/Sidebar";
import Home from "./dashboard/Home";

type Props = {
  user: any;
};

function HomePage(props: Props) {
  const { user } = props;

  return (
    <Container>
      <SidebarContainer>
        <Sidebar></Sidebar>
      </SidebarContainer>
      <MainContentContainer>
        <Home user={user}></Home>
      </MainContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-items: center;
  max-width: 1000px;
`;

const SidebarContainer = styled.div`
  background-color: #f9f9fb;
  height: 100vh;
  flex: 1;
`;

const MainContentContainer = styled.div`
  flex: 4;
`;

export default HomePage;
