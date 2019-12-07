import * as React from "react";
import { loginWithGoogle, getCurrentUser } from "../../firebase";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ME } from "../../graphql/queries";
import produce from "immer";
import { Button } from "evergreen-ui";
import { ReactComponent as Logo } from "../../assets/googleLogo.svg";

const LOGIN_FIREBASE = gql`
  mutation loginWithFirebaseToken($token: String!) {
    loginWithFirebaseToken(token: $token) {
      error {
        message
      }
      user {
        id
        email
      }
      authToken
    }
  }
`;

type Props = {
  onLogin?: (authToken: string) => void;
} & RouteComponentProps;

function SignupForm(props: Props) {
  const { onLogin, history } = props;
  const [loginWithFirebaseToken] = useMutation(LOGIN_FIREBASE, {
    update: (cache, result) => {
      const {
        data: {
          loginWithFirebaseToken: { user }
        }
      } = result;
      const meData = cache.readQuery({ query: ME });
      const nextState = produce(meData, (draftState: any) => {
        draftState.me.user = user;
      });
      cache.writeQuery({
        query: ME,
        data: nextState
      });
    }
  });

  const handleSignup = () => {
    return loginWithGoogle()
      .then(user => {
        if (user) {
          return getCurrentUser();
        }
        return null;
      })
      .then(token => {
        if (token) {
          // verify token on backend
          return loginWithFirebaseToken({ variables: { token } });
        }
      })
      .then(result => {
        if (!result) {
          // Fail to verify
          return;
        }
        const {
          data: { loginWithFirebaseToken }
        } = result;
        const { error, authToken } = loginWithFirebaseToken;
        if (error) {
          console.error(error.message);
          return;
        }
        // Save user session
        localStorage.setItem("token", authToken);

        // Call complete login handler
        if (onLogin) {
          onLogin(authToken);
        }
      })
      .finally(() => {
        return history.push("/");
      });
  };
  return (
    <Button height={48} onClick={handleSignup}>
      <Logo style={{ height: "20px" }}></Logo>{" "}
      <span style={{ paddingLeft: 4 }}>Log in with Google</span>
    </Button>
  );
}

export default withRouter(SignupForm);
