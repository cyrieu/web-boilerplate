import React from "react";
import { Button } from "evergreen-ui";

function DownloadApp() {
  return (
    <a
      style={{ textDecoration: "none" }}
      href="https://www.dropbox.com/s/z3ab1xzt5psa85g/Found-0.0.1.dmg?dl=1"
    >
      <Button iconAfter="arrow-right">Click here to get the app</Button>
    </a>
  );
}

export default DownloadApp;
