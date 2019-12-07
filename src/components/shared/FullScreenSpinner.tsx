import React from "react";
import { Spinner } from "evergreen-ui";
import styled from "@emotion/styled";

export default function FullScreenSpinner() {
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
