import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UsercontextProvider from "./contextApi/Usercontext";
import SocketProvider from "./contextApi/SocketProvider";
import PeerProvider from "./contextApi/Peer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsercontextProvider>
    <SocketProvider>
      <PeerProvider>
        <App />
      </PeerProvider>
    </SocketProvider>
  </UsercontextProvider>
);
