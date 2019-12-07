import React from "react";
import styled from "@emotion/styled";
import ConnectApps from "./ConnectApps";
import DownloadApp from "./DownloadApp";
import { Heading } from "evergreen-ui";

type Props = {
  user: any;
};

function Home(props: any) {
  return (
    <Container>
      <Heading size={900}>Welcome to Found! Let's get started.</Heading>
      <Heading size={700} marginTop={16}>
        1. Connect the apps you use
      </Heading>
      <ConnectApps></ConnectApps>
      <Heading size={700}>2. Download our app</Heading>
      <div style={{ margin: 10 }}>
        <DownloadApp></DownloadApp>
      </div>
    </Container>
  );
}

const Container = styled.div`
  padding: 40px;
`;

export default Home;
