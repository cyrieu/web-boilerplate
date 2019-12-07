import React from "react";
import { app } from "firebase";
const FirebaseContext = React.createContext<app.App | null>(null);
export default FirebaseContext;
