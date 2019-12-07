import * as React from "react";
import { getFrontendUrl } from "../utils/urls";

function OAuthHandlerPage() {
  React.useEffect(() => {
    setTimeout(() => {
      window.location.replace(getFrontendUrl());
    }, 2000);
  });

  return (
    <div>
      <p>Successfully connected, redirecting to main page...</p>
    </div>
  );
}

export default OAuthHandlerPage;
