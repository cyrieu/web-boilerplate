import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      error {
        message
      }
      user {
        id
        email
        googleConnected
      }
    }
  }
`;
