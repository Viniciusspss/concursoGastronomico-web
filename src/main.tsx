import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { MessagesContainer } from "./components/MessagesContainer.tsx";
import { Provider } from "react-redux"
import { store } from "./store/store.ts"


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MessagesContainer>
        <App />
      </MessagesContainer>
    </Provider>
  </StrictMode>,
);
