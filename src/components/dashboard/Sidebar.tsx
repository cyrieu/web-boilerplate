import React from "react";
import { Heading } from "evergreen-ui";
import styled from "@emotion/styled";

function Sidebar() {
  return (
    <Container>
      <div style={{ padding: "16px 40px" }}>
        <Heading size={800}>Found</Heading>
      </div>
      <TabContainer style={{ fontWeight: 600, backgroundColor: "#f2f2f2" }}>
        Home
      </TabContainer>
      {/* <TabContainer>Settings</TabContainer>
      <TabContainer>Billing</TabContainer> */}
    </Container>
  );
}

const Container = styled.div``;

const TabContainer = styled.div`
  padding: 16px 36px;
  cursor: pointer;
  :hover {
    background-color: #f2f2f2;
  }
`;

export default Sidebar;
