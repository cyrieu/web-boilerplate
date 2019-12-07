import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../graphql/queries";
import FullScreenSpinner from "./shared/FullScreenSpinner";

type Props = {
  component: (props: any) => JSX.Element;
} & RouteProps;

function AuthRoute(props: Props) {
  const { component: Component, ...rest } = props;
  const { loading: meLoading, error: meError, data: meData } = useQuery(ME);

  if (meLoading) {
    return <FullScreenSpinner></FullScreenSpinner>;
  } else if (meError) {
    return (
      <div>
        Error: {meError.message}. Our server is probably down come back later
      </div>
    );
  }

  // has data
  const {
    me: { user }
  } = meData;

  let isAuthed = false;
  if (user) {
    isAuthed = true;
  }

  if (!isAuthed) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest} render={props => <Component {...props} user={user} />} />
  );
}

export default AuthRoute;
