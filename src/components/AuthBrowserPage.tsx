import * as React from "react";
import * as QueryString from "query-string";
import { RouteComponentProps } from "react-router";
import { getFrontendUrl } from "../utils/urls";
import SignupForm from "./signup/SignupForm";
import { ME } from "../graphql/queries";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const VERIFY_LOGIN_BROWSER = gql`
  mutation verifyLoginThroughBrowser($input: VerifyLoginInput!) {
    verifyLoginThroughBrowser(input: $input) {
      error {
        message
      }
      success
    }
  }
`;

type Props = {} & RouteComponentProps;

function AuthBrowserPage(props: Props) {
  const { location } = props;
  const params = QueryString.parse(location.search);
  const { ident } = params;

  // hooks
  const [isComplete, setIsComplete] = React.useState(false);
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);
  const [verifyLogin, { loading: verifyLoading }] = useMutation(
    VERIFY_LOGIN_BROWSER
  );
  React.useEffect(() => {
    if (!ident) {
      // If no query string with a token, redirect to home
      window.location.replace(getFrontendUrl());
    }
  });

  React.useEffect(() => {
    if (meData && meData.me && meData.me.user) {
      // We're logged in already, get accessToken from localStorage
      const authToken = localStorage.getItem("token");
      if (authToken) {
        verifyLogin({
          variables: {
            input: {
              identifyingToken: ident,
              authToken
            }
          }
        }).then(data => {
          setIsComplete(true);
        });
      }
    }
  }, [meData, ident, verifyLogin, isComplete]);

  if (meLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (meError) {
    return <div>Error: {meError.message}</div>;
  }

  if (verifyLoading) {
    return (
      <div>
        <p>Verifying login...</p>
      </div>
    );
  }

  if (!ident) {
    return (
      <div>
        <p>Invalid login request. Redirecting...</p>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div>
        <p>
          Successfully logged in! You can now close this tab and return to the
          app.
        </p>
      </div>
    );
  }

  const handleLogin = (authToken: string) => {
    verifyLogin({
      variables: {
        input: {
          identifyingToken: ident,
          authToken
        }
      }
    }).then(data => {
      setIsComplete(true);
    });
  };

  // Show login form
  return (
    <div>
      <SignupForm onLogin={handleLogin}></SignupForm>
      <p>here is the auth browser</p>
    </div>
  );
}

export default AuthBrowserPage;
