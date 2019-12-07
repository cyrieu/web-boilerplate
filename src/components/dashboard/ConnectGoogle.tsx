import * as React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ReactComponent as GoogleDriveLogo } from "../../assets/googleDrive.svg";
import styled from "@emotion/styled";
import { Icon, Spinner } from "evergreen-ui";

const GET_GOOGLE_OAUTH_URL = gql`
  query getGoogleOAuthUrl($input: ConnectGoogleDriveInput!) {
    getGoogleDriveOAuthUrl(input: $input) {
      error {
        message
        code
      }
      url
    }
  }
`;

type Props = {
  user: any;
};

function ConnectGoogle(props: Props) {
  const { user } = props;
  const { googleConnected } = user;
  const [getGoogleUrl, { called, loading, data }] = useLazyQuery(
    GET_GOOGLE_OAUTH_URL,
    {
      variables: {
        input: {
          userId: user.id
        }
      }
    }
  );

  const handleConnectGoogleDrive = () => {
    getGoogleUrl();
  };

  if (called && loading) {
    // Attempting to connect to google drive
    return (
      <Container>
        <Spinner></Spinner>
      </Container>
    );
  }

  if (!called) {
    // Show button to click
    return googleConnected ? (
      <Container>
        <div style={{ position: "absolute", left: "12px", top: "12px" }}>
          <Icon icon="tick-circle" color="success"></Icon>
        </div>
        <GoogleDriveLogo></GoogleDriveLogo>
        <div>Google Drive</div>
      </Container>
    ) : (
      <Container onClick={handleConnectGoogleDrive}>
        <GoogleDriveLogo></GoogleDriveLogo>
        <div>Google Drive</div>
      </Container>
    );
  }
  // Called the mutation to get OAuth URL
  const {
    getGoogleDriveOAuthUrl: { error, url }
  } = data;
  if (error) {
    return (
      <div>
        <p>error: {error.message}</p>
      </div>
    );
  }
  // No error, redirect user to OAuth url
  window.location = url;
  return (
    <Container>
      <Spinner></Spinner>
    </Container>
  );
}

const Container = styled.div`
  position relative;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px 8px;
  text-align: center;
  margin: 10px;
  transition: box-shadow 0.3s;
  :hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    cursor: pointer;
  }
`;

export default ConnectGoogle;
