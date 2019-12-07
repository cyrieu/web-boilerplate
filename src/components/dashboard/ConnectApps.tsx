import React from "react";
import styled from "@emotion/styled";
import ConnectGoogle from "./ConnectGoogle";
import { ME } from "../../graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { Spinner } from "evergreen-ui";

function ConnectApps() {
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);

  if (meLoading) {
    return <Spinner></Spinner>;
  } else if (meError) {
    return <div>Couldn't load user information. Server probably down.</div>;
  }

  // has data
  const {
    me: { user }
  } = meData;

  return (
    <IconsList>
      <ConnectGoogle user={user}></ConnectGoogle>
    </IconsList>
  );
}

const IconsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ConnectApps;
