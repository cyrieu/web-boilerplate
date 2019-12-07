import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../graphql/queries";
import SignupForm from "./signup/SignupForm";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { Heading } from "evergreen-ui";
import styled from "@emotion/styled";

type Props = {} & RouteComponentProps;

function AuthPage(props: Props) {
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);

  if (meLoading) {
    return <div>Loading user...</div>;
  }
  if (meError) {
    return (
      <div>
        <p>Sorry couldn't load your data check in later</p>
      </div>
    );
  }

  const {
    me: { user }
  } = meData;
  const loggedIn = !!user;
  if (loggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Container>
      <Heading size={900}>Found</Heading>
      <div style={{ marginTop: 40 }}>
        <SignupForm></SignupForm>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-items: center;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 100px;
`;

export default AuthPage;
